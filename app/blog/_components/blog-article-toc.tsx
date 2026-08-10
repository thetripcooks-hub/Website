"use client";

import { useEffect, useState } from "react";

type Section = {
  id: string;
  label: string;
};

type Props = {
  sections: Section[];
};

export default function BlogArticleToc({ sections }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0.1 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="hidden lg:flex flex-col gap-6 items-start pr-4 shrink-0 sticky top-8 w-[235px] self-start">
      <div className="flex flex-col gap-4 w-full">
        <p className="text-[18px] font-medium leading-[27px] text-[color:var(--text-primary)] font-plus-jakarta-sans">
          On this page
        </p>
        <div className="flex flex-col gap-4">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`text-[16px] font-normal leading-[24px] font-plus-jakarta-sans transition-colors ${
                activeId === id
                  ? "text-[#09af0d]"
                  : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-gradient-to-r from-[#fa93f4] from-[28.5%] to-[#ee7fe7] hover:from-[#FA84F3] hover:to-[#FA93F4] transition-colors text-black text-[16px] font-medium leading-[24px] font-plus-jakarta-sans px-4 py-3 rounded-full whitespace-nowrap"
      >
        Back to top
      </button>
    </aside>
  );
}
