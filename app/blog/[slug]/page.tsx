import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Instagram from "@/components/icons/svg/instagram.svg";
import Tiktok from "@/components/icons/svg/tiktok.svg";
import WhatsApp from "@/components/icons/svg/whatsapp.svg";
import LinkedIn from "@/components/icons/svg/linkedin.svg";
import { Footer } from "@/components/ui";
import BlogCallout from "@/app/home/_components/blog-callout";
import BlogArticleToc from "../_components/blog-article-toc";
import MobileBackToTop from "../_components/mobile-back-to-top";
import { CATEGORY_LABEL } from "../_components/blog-data";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { calcReadTime } from "@/lib/read-time";
import type { CmsBlogPost } from "@/types/blog";

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const FALLBACK_IMAGE = "/img/public-trip.svg";

async function fetchPostBySlug(slug: string): Promise<CmsBlogPost | null> {
  const query = `
    query {
      blogPostCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          sys { id }
          title slug category author date excerpt
          coverImage { url title }
          body { json }
        }
      }
    }
  `;
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    }
  );
  const json = await res.json();
  return json?.data?.blogPostCollection?.items?.[0] ?? null;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return {};
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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return (
      <main className="flex flex-col min-h-screen bg-[color:var(--bg-primary)] items-center justify-center">
        <p className="text-[18px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
          Article not found.
        </p>
        <Link href="/blog" className="mt-4 text-[#09af0d] underline">
          Back to blog
        </Link>
      </main>
    );
  }

  const imageUrl = post.coverImage?.url ?? FALLBACK_IMAGE;
  const categoryLabel = CATEGORY_LABEL[post.category];
  const readTime = post.body?.json ? calcReadTime(post.body.json) : null;

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

        {/* Author + date + read time */}
        <div className="flex items-center gap-1.5">
          <span className="text-[16px] font-normal leading-[24px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
            {post.author}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--text-secondary)] inline-block shrink-0" />
          <span className="text-[16px] font-normal leading-[24px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          {readTime && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--text-secondary)] inline-block shrink-0" />
              <span className="text-[16px] font-normal leading-[24px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
                {readTime}
              </span>
            </>
          )}
        </div>

        {/* Share icons */}
        <div className="flex items-center gap-4">
          {[
            { label: "Instagram", href: "https://instagram.com/tripcooks", icon: Instagram },
            { label: "TikTok", href: "https://tiktok.com/@tripcooks", icon: Tiktok },
            { label: "WhatsApp", href: "https://wa.me/447310016389", icon: WhatsApp },
            { label: "LinkedIn", href: "https://linkedin.com/company/tripcooks", icon: LinkedIn },
          ].map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${label}`}
              className="w-[46px] h-[46px] rounded-[23px] bg-[#F4F4F4] dark:bg-[#1E2826] flex items-center justify-center hover:opacity-80 transition-opacity shrink-0"
            >
              <Image src={icon} alt={label} width={20} height={20} className="dark:brightness-0 dark:invert" />
            </a>
          ))}
        </div>
      </div>

      {/* Body: sidebar + article content */}
      <div className="flex items-start px-[100px] max-sm:px-4 pt-6 pb-12 gap-0 bg-[color:var(--bg-primary)] relative">
        <BlogArticleToc sections={[]} />

        <article className="flex-1 max-w-[768px] flex flex-col gap-10">
          {/* Hero image */}
          <div className="h-[442px] max-sm:h-[260px] rounded-[10px] overflow-hidden relative w-full">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover rounded-[10px]"
              priority
            />
          </div>

          {/* Rich text body */}
          {post.body?.json ? (
            <div className="prose prose-lg max-w-none text-[color:var(--text-secondary)] font-plus-jakarta-sans [&>p]:text-[18px] [&>p]:max-sm:text-[16px] [&>p]:leading-[28px] [&>h2]:font-medium [&>h2]:text-[color:var(--text-primary)]">
              {documentToReactComponents(post.body.json)}
            </div>
          ) : (
            <p className="text-[18px] font-normal leading-[28px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
              {post.excerpt}
            </p>
          )}

          {/* Mid-article CTA */}
          <div className="h-[242px] max-sm:h-auto max-sm:py-10 rounded-[12px] overflow-hidden relative bg-[#09AF0D]">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: "url(/img/group-trips-hero-bg.svg)" }}
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-5 text-center px-8">
              <div className="flex flex-col gap-1 items-center">
                <h3 className="font-ogg-trial text-[32px] max-sm:text-[24px] leading-[48px] text-white">
                  Ready to Start Your Next Adventure?
                </h3>
                <p className="text-[14px] max-sm:text-[12px] font-normal leading-[22px] text-white/90 font-plus-jakarta-sans max-w-[514px]">
                  Join a group trip or let us create a personalized journey just
                  for you. Your unforgettable experience awaits
                </p>
              </div>
              <Link
                href="/trips"
                className="bg-[hsl(var(--bg-primary))] text-[hsl(var(--text-primary))] text-[16px] font-medium font-plus-jakarta-sans px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                View current trips
              </Link>
            </div>
          </div>
        </article>

        <MobileBackToTop />
      </div>

      <BlogCallout />
      <Footer />
    </main>
  );
}
