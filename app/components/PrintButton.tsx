"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      className="button button-secondary"
      onClick={() => window.print()}
    >
      Print / Save as PDF
    </button>
  );
}
