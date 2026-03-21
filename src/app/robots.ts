import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/termeni", "/confidentialitate", "/cookies"],
        disallow: ["/dashboard", "/contestatie/", "/account", "/admin"],
      },
    ],
    sitemap: "https://www.contestatieamenda.ro/sitemap.xml",
  };
}
