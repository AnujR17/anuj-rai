"use client";
export function PrintResume() {
  return (
    <button
      className="print-button"
      type="button"
      onClick={() => window.print()}
    >
      Print / save as PDF ↗
    </button>
  );
}
