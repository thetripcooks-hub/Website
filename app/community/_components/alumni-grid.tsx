"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/app/blog/_components/blog-data";
import { COMMUNITY_POSTS } from "./community-data";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const left = current - 1;
  const right = current + 1;
  const pages: (number | "...")[] = [1];

  if (left > 2) pages.push("...");

  for (let i = Math.max(2, left); i <= Math.min(total - 1, right); i++) {
    pages.push(i);
  }

  if (right < total - 1) pages.push("...");

  pages.push(total);

  return pages;
}

export default function AlumniGrid() {
  const searchParams = useSearchParams();
  const currentPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

  const posts = useMemo(() => COMMUNITY_POSTS, []);
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const visible = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <section className="px-5 sm:px-[109px] py-9 flex flex-col gap-9 bg-[color:var(--bg-primary)]">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {visible.map((post) => (
          <CommunityCard key={post.id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${page - 1}`}
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-30" : ""}
              />
            </PaginationItem>

            {pageNumbers.map((num, i) =>
              num === "..." ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={num}>
                  <PaginationLink href={`?page=${num}`} isActive={page === num}>
                    {num}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                href={`?page=${page + 1}`}
                aria-disabled={page === totalPages}
                className={page === totalPages ? "pointer-events-none opacity-30" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}
