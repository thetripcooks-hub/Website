"use client";

import { Search } from "lucide-react";
import { CATEGORIES } from "./blog-data";

type Props = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export default function BlogFilterBar({
  activeCategory,
  onCategoryChange,
  searchValue,
  onSearchChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Desktop: inline tabs + search */}
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex items-center gap-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`text-[14px] font-medium leading-[21px] font-plus-jakarta-sans px-3 py-1 rounded-full transition-colors ${
                activeCategory === cat
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 h-[54px] px-4 bg-[color:var(--bg-secondary)] rounded-full w-[384px] shrink-0">
          <Search className="w-6 h-6 text-[color:var(--text-secondary)] shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-transparent text-[16px] font-medium font-plus-jakarta-sans text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)] outline-none"
          />
        </div>
      </div>

      {/* Mobile: search + select dropdown */}
      <div className="flex sm:hidden flex-col gap-3">
        <div className="flex items-center gap-2.5 h-[54px] px-4 bg-[color:var(--bg-secondary)] rounded-full w-full">
          <Search className="w-5 h-5 text-[color:var(--text-secondary)] shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-transparent text-[16px] font-medium font-plus-jakarta-sans text-[color:var(--text-primary)] placeholder:text-[color:var(--text-secondary)] outline-none"
          />
        </div>

        <select
          value={activeCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="bg-[color:var(--text-primary)] text-[color:var(--text-inverse)] text-[14px] font-medium font-plus-jakarta-sans px-4 py-2 rounded-full border-none outline-none cursor-pointer self-start"
        >
          {CATEGORIES.map((cat) => (
            <option
              key={cat}
              value={cat}
              className="bg-[color:var(--bg-primary)] text-[color:var(--text-primary)]"
            >
              {cat}
            </option>
          ))}
        </select>
      </div>

      <hr className="border-0 border-t border-dashed border-[#EEEEEE] dark:border-white/10 w-full" />
    </div>
  );
}
