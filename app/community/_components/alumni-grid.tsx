"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { queryGetCommunityStories } from "@/queries/community-query";
import { CommunityStoriesResponse, CommunityStory } from "@/types/community";
import { CustomLoader } from "@/components/ui";
import dayjs from "@/lib/dayjs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RevealGrid } from "@/components/motion/reveal-grid";

const FALLBACK_IMAGE = "/img/hero-desktop.png";
const PAGE_SIZE = 9;

function CommunityCard({ post }: { post: CommunityStory }) {
  const imageUrl = post.image?.url ?? FALLBACK_IMAGE;
  const dateLabel = dayjs.utc(post.date).format("MMM D, YYYY");

  return (
    <Link href={`/community/${post.slug}`} className="flex flex-col gap-6 group">
      <div className="h-[220px] sm:h-[301px] rounded-[12px] overflow-hidden relative shrink-0">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover rounded-[12px] group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 rounded-[12px] bg-black/20" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[14px] font-medium leading-[21px] text-[color:var(--text-secondary)] font-plus-jakarta-sans whitespace-nowrap">
            {post.authorProfile?.name}
          </span>
          <span className="w-[7px] h-[7px] rounded-full bg-[color:var(--text-secondary)] inline-block shrink-0" />
          <span className="text-[14px] font-medium leading-[21px] text-[color:var(--text-secondary)] font-plus-jakarta-sans whitespace-nowrap">
            {dateLabel}
          </span>
        </div>
        <p className="text-[18px] font-medium leading-[27px] text-[color:var(--text-primary)] font-plus-jakarta-sans line-clamp-2">
          {post.title}
        </p>
      </div>
    </Link>
  );
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const left = current - 1;
  const right = current + 1;
  const pages: (number | "...")[] = [1];
  if (left > 2) pages.push("...");
  for (let i = Math.max(2, left); i <= Math.min(total - 1, right); i++) pages.push(i);
  if (right < total - 1) pages.push("...");
  pages.push(total);
  return pages;
}

export default function AlumniGrid() {
  const searchParams = useSearchParams();
  const currentPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

  const { data, loading } = useQuery<CommunityStoriesResponse>(
    queryGetCommunityStories,
    { variables: { skip: (currentPage - 1) * PAGE_SIZE, limit: PAGE_SIZE } }
  );

  const total = data?.communityStoryCollection.total ?? 0;
  const posts: CommunityStory[] = data?.communityStoryCollection.items ?? [];
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <section className="px-5 sm:px-[109px] py-9 flex flex-col gap-9 bg-[color:var(--bg-primary)]">
      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <CustomLoader />
        </div>
      ) : (
        <RevealGrid
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          items={posts}
          keyFn={(post) => post.sys.id}
          renderItem={(post) => <CommunityCard post={post} />}
        />
      )}

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
