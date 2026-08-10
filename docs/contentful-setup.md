# Contentful CMS Setup Guide

This document covers everything that needs to be configured in Contentful to support the current frontend. Work through each section before testing on staging.

---

## Content Type: `Trip`

### Field: `itinerary` (JSON Array)

Each element in the array must follow this structure:

```json
{
  "day": "1",
  "activity": "Arrival in Cancun, Mexico",
  "description": "Once you've arrived, checked in and settled into your room, take some time to relax and enjoy the facilities after your journey. Grab some food, unwind and get comfortable.\n\nLater in the night, for those who still have the energy, we'll be hosting a late-night games night. A relaxed, low-pressure way to meet a few faces, ease into the group and kick things off.",
  "coverImage": "https://..."
}
```

| Key | Type | Required | Notes |
|-----|------|----------|-------|
| `day` | string | Yes | Day number, e.g. `"1"`, `"2"` |
| `activity` | string | Yes | Title shown on the card |
| `description` | string | No | Body text shown below the title. Supports `\n\n` for paragraph breaks |
| `coverImage` | string | No | Full URL of the card image |

**Action:** For each trip, add a `description` to every itinerary day entry.

---

### Field: `whatsIncluded` (JSON Array)

All items in this array are treated as **Included** items and shown in the "Included" column on the trip detail page.

Each element must follow this structure:

```json
{ "title": "All-Inclusive Resort" }
```

| Key | Type | Required | Notes |
|-----|------|----------|-------|
| `title` | string | Yes | Label shown in the "Included" list |

**Action:** List every item that is included in the trip price.

---

### Field: `whatsNotIncluded` (JSON Array)

Controls the "Not Included" column on the trip detail page. Each element must follow this structure:

```json
{ "title": "Flight ticket" }
```

**Leave this field empty in Contentful for standard trips.** The frontend automatically falls back to these 3 defaults when the field is empty:
- Flight ticket
- Breakfast
- Airport pickup and transfer

Only fill in this field when a specific trip deviates from those defaults.

> The migration script adds this field to the `Trip` content type automatically. No default value is set in Contentful (JSON Object fields don't support defaults) — the fallback lives in `whats-included.tsx`.

---

### Field: `groupSize` (Short text)

Shown on the featured trip card on the homepage. Example value: `"12–18 people"`.

> The migration script adds this field to the `Trip` content type automatically.

---

## Checklist — Per Trip

For each trip entry in Contentful, verify:

- [ ] Every `itinerary` day has a `description` field filled in
- [ ] `whatsIncluded` lists all items that are included in the trip price (each just needs a `title`)
- [ ] All `coverImage` URLs in `itinerary` are valid and publicly accessible
- [ ] `groupSize` is filled in (e.g. `"12–18 people"`)
- [ ] `whatsNotIncluded` is left empty unless the trip differs from the 3 standard defaults

---

## Content Type: `OurWallOfLove` (Reviews)

### Field: `socialHandle` (Short text)

Shown on community review cards. Example value: `@lanreoladipo`.

> The migration script adds this field to the `OurWallOfLove` content type automatically.

**Action:** Fill in `socialHandle` for each review entry in Contentful.

---

## Content Type: `BlogPost`

**Content type ID:** `blogPost` — already created in Contentful.

### Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | Short text | Yes | Post headline |
| `slug` | Short text | Yes | URL-friendly ID (e.g. `why-group-travel-is-the-new-solo-travel`). Appearance: **Slug**, generated from `title`. Must be unique. |
| `category` | Short text | Yes | One of: `travel-updates`, `company-updates`, `support`, `stories` |
| `author` | Short text | Yes | Author name, e.g. `Lanre O.` |
| `date` | Date | Yes | Publication date |
| `excerpt` | Long text | Yes | Preview text shown on listing cards |
| `coverImage` | Asset (Image) | Yes | Cover photo for the card and article header |
| `body` | Rich text | Yes | Full article content |

> **`readTime` is not a Contentful field.** It is auto-calculated on the frontend from the word count of `body` at ~200 words/minute. No need to fill it in manually.

---

## Content Type: `CommunityStory`

**Content type ID:** `communityStory` — already created in Contentful.

### Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | Short text | Yes | Story headline |
| `slug` | Short text | Yes | URL-friendly ID (e.g. `marrakech-tangier-2024`). Appearance: **Slug**, generated from `title`. Must be unique. |
| `author` | Short text | Yes | Tripper's name |
| `date` | Date | Yes | Publication date |
| `readTime` | Short text | No | e.g. `5 min read` — filled in manually (no structured body field) |
| `excerpt` | Long text | Yes | Preview text shown on the community grid card |
| `image` | Asset (Image) | Yes | Cover photo for the card |
| `category` | Short text | No | Default: `stories` |

### Pagination

The community page paginates stories at **9 per page** using URL search params (`?page=2`). Pages are shareable and back-navigation preserves position.

GraphQL query (uses `skip` and `limit`):

```graphql
query CommunityStories($skip: Int!, $limit: Int!) {
  communityStoryCollection(skip: $skip, limit: $limit, order: date_DESC) {
    total
    items {
      sys { id }
      title
      slug
      author
      date
      readTime
      excerpt
      image { url title }
      category
    }
  }
}
```

- `limit` = `9` (PAGE_SIZE constant in `alumni-grid.tsx`)
- `skip` = `(page - 1) * 9`
- `total` from the response drives `totalPages`

---

## Other Fields (Reference)

| Field | Type | Notes |
|-------|------|-------|
| `location` | String | Used to generate the trip URL slug (e.g. "Cancun, Mexico" → `/trips/cancun-mexico`) |
| `startDate` / `endDate` | Date | ISO 8601 format |
| `fullAmount` | Number | Full trip price |
| `downPayment` | Number | Deposit amount |
| `currency` | Symbol | Currency `fullAmount`/`downPayment`/`installments` are priced in: `"GBP"`, `"USD"`, or `"CAD"`. Optional — missing/blank defaults to `"GBP"` for backward compatibility with existing entries |
| `discount` | Number or null | Optional discount |
| `slots` | Number or null | Available seats |
| `installments` | JSON Array | Each: `{ "date", "type", "amount", "installment_number" }` |
| `soldOut` | Boolean | Toggles sold-out state on the trip card |
| `isFeaturedTrip` | Boolean | Surfaces trip in featured sections |
| `travelWithOwners` | Boolean | Shows "Travel with Ovie and Lanre" badge |
| `tags` | Array of Short text (Symbol) | Optional. Free-text pills shown on the trip card (e.g. `Bestseller 💸`, `Travel with Ovie and Lanre`). Leave empty to keep the card's default label |
| `bannerImagesCollection` | Asset Collection | Hero/banner images for the trip detail page |
| `viewsOfLocationCollection` | Asset Collection | Gallery images shown in the "Our view of…" section |
| `description` | Text | Short trip description shown in the overview |
