import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { fetchCollection, fetchEntry, fetchRedirect } from "@/lib/entries";
import { canonicalUrl, robotsFor, titleTag } from "@/lib/publishing";
import {
  CREATOR_ID,
  CREATOR_URL,
  jsonLd,
  personNode,
  THOUGHTCAST_SERIES_ID,
  THOUGHTCAST_TERM_ID,
  THOUGHTCAST_TERM_URL,
} from "@/lib/site";

export const Route = createFileRoute("/thoughtcasts/$slug")({
  loader: async ({ params }) => {
    const entry = await fetchEntry("thoughtcast", params.slug);
    if (!entry) {
      const to = await fetchRedirect("thoughtcast", params.slug);
      if (to) throw redirect({ to: "/thoughtcasts/$slug", params: { slug: to }, statusCode: 301 });
      throw notFound();
    }
    const topic = entry.tags?.[0];
    const related = (await fetchCollection("thoughtcast"))
      .filter((t) => t.slug !== entry.slug && (!topic || t.tags?.[0] === topic))
      .slice(0, 3);
    return { entry, related, topic: topic ?? "" };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Thoughtcast not found" },
          { name: "robots", content: "noindex, nofollow" },
        ],
      };
    }
    const t = loaderData.entry;
    const url = canonicalUrl("thoughtcast", params.slug);
    const description = t.short_description ?? "";
    return {
      meta: [
        { title: titleTag(t) },
        { name: "description", content: description },
        { name: "robots", content: robotsFor(t) },
        { property: "og:title", content: t.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: t.title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: jsonLd([
        {
          "@type": "Article",
          "@id": `${url}#article`,
          url,
          headline: t.title,
          description,
          author: { "@id": CREATOR_ID },
          creator: { "@id": CREATOR_ID },
          isPartOf: { "@id": THOUGHTCAST_SERIES_ID },
          about: { "@id": THOUGHTCAST_TERM_ID },
          inLanguage: "en-US",
          ...(t.published_at ? { datePublished: t.published_at } : {}),
          ...(t.updated_at ? { dateModified: t.updated_at } : {}),
          ...(t.audio_url
            ? {
                audio: {
                  "@type": "AudioObject",
                  contentUrl: t.audio_url,
                  ...(t.audio_duration ? { duration: t.audio_duration } : {}),
                },
              }
            : {}),
        },
        personNode,
      ]),
    };
  },

  component: ThoughtcastPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="font-serif text-4xl">Thoughtcast not found</h1>
      <Link to="/thoughtcasts" className="mt-6 inline-block text-ember">← Back to Thoughtcasts</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="font-serif text-3xl">Something went wrong</h1>
      <p className="mt-3 text-ink/70">{error.message}</p>
      <button onClick={reset} className="mt-6 bg-ember px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white">Try again</button>
    </div>
  ),
});

function ThoughtcastPage() {
  const { entry: t, related, topic } = Route.useLoaderData();
  const runtime = t.audio_duration || t.duration || "";

  return (
    <article>
      <section className="bg-cream px-5 pt-10 pb-14 md:px-8 md:pt-16 md:pb-20">
        <div className="mx-auto max-w-3xl">
          <Link to="/thoughtcasts" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember">
            <ArrowLeft size={14} /> All Thoughtcasts
          </Link>
          <div className="mt-10 text-[11px] font-bold uppercase tracking-[0.18em] text-ember">
            {[topic, runtime].filter(Boolean).join(" · ")}
          </div>
          <h1 className="mt-4 font-serif font-bold leading-[0.98] tracking-[-0.035em] text-[clamp(2.25rem,6vw,4.25rem)]">
            {t.title}
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-ink/65">
            A{" "}
            <a
              href={THOUGHTCAST_TERM_URL}
              className="underline decoration-ink/25 underline-offset-4 hover:text-ember"
            >
              Thoughtcast&trade;
            </a>{" "}
            by{" "}
            <a
              href={CREATOR_URL}
              className="underline decoration-ink/25 underline-offset-4 hover:text-ember"
            >
              Jason &ldquo;Dutch&rdquo; Brown
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-paper px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-3xl">
          {t.youtube_id && (
            <div className="mx-auto aspect-[9/16] max-w-md bg-ink">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${t.youtube_id}`}
                title={t.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          {!t.youtube_id && t.audio_url && (
            <audio controls className="w-full" src={t.audio_url} />
          )}
          <p className="mt-10 font-serif text-2xl leading-snug tracking-[-0.02em] text-ink md:text-3xl">
            "{t.short_description}"
          </p>
          {(t.body ?? "").split("\n\n").filter(Boolean).map((p, i) => (
            <p key={i} className="mt-6 text-lg leading-relaxed text-ink/80">
              {p}
            </p>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="section-label mb-6">{topic ? `More on ${topic}` : "More Thoughtcasts"}</div>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/thoughtcasts/$slug"
                  params={{ slug: r.slug }}
                  className="border border-line bg-paper p-6 hover:border-ember"
                >
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ember">
                    {[r.tags?.[0], r.audio_duration || r.duration].filter(Boolean).join(" · ")}
                  </div>
                  <div className="mt-3 font-serif text-xl leading-tight tracking-[-0.02em]">
                    {r.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
