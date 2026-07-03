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
import {
  extractHeadings,
  splitAtMidpointHeading,
} from "@/lib/extract-headings";
import { createRichTextRenderOptions } from "@/lib/rich-text-render-options";
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
          title slug category date excerpt featured
          coverImage { url title }
          body {
            json
            links {
              assets {
                block { sys { id } url contentType title description width height }
              }
              entries {
                block  { sys { id } __typename ... on Trip { location } ... on BlogPost { title slug } ... on CommunityStory { title slug } ... on OurWallOfLove { reviewerName location } }
                inline { sys { id } __typename ... on Trip { location } ... on BlogPost { title slug } ... on CommunityStory { title slug } ... on OurWallOfLove { reviewerName location } }
              }
            }
          }
          authorProfile {
            sys { id }
            name
            instagramHandle
            tiktokHandle
            whatsappNumber
            linkedinHandle
          }
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
    },
  );
  const json = await res.json();
  if (json.errors) {
    console.error(
      "[fetchPostBySlug] Contentful error:",
      JSON.stringify(json.errors),
    );
  }
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
  const sections = post.body?.json ? extractHeadings(post.body.json) : [];
  const [firstHalf, secondHalf] = post.body?.json
    ? splitAtMidpointHeading(post.body.json)
    : [null, null];
  const renderOptions = createRichTextRenderOptions(post.body?.links);

  const ap = post.authorProfile;
  const socials = [
    {
      label: "Instagram",
      icon: Instagram,
      href: ap?.instagramHandle
        ? `https://www.instagram.com/${ap.instagramHandle}/`
        : null,
    },
    {
      label: "TikTok",
      icon: Tiktok,
      href: ap?.tiktokHandle
        ? `https://www.tiktok.com/@${ap.tiktokHandle}`
        : null,
    },
    {
      label: "WhatsApp",
      icon: WhatsApp,
      href: ap?.whatsappNumber ? `https://wa.me/${ap.whatsappNumber}` : null,
    },
    {
      label: "LinkedIn",
      icon: LinkedIn,
      href: ap?.linkedinHandle
        ? `https://www.linkedin.com/${ap.linkedinHandle}/`
        : null,
    },
  ].filter(
    (s): s is { label: string; icon: string; href: string } => s.href !== null,
  );

  return (
    <main className="flex flex-col min-h-screen bg-[color:var(--bg-primary)]">
      {/* Article header */}
      <div className="bg-[color:var(--bg-primary)] flex flex-col gap-3 sm:gap-6 px-[336px] max-lg:px-[100px] max-sm:px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 flex-wrap">
          <Link
            href="/blog"
            className="text-[14px] sm:text-[16px] font-medium leading-[24px] text-[#09af0d] font-plus-jakarta-sans hover:underline"
          >
            Blog
          </Link>
          <span className="text-[16px] text-[color:var(--text-primary)] font-plus-jakarta-sans">
            /
          </span>
          <Link
            href={`/blog?category=${post.category}`}
            className="text-[14px] sm:text-[16px] font-medium leading-[24px] text-[color:var(--text-primary)] font-plus-jakarta-sans hover:text-[#09af0d] transition-colors"
          >
            {categoryLabel}
          </Link>
        </nav>

        {/* Title */}
        <h1 className="text-[28px] sm:text-[48px] max-sm:text-[32px] sm:leading-[64px] leading-[40px] text-[color:var(--text-primary)] line-clamp-2 font-bold">
          {post.title}
        </h1>

        {/* Author + date + read time */}
        <div className="flex items-center gap-1.5">
          <span className="text-[14px] sm:text-[16px] font-normal leading-[18px] sm:leading-[24px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
            {ap?.name}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--text-secondary)] inline-block shrink-0" />
          <span className="text-[14px] sm:text-[16px] font-normal leading-[18px] sm:leading-[24px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          {readTime && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--text-secondary)] inline-block shrink-0" />
              <span className="text-[14px] sm:text-[16px] font-normal leading-[18px] sm:leading-[24px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
                {readTime}
              </span>
            </>
          )}
        </div>

        {/* Author social icons — only shown when author profile has handles */}
        {socials.length > 0 && (
          <div className="flex items-center gap-2 sm:gap-4">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-[46px] h-[46px] rounded-[23px] bg-[#F4F4F4] dark:bg-[#1E2826] flex items-center justify-center hover:opacity-80 transition-opacity shrink-0"
              >
                <Image
                  src={icon}
                  alt={label}
                  width={20}
                  height={20}
                  className="dark:brightness-0 dark:invert"
                />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Body: sidebar + article content */}
      <div className="flex items-start px-[100px] max-sm:px-4 pt-6 sm:pb-12 gap-0 bg-[color:var(--bg-primary)] relative">
        <BlogArticleToc sections={sections} />

        <article className="flex-1 max-w-[768px] flex flex-col  gap-8 sm:gap-10">
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

          {/* Rich text body — first half */}
          {firstHalf ? (
            <div className="prose max-w-none text-[color:var(--text-secondary)] font-plus-jakarta-sans [&_p]:text-[18px] [&_p]:max-sm:text-[16px] [&_p]:leading-[28px] [&_h2]:font-ogg-trial [&_h2]:text-[28px] [&_h2]:max-sm:text-[22px] [&_h2]:font-semibold [&_h2]:leading-[38px] [&_h2]:text-[color:var(--text-primary)] [&_h2]:mt-8 [&_h2]:mb-2 [&_h3]:font-plus-jakarta-sans [&_h3]:text-[22px] [&_h3]:max-sm:text-[18px] [&_h3]:font-semibold [&_h3]:leading-[32px] [&_h3]:text-[color:var(--text-primary)] [&_h3]:mt-6 [&_h3]:mb-1">
              {documentToReactComponents(firstHalf, renderOptions)}
            </div>
          ) : (
            <p className="text-[18px] font-normal leading-[28px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
              {post.excerpt}
            </p>
          )}

          {/* Inline CTA */}
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

          {/* Rich text body — second half */}
          {secondHalf && secondHalf.content.length > 0 && (
            <div className="prose max-w-none text-[color:var(--text-secondary)] font-plus-jakarta-sans [&_p]:text-[18px] [&_p]:max-sm:text-[16px] [&_p]:leading-[28px] [&_h2]:font-ogg-trial [&_h2]:text-[28px] [&_h2]:max-sm:text-[22px] [&_h2]:font-semibold [&_h2]:leading-[38px] [&_h2]:text-[color:var(--text-primary)] [&_h2]:mt-8 [&_h2]:mb-2 [&_h3]:font-plus-jakarta-sans [&_h3]:text-[22px] [&_h3]:max-sm:text-[18px] [&_h3]:font-semibold [&_h3]:leading-[32px] [&_h3]:text-[color:var(--text-primary)] [&_h3]:mt-6 [&_h3]:mb-1">
              {documentToReactComponents(secondHalf, renderOptions)}
            </div>
          )}
        </article>

        <MobileBackToTop />
      </div>

      <hr className="border-0 border-t border-dashed border-[#EEEEEE] dark:border-white/10 mx-4 sm:mx-[100px]" />

      <BlogCallout />
      <Footer />
    </main>
  );
}
