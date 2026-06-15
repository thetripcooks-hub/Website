import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "./blog-data";

type Props = {
  post: BlogPost;
  className?: string;
};

export default function BlogCardBig({ post, className }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`flex flex-col gap-6 group ${className ?? ""}`}
    >
      <div className="h-[301px] sm:h-[301px] max-sm:h-[220px] rounded-[12px] overflow-hidden relative shrink-0">
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
