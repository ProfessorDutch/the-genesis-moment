import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowLeft, Share2 } from "lucide-react";
import { fetchCollection, fetchEntry, fetchRedirect, entryImage } from "@/lib/entries";
import {
  canonicalUrl,
  effectiveStatus,
  robotsFor,
  schemaType,
  titleTag,
} from "@/lib/publishing";
import {
  CREATOR_ID,
  jsonLd,
  personNode,
  PODCAST_SERIES_ID,
  WEBSITE_ID,
} from "@/lib/site";

export const Route = createFileRoute("/podcast/$slug")({
  loader: async ({ params }) => {
    const entry = await fetchEntry("podcast", params.slug);
    if (!entry) {
      const to = await fetchRedirect("podcast", params.slug);
      if (to) throw redirect({ to: "/podcast/$slug", params: { slug: to }, statusCode: 301 });
      throw notFound();
    }
    const others = (await fetchCollection("podcast"))
      .filter((e) => e.slug !== entry.slug)
      .slice(0, 3);
    return { entry, others };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Episode not found" }, { name: "robots", content: "noindex, nofollow" }],
      };
    }
    const ep = loaderData.entry;
    const url = canonicalUrl("podcast", params.slug);
    const description = ep.short_description ?? "";
    const released = effectiveStatus(ep) === "published";
    const image = entryImage(ep);
    const type = schemaType(ep);
    return {
      meta: [
        { title: titleTag(ep) },
        { name: "description", content: description },
        { name: "robots", content: robotsFor(ep) },
        { property: "og:title", content: ep.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: ep.title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: jsonLd([
        type === "PodcastEpisode"
          ? {
              "@type": "PodcastEpisode",
              "@id": `${url}#episode`,
              url,
              name: ep.title,
              description,
              partOfSeries: { "@id": PODCAST_SERIES_ID },
              creator: { "@id": CREATOR_ID },
              isPartOf: { "@id": WEBSITE_ID },
              inLanguage: "en-US",
              ...(released && ep.published_at ? { datePublished: ep.published_at } : {}),
              ...(ep.episode_number ? { episodeNumber: ep.episode_number } : {}),
              ...(ep.audio_duration || ep.duration
                ? { timeRequired: ep.audio_duration || ep.duration }
                : {}),
              ...(ep.audio_url
                ? {
                    associatedMedia: {
                      "@type": "AudioObject",
                      contentUrl: ep.audio_url,
                      ...(ep.audio_duration ? { duration: ep.audio_duration } : {}),
                    },
                  }
                : {}),
              ...(ep.guest_name_override
                ? {
                    actor: {
                      "@type": "Person",
                      name: ep.guest_name_override,
                      ...(ep.role_override ? { jobTitle: ep.role_override } : {}),
                    },
                  }
                : {}),
              ...(image ? { image } : {}),
            }
          : {
              "@type": "WebPage",
              "@id": `${url}#page`,
              url,
              name: ep.title,
              description,
              isPartOf: { "@id": WEBSITE_ID },
              about: { "@id": PODCAST_SERIES_ID },
              inLanguage: "en-US",
            },
        personNode,
      ]),
    };
  },

  component: EpisodePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="font-serif text-4xl">Episode not found</h1>
      <Link to="/podcast" className="mt-6 inline-block text-ember">← Back to all episodes</Link>
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

function EpisodePage() {
  const { entry: ep, others } = Route.useLoaderData();
  const guest = ep.guest_name_override ?? "";
  const role = ep.role_override ?? "";
  const runtime = ep.audio_duration || ep.duration || "";

  return (
    <article>
      <section className="bg-cream px-5 pt-10 pb-14 md:px-8 md:pt-16 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <Link to="/podcast" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember">
            <ArrowLeft size={14} /> All episodes
          </Link>
          <div className="mt-10 text-[11px] font-bold uppercase tracking-[0.18em] text-ember">
            {ep.episode_number ? `Episode ${String(ep.episode_number).padStart(2, "0")}` : "Episode"}
            {runtime ? ` · ${runtime}` : ""}
          </div>
          <h1 className="mt-4 font-serif font-bold leading-[0.96] tracking-[-0.04em] text-[clamp(2.5rem,7vw,5rem)]">
            {ep.title}
          </h1>
          {(guest || role) && (
            <div className="mt-6 text-sm uppercase tracking-[0.14em] text-ink/60">
              {[guest, role].filter(Boolean).join(" · ")}
            </div>
          )}
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink/60">
            Part of{" "}
            <Link to="/podcast" className="text-ember hover:underline">
              The Genesis Moment&trade;
            </Link>
            , a conversation series created by{" "}
            <a
              href="https://jasondutchbrown.com/"
              className="underline decoration-ink/25 underline-offset-4 hover:text-ember"
            >
              Jason &ldquo;Dutch&rdquo; Brown
            </a>
            . The story belongs to the guest.
          </p>
        </div>
      </section>

      <section className="bg-paper px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-4xl">
          {ep.youtube_id && (
            <div className="aspect-video w-full bg-ink">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${ep.youtube_id}`}
                title={ep.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          {!ep.youtube_id && ep.audio_url && (
            <audio controls className="w-full" src={ep.audio_url} />
          )}

          <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-5 text-lg leading-relaxed text-ink/85">
              {(ep.body ?? "").split("\n\n").filter(Boolean).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {ep.guest_description && (
                <p className="text-base text-ink/70">{ep.guest_description}</p>
              )}
            </div>
            <aside className="border border-line bg-cream p-6">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-ink/60">
                In this episode
              </div>
              <ul className="mt-4 space-y-3 text-sm text-ink/80">
                {ep.tags.map((tag) => (
                  <li key={tag} className="border-b border-line pb-3 last:border-b-0">
                    {tag}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ink/70 hover:text-ember"
                onClick={() => {
                  if (typeof navigator !== "undefined" && "share" in navigator) {
                    navigator.share({ title: ep.title, url: window.location.href }).catch(() => {});
                  }
                }}
              >
                <Share2 size={14} /> Share this episode
              </button>
            </aside>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-paper px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="section-label mb-6">More episodes</div>
            <ul className="divide-y divide-line border-y border-line">
              {others.map((e) => (
                <li key={e.slug}>
                  <Link
                    to="/podcast/$slug"
                    params={{ slug: e.slug }}
                    className="grid gap-3 py-6 md:grid-cols-[60px_1fr_auto] md:items-center md:gap-8"
                  >
                    <div className="font-serif text-2xl text-ember">
                      {e.episode_number ? String(e.episode_number).padStart(2, "0") : ""}
                    </div>
                    <div>
                      <div className="font-serif text-xl leading-tight md:text-2xl">{e.title}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.14em] text-ink/60">
                        {e.guest_name_override ?? ""}
                      </div>
                    </div>
                    <div className="text-xs uppercase tracking-[0.14em] text-ink/50">
                      {e.audio_duration || e.duration || ""}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
