# Pre-Commit Checklist — Homepage Redesign

Complete all items below before committing or pushing this branch.

---

## 1. Ogg Font — DONE ✅

Font files sourced from `app/fonts/Ogg Font Family/`. Using `Ogg-Bold.ttf`.
Export active in `app/font.ts`, variable applied in `components/app-layout.tsx`.

**Tailwind class:** `font-ogg-trial` — live on all headings.

---

## 2. Hardcoded Fallbacks — Remove / Connect to Real Data

### `components/ui/trip-card.tsx` — line 66
**Hardcoded:** Host badge shows "Trip Cooks" for every card.
**Fix:** Connect to a real `host` or `travelWithOwners` field from the CMS trip data. Add the field to `TripType` / `CartItem` and pass it through.
```tsx
// Replace:
Trip Cooks
// With:
{item.host ?? "Trip Cooks"}  // after adding `host` to CartItem type
```

### `app/home/_components/feature-trip.tsx` — line 98
**Hardcoded:** Group size shows "12–18 people" for every featured trip.
**Fix:** Add a `groupSize` field to the CMS trip schema and `TripType`. Then use:
```tsx
// Replace:
12–18 people
// With:
{trip.groupSize ?? "12–18 people"}
```

### `app/home/_components/blog-callout.tsx` — `BLOG_POSTS` array
**Hardcoded:** 4 static placeholder blog articles with fake dates, images from trip assets.
**Fix:** Connect to the CMS blog collection. Add a blog query + type, fetch via Apollo/`useGeneralStore`, and replace the static `BLOG_POSTS` array with real data.
```tsx
// Replace the static BLOG_POSTS constant and map over real CMS blog data instead
```

### `app/home/_components/community.tsx` — `handle` field
**Hardcoded:** Social handles are constructed as `@{location}TC` (e.g. `@MarrakechTC`) — these are made up.
**Fix:** Add a `socialHandle` or `authorHandle` field to the reviews CMS schema and use it:
```tsx
// Replace:
handle: `@${review.location?.replace(/\s/g, "")}TC`,
// With:
handle: review.socialHandle ?? "",
```

---

## 3. Plus Jakarta Sans — Already Working

Loaded from Google Fonts. No action needed. Applied globally as the default body font.

---

## Quick Checklist

- [x] Ogg font — active (`app/fonts/Ogg Font Family/Ogg-Bold.ttf`)
- [ ] `components/ui/trip-card.tsx` — hardcoded "Trip Cooks" host badge removed
- [ ] `app/home/_components/feature-trip.tsx` — hardcoded "12–18 people" removed
- [ ] `app/home/_components/blog-callout.tsx` — static `BLOG_POSTS` replaced with CMS data
- [ ] `app/home/_components/community.tsx` — fake social handles replaced with CMS field
