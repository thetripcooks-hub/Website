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

### "Not Included" column (future field: `whatsNotIncluded`)

Currently the "Not Included" column is hardcoded in the frontend with 3 default items:
- Flight ticket
- Breakfast
- Airport pickup and transfer

**To make this dynamic per trip:**

1. Add a new JSON Array field called `whatsNotIncluded` to the `Trip` content type in Contentful
2. Set the following as the **default value** so every new trip is pre-filled:

```json
[
  { "title": "Flight ticket" },
  { "title": "Breakfast" },
  { "title": "Airport pickup and transfer" }
]
```

**How to set default values in Contentful:**
1. Open your `Trip` content type in Contentful
2. Click **Add field** → JSON Object → name it `whatsNotIncluded`
3. Under **Default value**, paste the JSON above
4. Save and publish the content type

Every new trip entry will start with these 3 not-included items pre-populated. Modify per trip as needed.

> ⚠️ **TODO (code cleanup):** Once `whatsNotIncluded` is added to Contentful and the GraphQL query is updated to fetch it, update `whats-included.tsx` to read from `selectedTrip.whatsNotIncluded` instead of the hardcoded `DEFAULT_NOT_INCLUDED` constant. Also add `whatsNotIncluded` to the trip query in `queries/trips-query.ts`.

---

## Checklist — Per Trip

For each trip entry in Contentful, verify:

- [ ] Every `itinerary` day has a `description` field filled in
- [ ] `whatsIncluded` lists all items that are included in the trip price (each just needs a `title`)
- [ ] All `coverImage` URLs in `itinerary` are valid and publicly accessible

---

---

## Content Type: `Community Story` (future)

Community stories are currently hardcoded in `app/community/_components/community-data.ts`. When you're ready to manage them from Contentful, create a new content type called `CommunityStory` with the fields below, add a GraphQL query, and replace the hardcoded array.

### Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | Short text | Yes | Story headline |
| `slug` | Short text | Yes | URL-friendly ID (e.g. `marrakech-tangier-2024`). Must be unique |
| `author` | Short text | Yes | Tripper's name |
| `date` | Date | Yes | Publication date |
| `readTime` | Short text | No | e.g. `5 min read` |
| `excerpt` | Long text | Yes | Preview text shown on the community grid card |
| `image` | Asset (Image) | Yes | Cover photo for the card |
| `category` | Short text | No | Default: `stories` |

### Pagination

The community page paginates stories at **9 per page** using URL search params (`?page=2`). Pages are shareable and back-navigation preserves position.

When stories are managed from Contentful, update the GraphQL query to use `skip` and `limit`:

```graphql
query CommunityStories($skip: Int!, $limit: Int!) {
  communityStoryCollection(skip: $skip, limit: $limit, order: date_DESC) {
    total
    items {
      title
      slug
      author
      date
      readTime
      excerpt
      image { url }
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
| `discount` | Number or null | Optional discount |
| `slots` | Number or null | Available seats |
| `installments` | JSON Array | Each: `{ "date", "type", "amount", "installment_number" }` |
| `soldOut` | Boolean | Toggles sold-out state on the trip card |
| `isFeaturedTrip` | Boolean | Surfaces trip in featured sections |
| `travelWithOwners` | Boolean | Shows "Travel with Ovie and Lanre" badge |
| `bannerImagesCollection` | Asset Collection | Hero/banner images for the trip detail page |
| `viewsOfLocationCollection` | Asset Collection | Gallery images shown in the "Our view of…" section |
| `description` | Text | Short trip description shown in the overview |
