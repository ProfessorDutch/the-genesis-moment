import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchCollection } from "@/lib/entries";
import { routePath } from "@/lib/publishing";

const BASE_URL = "https://thegenesismoment.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [podcasts, thoughtcasts] = await Promise.all([
          fetchCollection("podcast"),
          fetchCollection("thoughtcast"),
        ]);
        const paths = [
          "/",
          "/podcast",
          "/thoughtcasts",
          "/mustard-seed",
          "/tell-your-story",
          "/donate",
          ...podcasts.map((e) => routePath("podcast", e.slug)),
          ...thoughtcasts.map((t) => routePath("thoughtcast", t.slug)),
        ];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc></url>`),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
