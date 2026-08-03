"use client";

export default function MobileBackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="lg:hidden fixed bottom-6 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-[#fa93f4] from-[28.5%] to-[#ee7fe7] hover:from-[#FA84F3] hover:to-[#FA93F4] transition-colors flex items-center justify-center shadow-lg z-40"
      aria-label="Back to top"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
