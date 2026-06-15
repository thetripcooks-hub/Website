"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/app/blog/_components/blog-data";
import { COMMUNITY_POSTS } from "./community-data";

function CommunityCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/community/${post.slug}`} className="flex flex-col gap-6 group">
      <div className="h-[220px] sm:h-[301px] rounded-[12px] overflow-hidden relative shrink-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover rounded-[12px] group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 rounded-[12px] bg-black/20" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[14px] font-medium leading-[21px] text-[color:var(--text-secondary)] font-plus-jakarta-sans whitespace-nowrap">
            {post.author}
          </span>
          <span className="w-[7px] h-[7px] rounded-full bg-[color:var(--text-secondary)] inline-block shrink-0" />
          <span className="text-[14px] font-medium leading-[21px] text-[color:var(--text-secondary)] font-plus-jakarta-sans whitespace-nowrap">
            {post.date}
          </span>
        </div>
        <p className="text-[18px] font-medium leading-[27px] text-[color:var(--text-primary)] font-plus-jakarta-sans line-clamp-2">
          {post.title}
        </p>
      </div>
    </Link>
  );
}

const PAGE_SIZE = 9;

export default function AlumniGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => COMMUNITY_POSTS, []);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="px-5 sm:px-[109px] py-9 flex flex-col gap-9 bg-[color:var(--bg-primary)]">
      {/* Stories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {visible.map((post) => (
          <CommunityCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-6 h-6 flex items-center justify-center disabled:opacity-30"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-text dark:text-foreground" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`w-10 h-10 rounded-[20px] text-[14px] font-medium font-plus-jakarta-sans flex items-center justify-center transition-colors ${
                page === num
                  ? "bg-gradient-to-r from-[#FA93F4] from-[28.5%] to-[#EE7FE7] text-white"
                  : "text-neutral-text dark:text-foreground hover:bg-[color:var(--bg-secondary)]"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-6 h-6 flex items-center justify-center disabled:opacity-30"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5 text-neutral-text dark:text-foreground" />
          </button>
        </div>
      )}
    </section>
  );
}
