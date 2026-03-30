import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cart", "/checkout", "/payment-success"],
      },
    ],
    sitemap: "https://tripcooks.tours/sitemap.xml",
  };
}
