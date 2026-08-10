export type BlogCategory =
  | "travel-updates"
  | "company-updates"
  | "support"
  | "stories";

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
