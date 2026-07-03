import Image from "next/image";
import Link from "next/link";
import { CmsBlogPost } from "@/types/blog";
import dayjs from "@/lib/dayjs";

const FALLBACK_IMAGE = "/img/public-trip.svg";

type Props = {
  post: CmsBlogPost;
  className?: string;
};

export default function BlogCardSmall({ post, className }: Props) {
  const imageUrl = post.coverImage?.url ?? FALLBACK_IMAGE;
  const dateLabel = dayjs.utc(post.date).format("MMM D, YYYY");

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`flex gap-4 items-start group ${className ?? ""}`}
    >
      <div className="w-[132px] h-[119px] rounded-[8px] overflow-hidden relative shrink-0">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover rounded-[8px] group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[14px] font-medium leading-[21px] text-[color:var(--text-secondary)] font-plus-jakarta-sans whitespace-nowrap">
            {post.authorProfile?.name}
          </span>
          <span className="w-[5px] h-[5px] rounded-full bg-[color:var(--text-secondary)] inline-block shrink-0" />
          <span className="text-[14px] font-medium leading-[21px] text-[color:var(--text-secondary)] font-plus-jakarta-sans whitespace-nowrap">
            {dateLabel}
          </span>
        </div>
        <p className="text-[16px] font-medium leading-[24px] text-[color:var(--text-primary)] font-plus-jakarta-sans line-clamp-2 max-sm:line-clamp-3">
          {post.title}
        </p>
      </div>
    </Link>
  );
}
