export type BlogCategory =
  | "travel-updates"
  | "company-updates"
  | "support"
  | "stories";

export type BlogPost = {
  id: string;
  slug: string;
  category: BlogCategory;
  author: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
};

export const CATEGORIES = [
  "All",
  "Travel updates",
  "Company updates",
  "Support",
  "Stories from our community",
];

export const CATEGORY_MAP: Record<string, BlogCategory> = {
  "Travel updates": "travel-updates",
  "Company updates": "company-updates",
  Support: "support",
  "Stories from our community": "stories",
};

export const CATEGORY_LABEL: Record<BlogCategory, string> = {
  "travel-updates": "Travel updates",
  "company-updates": "Company updates",
  support: "Support",
  stories: "Stories from our community",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "10-things-to-pack-for-a-group-trip",
    category: "travel-updates",
    author: "Lanre O.",
    date: "April 9, 2026",
    readTime: "5 min read",
    title: "10 Things to Pack for a Group Trip (That Nobody Ever Does)",
    excerpt:
      "Veteran group travellers share the most overlooked essentials that make or break a shared adventure. From portable chargers to foldable tote bags.",
    image: "/img/public-trip.svg",
  },
  {
    id: "2",
    slug: "why-group-travel-is-the-new-solo-travel",
    category: "travel-updates",
    author: "Amara D.",
    date: "March 22, 2026",
    readTime: "4 min read",
    title: "Why Group Travel Is the New Solo Travel",
    excerpt:
      "Forget what you thought you knew about travelling in a group. The new wave of curated group trips is changing everything.",
    image: "/img/private-trip.svg",
  },
  {
    id: "3",
    slug: "top-5-destinations-for-first-time-group-travellers",
    category: "travel-updates",
    author: "Kofi B.",
    date: "March 10, 2026",
    readTime: "6 min read",
    title: "Top 5 Destinations for First-Time Group Travellers",
    excerpt:
      "Not sure where to start? These five destinations are perfectly suited for first-timers looking to explore with a crew.",
    image: "/img/travel-planning.svg",
  },
  {
    id: "4",
    slug: "how-to-budget-for-a-group-trip",
    category: "travel-updates",
    author: "Lanre O.",
    date: "February 28, 2026",
    readTime: "3 min read",
    title: "How to Budget for a Group Trip Without Losing Friends",
    excerpt:
      "Money talk can get awkward. Here's how top group travel organizers keep costs transparent and friendships intact.",
    image: "/img/public-trip.svg",
  },
  {
    id: "5",
    slug: "introducing-private-trip-bookings",
    category: "company-updates",
    author: "Trip Cooks Team",
    date: "April 1, 2026",
    readTime: "2 min read",
    title: "Introducing Private Trip Bookings: Exclusively Yours",
    excerpt:
      "We're thrilled to launch a brand new feature: book a private trip tailored entirely to your group's preferences and schedule.",
    image: "/img/private-trip.svg",
  },
  {
    id: "6",
    slug: "trip-cooks-turns-two",
    category: "company-updates",
    author: "Trip Cooks Team",
    date: "March 15, 2026",
    readTime: "3 min read",
    title: "Trip Cooks Turns Two — Here's What We've Learned",
    excerpt:
      "Two years of organising unforgettable group adventures. From our first trip to over 1,000 travellers, this is our story so far.",
    image: "/img/travel-planning.svg",
  },
  {
    id: "7",
    slug: "how-to-modify-your-booking",
    category: "support",
    author: "Support Team",
    date: "April 5, 2026",
    readTime: "2 min read",
    title: "How to Modify or Cancel Your Booking",
    excerpt:
      "Life happens. Here's a step-by-step guide on how to make changes to your booking through your Trip Cooks account.",
    image: "/img/public-trip.svg",
  },
  {
    id: "8",
    slug: "what-is-included-in-your-trip-package",
    category: "support",
    author: "Support Team",
    date: "March 30, 2026",
    readTime: "3 min read",
    title: "What Exactly Is Included in Your Trip Package?",
    excerpt:
      "We break down every line item in your trip package so you know exactly what you're paying for — and what to expect.",
    image: "/img/travel-planning.svg",
  },
  {
    id: "9",
    slug: "morocco-changed-my-life",
    category: "stories",
    author: "Funmi A.",
    date: "April 8, 2026",
    readTime: "7 min read",
    title: "Morocco Changed My Life — Here's the Unfiltered Story",
    excerpt:
      "I didn't expect a 10-day group trip to rewire how I see the world. But Marrakech had other plans.",
    image: "/img/private-trip.svg",
  },
  {
    id: "10",
    slug: "travelling-solo-in-a-group",
    category: "stories",
    author: "David K.",
    date: "March 25, 2026",
    readTime: "5 min read",
    title: "What It's Like to Travel 'Solo' in a Trip Cooks Group",
    excerpt:
      "I signed up for a group trip knowing no one. Eight days later I left with a WhatsApp group, a few great memories, and two new best friends.",
    image: "/img/public-trip.svg",
  },
  {
    id: "11",
    slug: "how-we-plan-our-group-itineraries",
    category: "company-updates",
    author: "Trip Cooks Team",
    date: "February 20, 2026",
    readTime: "4 min read",
    title: "Behind the Scenes: How We Plan Our Group Itineraries",
    excerpt:
      "Ever wondered how we put together such seamless trips? Our head of experiences shares the process from start to finish.",
    image: "/img/travel-planning.svg",
  },
  {
    id: "12",
    slug: "visa-guide-for-african-travellers",
    category: "travel-updates",
    author: "Amara D.",
    date: "February 12, 2026",
    readTime: "8 min read",
    title: "The Ultimate Visa Guide for African Travellers in 2026",
    excerpt:
      "Navigating visas as an African passport holder can be complex. We've compiled everything you need to know for the most popular destinations.",
    image: "/img/private-trip.svg",
  },
];

export const ARTICLE_SECTIONS = [
  { id: "section-1", label: "Overview" },
  { id: "section-2", label: "The background story" },
  { id: "section-3", label: "Key takeaways" },
];

export const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
