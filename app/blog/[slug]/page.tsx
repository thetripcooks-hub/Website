import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/ui";
import BlogCallout from "@/app/home/_components/blog-callout";
import BlogArticleToc from "../_components/blog-article-toc";
import MobileBackToTop from "../_components/mobile-back-to-top";
import {
  BLOG_POSTS,
  ARTICLE_SECTIONS,
  CATEGORY_LABEL,
  LOREM,
} from "../_components/blog-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug) ?? BLOG_POSTS[0];
  return {
    title: `${post.title} | Trip Cooks Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://tripcooks.tours/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Trip Cooks Blog`,
      description: post.excerpt,
      url: `https://tripcooks.tours/blog/${post.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Trip Cooks Blog`,
      description: post.excerpt,
    },
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug) ?? BLOG_POSTS[0];
  const categoryLabel = CATEGORY_LABEL[post.category];

  return (
    <main className="flex flex-col min-h-screen bg-[color:var(--bg-primary)]">
      {/* Article header */}
      <div className="bg-[color:var(--bg-primary)] flex flex-col gap-6 px-[336px] max-lg:px-[100px] max-sm:px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 flex-wrap">
          <Link
            href="/blog"
            className="text-[16px] font-medium leading-[24px] text-[#09af0d] font-plus-jakarta-sans hover:underline"
          >
            Blog
          </Link>
          <span className="text-[16px] text-[color:var(--text-primary)] font-plus-jakarta-sans">
            /
          </span>
          <Link
            href={`/blog?category=${post.category}`}
            className="text-[16px] font-medium leading-[24px] text-[color:var(--text-primary)] font-plus-jakarta-sans hover:text-[#09af0d] transition-colors"
          >
            {categoryLabel}
          </Link>
        </nav>

        {/* Title */}
        <h1 className="font-ogg-trial text-[48px] max-sm:text-[32px] leading-[72px] max-sm:leading-[48px] text-[color:var(--text-primary)]">
          {post.title}
        </h1>

        {/* Author + date */}
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-[color:var(--bg-tertiary)] overflow-hidden relative shrink-0">
            <Image
              src="/img/public-trip.svg"
              alt={post.author}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-[16px] font-normal leading-[24px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
            {post.author}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--text-secondary)] inline-block shrink-0" />
          <span className="text-[16px] font-normal leading-[24px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
            {post.date}
          </span>
        </div>

        {/* Share icons */}
        <div className="flex items-center gap-4">
          {[
            { label: "Instagram", href: "https://instagram.com/tripcooks" },
            { label: "TikTok", href: "https://tiktok.com/@tripcooks" },
            { label: "X", href: "https://x.com/tripcooks" },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/company/tripcooks",
            },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${label}`}
              className="w-[46px] h-[46px] rounded-[23px] bg-[color:var(--bg-secondary)] flex items-center justify-center hover:bg-[color:var(--bg-tertiary)] transition-colors shrink-0"
            >
              <span className="text-[10px] font-medium text-[color:var(--text-secondary)] font-plus-jakarta-sans">
                {label[0]}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Body: sidebar + article content */}
      <div className="flex items-start px-[100px] max-sm:px-4 pt-6 pb-12 gap-0 bg-[color:var(--bg-primary)] relative">
        <BlogArticleToc sections={ARTICLE_SECTIONS} />

        <article className="flex-1 max-w-[768px] flex flex-col gap-10">
          {/* Hero image */}
          <div className="h-[442px] max-sm:h-[260px] rounded-[10px] overflow-hidden relative w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded-[10px]"
              priority
            />
          </div>

          {/* Section 1 */}
          <section id="section-1" className="flex flex-col gap-4 scroll-mt-8">
            <h2 className="text-[20px] font-medium leading-[30px] text-[color:var(--text-primary)] font-plus-jakarta-sans">
              Overview
            </h2>
            <p className="text-[18px] max-sm:text-[16px] font-normal leading-[28px] max-sm:leading-[24px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
              {LOREM}
            </p>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="flex flex-col gap-4 scroll-mt-8">
            <h2 className="text-[20px] font-medium leading-[30px] text-[color:var(--text-primary)] font-plus-jakarta-sans">
              The background story
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-[18px] max-sm:text-[16px] font-normal leading-[28px] max-sm:leading-[24px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
                {LOREM}
              </p>
              <p className="text-[18px] max-sm:text-[16px] font-normal leading-[28px] max-sm:leading-[24px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
                {LOREM}
              </p>

              {/* Inline image */}
              <div className="flex flex-col gap-1.5">
                <div className="h-[518px] max-sm:h-[280px] rounded-[10px] overflow-hidden relative w-full">
                  <Image
                    src={post.image}
                    alt="Trip photo"
                    fill
                    className="object-cover rounded-[10px]"
                  />
                </div>
                <p className="text-[18px] font-normal leading-[28px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
                  Image: Trip from Morocco
                </p>
              </div>
            </div>
          </section>

          {/* Mid-article CTA */}
          <div className="h-[242px] max-sm:h-auto max-sm:py-10 rounded-[12px] overflow-hidden relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/img/Tripcooks_Pattern.svg)" }}
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-5 text-center px-8">
              <div className="flex flex-col gap-1 items-center">
                <h3 className="font-ogg-trial text-[32px] max-sm:text-[24px] leading-[48px] text-[color:var(--text-inverse)]">
                  Ready to Start Your Next Adventure?
                </h3>
                <p className="text-[14px] max-sm:text-[12px] font-normal leading-[22px] text-[color:var(--text-inverse)] font-plus-jakarta-sans max-w-[514px]">
                  Join a group trip or let us create a personalized journey just
                  for you. Your unforgettable experience awaits
                </p>
              </div>
              <Link
                href="/trips"
                className="bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] text-[16px] font-medium font-plus-jakarta-sans px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                View current trips
              </Link>
            </div>
          </div>

          {/* Section 3 */}
          <section id="section-3" className="flex flex-col gap-4 scroll-mt-8">
            <h2 className="text-[20px] font-medium leading-[30px] text-[color:var(--text-primary)] font-plus-jakarta-sans">
              Key takeaways
            </h2>
            <p className="text-[18px] max-sm:text-[16px] font-normal leading-[28px] max-sm:leading-[24px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
              {LOREM}
            </p>
            <p className="text-[18px] max-sm:text-[16px] font-normal leading-[28px] max-sm:leading-[24px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
              {LOREM}
            </p>
          </section>
        </article>

        {/* Mobile back-to-top button (fixed) */}
        <MobileBackToTop />
      </div>

      {/* Read more from our blog */}
      <BlogCallout />

      <Footer />
    </main>
  );
}
