# CMS Integration Changelog

Date: 2026-06-27

---

## Contentful Space Changes

### Content Type: `trip` — fields added
| Field ID | Type | Notes |
|----------|------|-------|
| `whatsNotIncluded` | JSON Object | Per-trip "Not Included" list. Leave empty for standard trips — frontend falls back to 3 defaults automatically |
| `groupSize` | Short text | e.g. `"12–18 people"` — shown on featured trip card |

### Content Type: `ourWallOfLove` — fields added
| Field ID | Type | Notes |
|----------|------|-------|
| `socialHandle` | Short text | e.g. `@lanreoladipo` — shown on community review cards |

### Content Type: `blogPost` — created (id: `blogPost`)
| Field ID | Type |
|----------|------|
| `title` | Short text |
| `slug` | Short text (Slug appearance, generated from title, unique) |
| `category` | Short text |
| `author` | Short text |
| `date` | Date |
| `excerpt` | Long text |
| `coverImage` | Asset link |
| `body` | Rich text |

> `readTime` is NOT a Contentful field — calculated from `body` word count at ~200 wpm on the frontend.

### Content Type: `communityStory` — created (id: `communityStory`)
| Field ID | Type |
|----------|------|
| `title` | Short text |
| `slug` | Short text (Slug appearance, generated from title, unique) |
| `author` | Short text |
| `date` | Date |
| `readTime` | Short text (manual — no structured body field) |
| `excerpt` | Long text |
| `image` | Asset link |
| `category` | Short text |

---

## Migration Script

**File:** `scripts/setup-contentful.mjs`

Idempotent script that adds the above fields to existing content types and creates new content types if absent. Safe to re-run. Requires `CONTENTFUL_MANAGEMENT_TOKEN` in `.env`.

```
node --env-file=.env scripts/setup-contentful.mjs
```

---

## New Files Created

| File | Purpose |
|------|---------|
| `scripts/setup-contentful.mjs` | Idempotent Contentful content type migration script |
| `queries/blog-query.ts` | GraphQL queries for blog posts (all, latest N, by slug) |
| `queries/community-query.ts` | GraphQL queries for community stories (paginated, by slug) |
| `types/blog.ts` | `CmsBlogPost` type matching Contentful `blogPost` response shape |
| `types/community.ts` | `CommunityStory` type matching Contentful `communityStory` response shape |
| `lib/read-time.ts` | `calcReadTime(body)` — derives read time from Contentful rich text document |
| `docs/contentful-setup.md` | Updated with all new content type specs and field guidance |
| `docs/contentful-setup.pdf` | PDF export of the setup guide for the owner |

---

## Modified Files

### Queries & Types

| File | Change |
|------|--------|
| `queries/trips-query.ts` | Added `whatsNotIncluded` and `groupSize` to trip fragment |
| `queries/review-query.ts` | Added `socialHandle` to review query |
| `data/trips.ts` | Added `whatsNotIncluded: null` and `groupSize: null` to `sampleTrip` (drives `TripType`) |
| `types/review.ts` | Added `socialHandle: null as string | null` to `sampleReview` (drives `ReviewType`) |

### Components — new CMS fields wired up

| File | Change |
|------|--------|
| `app/trips/[slug]/_components/trip-detail-overview/whats-included.tsx` | "Not Included" column now reads `selectedTrip.whatsNotIncluded` — falls back to 3 defaults if null |
| `app/home/_components/feature-trip.tsx` | Group Size now reads `trip.groupSize ?? "12–18 people"` |
| `app/home/_components/community.tsx` | Social handle now reads `review.socialHandle` (null-safe, hidden when not set); removed unused `dayjs` import |

### Blog — hardcoded → Contentful

| File | Change |
|------|--------|
| `app/blog/_components/blog-data.ts` | Removed `BlogPost` type, `BLOG_POSTS`, `ARTICLE_SECTIONS`, `LOREM` — kept `BlogCategory`, `CATEGORIES`, `CATEGORY_MAP`, `CATEGORY_LABEL` |
| `app/blog/_components/blog-card-big.tsx` | Accepts `CmsBlogPost` — uses `coverImage.url` with fallback, formats date via dayjs |
| `app/blog/_components/blog-card-small.tsx` | Same as above |
| `app/blog/page.tsx` | Fetches all posts via `useQuery(queryGetAllBlogPosts)` — client-side filter and category view unchanged |
| `app/blog/[slug]/page.tsx` | Server component — fetches post via direct Contentful GraphQL `fetch`; renders `body` rich text via `@contentful/rich-text-react-renderer`; `readTime` auto-calculated from body |
| `app/home/_components/blog-callout.tsx` | Fetches latest 4 posts via `useQuery(queryGetLatestBlogPosts(4))` |

### Community Stories — hardcoded → Contentful

| File | Change |
|------|--------|
| `app/community/_components/community-data.ts` | Removed `COMMUNITY_POSTS` — kept `COMMUNITY_MEMBERS` |
| `app/community/_components/alumni-grid.tsx` | Fetches from Contentful via `useQuery(queryGetCommunityStories)` with `skip`/`limit` driven by URL `?page=N`; `total` from response drives pagination |
| `app/community/[slug]/page.tsx` | Server component — fetches story by slug via direct Contentful GraphQL `fetch` |

---

## Dependencies Added

| Package | Reason |
|---------|--------|
| `contentful-management` (devDep) | Used by migration script to create/extend content types |
| `@contentful/rich-text-react-renderer` | Renders rich text `body` field in blog article page |

---

## Known Limitations / Future Work

- **Blog article TOC**: `BlogArticleToc` receives `sections={[]}` — dynamic extraction of headings from Contentful rich text is a future enhancement
- **Community story body**: `communityStory` has no rich text body field; article page renders `excerpt` only. Add a `body` rich text field to the content type when full article content is ready
- **Blog article TOC for community**: Same as above — `sections={[]}` passed for now
