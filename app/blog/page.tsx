"use client";

import { useState, useMemo } from "react";
import { Footer } from "@/components/ui";
import BlogFilterBar from "./_components/blog-filter-bar";
import BlogCardBig from "./_components/blog-card-big";
import BlogCardSmall from "./_components/blog-card-small";
import {
  BLOG_POSTS,
  CATEGORY_MAP,
  CATEGORY_LABEL,
  BlogCategory,
} from "./_components/blog-data";

const BIG_CARD_CATEGORIES: BlogCategory[] = [
  "travel-updates",
  "company-updates",
];
const SMALL_CARD_CATEGORIES: BlogCategory[] = ["support", "stories"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  const filteredPosts = useMemo(() => {
    const categorySlug =
      activeCategory === "All" ? null : CATEGORY_MAP[activeCategory];
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = !categorySlug || post.category === categorySlug;
      const matchesSearch =
        !searchValue ||
        post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchValue.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchValue]);

  const featuredPost = BLOG_POSTS[0];
  const featuredSmall = BLOG_POSTS.slice(1, 4);

  return (
    <main className="flex flex-col min-h-screen bg-[color:var(--bg-primary)]">
      {/* Hero */}
      <section className="bg-[var(--bg-irishgreen)] h-[460px] max-sm:h-[380px] relative overflow-hidden flex items-center">
        <div className="px-[100px] max-sm:px-4 flex flex-col gap-4 max-w-[553px]">
          <h1 className="font-ogg-trial text-[52px] max-sm:text-[40px] leading-[78px] max-sm:leading-[52px] text-[color:var(--text-primary)]">
            Here&apos;s our blog!
          </h1>
          <p className="text-[20px] max-sm:text-[16px] font-normal leading-[30px] text-[color:var(--text-primary)] font-plus-jakarta-sans">
            The latest updates from TripCooks and the world of travel
          </p>
        </div>
      </section>

      {/* Filter + Content */}
      <section className="px-[100px] max-sm:px-4 py-[36px] flex flex-col gap-[42px] bg-[color:var(--bg-primary)]">
        <BlogFilterBar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        {activeCategory === "All" ? (
          <AllView
            filteredPosts={filteredPosts}
            searchValue={searchValue}
            featuredPost={featuredPost}
            featuredSmall={featuredSmall}
          />
        ) : (
          <CategoryView
            activeCategory={activeCategory}
            filteredPosts={filteredPosts}
          />
        )}
      </section>

      <Footer />
    </main>
  );
}

/* ─── All view ─────────────────────────────────────────────────── */

function AllView({
  filteredPosts,
  searchValue,
  featuredPost,
  featuredSmall,
}: {
  filteredPosts: (typeof BLOG_POSTS)[number][];
  searchValue: string;
  featuredPost: (typeof BLOG_POSTS)[number];
  featuredSmall: (typeof BLOG_POSTS)[number][];
}) {
  if (searchValue && filteredPosts.length === 0) {
    return (
      <p className="text-[16px] text-[color:var(--text-secondary)] font-plus-jakarta-sans py-10 text-center">
        No posts found for &quot;{searchValue}&quot;
      </p>
    );
  }

  if (searchValue) {
    return (
      <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
        {filteredPosts.map((post) => (
          <BlogCardBig key={post.id} post={post} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[42px]">
      {/* Featured articles */}
      <div className="flex gap-5 max-sm:flex-col">
        <BlogCardBig post={featuredPost} className="sm:w-[30%] max-sm:w-full" />
        <div className="flex flex-col gap-4 flex-1">
          {featuredSmall.map((post) => (
            <BlogCardSmall key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Big-card categories */}
      {BIG_CARD_CATEGORIES.map((cat) => {
        const posts = BLOG_POSTS.filter((p) => p.category === cat).slice(0, 6);
        if (!posts.length) return null;
        return (
          <div key={cat} className="flex flex-col gap-5">
            <hr className="border-[color:var(--border)]" />
            <h2 className="font-ogg-trial text-[42px] max-sm:text-[28px] leading-[60px] max-sm:leading-[40px] text-[color:var(--text-primary)]">
              {CATEGORY_LABEL[cat]}
            </h2>
            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
              {posts.map((post) => (
                <BlogCardBig key={post.id} post={post} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Small-card categories */}
      {SMALL_CARD_CATEGORIES.map((cat) => {
        const posts = BLOG_POSTS.filter((p) => p.category === cat).slice(0, 4);
        if (!posts.length) return null;
        return (
          <div key={cat} className="flex flex-col gap-5">
            <hr className="border-[color:var(--border)]" />
            <h2 className="font-ogg-trial text-[42px] max-sm:text-[28px] leading-[60px] max-sm:leading-[40px] text-[color:var(--text-primary)]">
              {CATEGORY_LABEL[cat]}
            </h2>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
              {posts.map((post) => (
                <BlogCardSmall key={post.id} post={post} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Single-category view ──────────────────────────────────────── */

function CategoryView({
  activeCategory,
  filteredPosts,
}: {
  activeCategory: string;
  filteredPosts: (typeof BLOG_POSTS)[number][];
}) {
  const [showMore, setShowMore] = useState(false);
  const PAGE_SIZE = 9;
  const visible = showMore ? filteredPosts : filteredPosts.slice(0, PAGE_SIZE);
  const slug = CATEGORY_MAP[activeCategory] as BlogCategory | undefined;

  const crossCategoryTravel = BLOG_POSTS.filter(
    (p) => p.category === "travel-updates"
  ).slice(0, 3);
  const crossCategoryCompany = BLOG_POSTS.filter(
    (p) => p.category === "company-updates"
  ).slice(0, 3);

  return (
    <div className="flex flex-col gap-[42px]">
      {/* Filtered section */}
      <div className="flex flex-col gap-5">
        <h2 className="font-ogg-trial text-[42px] max-sm:text-[28px] leading-[60px] max-sm:leading-[40px] text-[color:var(--text-primary)]">
          {activeCategory}
        </h2>
        {filteredPosts.length === 0 ? (
          <p className="text-[16px] text-[color:var(--text-secondary)] font-plus-jakarta-sans py-6">
            No posts in this category yet.
          </p>
        ) : (
          <>
            {slug && SMALL_CARD_CATEGORIES.includes(slug) ? (
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
                {visible.map((post) => (
                  <BlogCardSmall key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
                {visible.map((post) => (
                  <BlogCardBig key={post.id} post={post} />
                ))}
              </div>
            )}

            {filteredPosts.length > PAGE_SIZE && !showMore && (
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => setShowMore(true)}
                  className="border border-[#09af0d] text-[#09af0d] text-[16px] font-medium font-plus-jakarta-sans px-8 py-3 rounded-full hover:bg-[#09af0d]/5 transition-colors"
                >
                  Show more
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Read more from Trip Cooks cross-section */}
      <div className="flex flex-col gap-[24px]">
        <hr className="border-[color:var(--border)]" />
        <div className="flex flex-col gap-4">
          <h2 className="font-ogg-trial text-[42px] max-sm:text-[28px] leading-[60px] max-sm:leading-[40px] text-[color:var(--text-primary)]">
            Read more from Trip Cooks
          </h2>
          <p className="text-[20px] max-sm:text-[16px] font-normal leading-[30px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
            Explore more stories, insights and updates from the Trip Cooks team
          </p>
        </div>

        {crossCategoryTravel.length > 0 && (
          <div className="flex flex-col gap-5">
            <h3 className="font-ogg-trial text-[32px] max-sm:text-[22px] leading-[48px] text-[color:var(--text-primary)]">
              Travel updates
            </h3>
            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
              {crossCategoryTravel.map((post) => (
                <BlogCardBig key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {crossCategoryCompany.length > 0 && (
          <div className="flex flex-col gap-5">
            <h3 className="font-ogg-trial text-[32px] max-sm:text-[22px] leading-[48px] text-[color:var(--text-primary)]">
              Company updates
            </h3>
            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
              {crossCategoryCompany.map((post) => (
                <BlogCardBig key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
