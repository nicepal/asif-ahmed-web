import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function fetchPath(worker, pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: pathname.endsWith(".xml") ? "application/xml" : "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders development preview metadata", async () => {
  const worker = await loadWorker();
  const response = await fetchPath(worker, "/");

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(await response.text(), developmentPreviewMeta);
});

test("renders accessible landmarks, verified identity, and JSON-LD", async () => {
  const worker = await loadWorker();
  const response = await fetchPath(worker, "/");
  const html = await response.text();

  assert.match(html, /Skip to content/);
  assert.match(html, /<html[^>]*lang="en"/);
  assert.match(html, /<h1[^>]*>Asif Ahmed<\/h1>/);
  assert.match(html, /14\+ years/);
  assert.match(html, /DevOps/);
  assert.match(html, /Switch to (light|dark) theme/);
  assert.match(html, /href="\/resume"/);
  assert.match(html, /href="\/work\/punjab-food-authority"/);
  assert.match(html, /https:\/\/github\.com\/nicepal\//);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/codexhive\//);
  assert.match(html, /Lahore, Pakistan/);
  assert.match(html, /Punjab Food Authority/);
  assert.match(html, /ChimpStudio/);
  assert.match(html, /WayHopper/);
  assert.match(html, /BizHR/);
  assert.match(html, /BrickStory/);
  assert.match(html, /CodexPOS/);
  assert.match(html, /Laravel React Admin Starter Kit/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /"@type":"ProfilePage"/);

  const jsonLdMatch = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  assert.ok(jsonLdMatch);
  const parsed = JSON.parse(jsonLdMatch[1]);
  assert.equal(parsed["@context"], "https://schema.org");
  assert.ok(Array.isArray(parsed["@graph"]));
});

test("exposes robots.txt and sitemap.xml for the production origin", async () => {
  const worker = await loadWorker();
  const robots = await fetchPath(worker, "/robots.txt");
  const sitemap = await fetchPath(worker, "/sitemap.xml");

  assert.equal(robots.status, 200);
  assert.equal(sitemap.status, 200);

  const robotsText = await robots.text();
  const sitemapText = await sitemap.text();

  assert.match(robotsText, /Allow:\s*\//);
  assert.doesNotMatch(robotsText, /Disallow:\s*\//);
  assert.match(robotsText, /sitemap\.xml/);
  assert.match(sitemapText, /<urlset/);
  assert.match(sitemapText, /asif-ahmed-portfolio\.codexhive\.chatgpt\.site/);
  assert.match(sitemapText, /\/resume/);
  assert.match(sitemapText, /\/work\/punjab-food-authority/);
});

test("renders résumé and Punjab Food Authority case study pages", async () => {
  const worker = await loadWorker();
  const resume = await fetchPath(worker, "/resume");
  const caseStudy = await fetchPath(worker, "/work/punjab-food-authority");

  assert.equal(resume.status, 200);
  assert.equal(caseStudy.status, 200);

  const resumeHtml = await resume.text();
  const caseHtml = await caseStudy.text();

  assert.match(resumeHtml, /<h1[^>]*>Asif Ahmed<\/h1>/);
  assert.match(resumeHtml, /Full-Stack Software Engineer/);
  assert.match(resumeHtml, /ChimpStudio/);
  assert.match(resumeHtml, /Virtual University of Pakistan/);
  assert.match(resumeHtml, /DevOps/);
  assert.match(resumeHtml, /Print \/ Save as PDF/);

  assert.match(caseHtml, /Punjab Food Authority/);
  assert.match(caseHtml, /ChimpStudio/);
  assert.match(caseHtml, /PHP Developer/);
  assert.match(caseHtml, /Oct 2017/);
});
