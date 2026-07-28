import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { thoughtcasts as staticThoughtcasts } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";
import chapelQuiet from "@/assets/chapel-quiet.jpg";

export const Route = createFileRoute("/thoughtcasts")({
  head: () => ({
    meta: [
      { title: "Thoughtcasts — The Genesis Moment" },
      {
        name: "description",
        content:
          "Short spoken pieces about faith, identity, failure, forgiveness, and the way human beings affect one another.",
      },
      { property: "og:title", content: "Thoughtcasts — The Genesis Moment" },
      {
        property: "og:description",
        content: "Short thoughts worth stopping for. Faith, becoming, and the moments in between.",
      },
      { property: "og:url", content: "/thoughtcasts" },
    ],
    links: [{ rel: "canonical", href: "/thoughtcasts" }],
  }),
  component: ThoughtcastsIndex,
});

function ThoughtcastsIndex() {
  const { data: dbRows } = useQuery({
    queryKey: ["public", "episodes", "thoughtcast"],
    queryFn: async () => {
      const { data } = await supabase
        .from("episodes")
        .select("slug, title, excerpt, duration, image_url, tags")
        .eq("type", "thoughtcast")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      return data ?? [];
    },
  });
  const thoughtcasts =
    dbRows && dbRows.length > 0
      ? dbRows.map((r) => ({
          slug: r.slug,
          title: r.title,
          thesis: r.excerpt ?? "",
          topic: r.tags?.[0] ?? "General",
          duration: r.duration ?? "",
          image: r.image_url ?? undefined,
        }))
      : staticThoughtcasts;
  const topics = useMemo(
    () => ["All", ...Array.from(new Set(thoughtcasts.map((t) => t.topic)))],
    [thoughtcasts],
  );
  const [topic, setTopic] = useState("All");
  const filtered = topic === "All" ? thoughtcasts : thoughtcasts.filter((t) => t.topic === topic);
  const [featured, ...rest] = filtered;

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink-deep text-cream">
        <div className="absolute inset-0">
          <img
            src={chapelQuiet}
            alt="A quiet sunlit chapel interior with warm morning light through arched windows."
            className="h-full w-full object-cover object-center"
            width={1600}
            height={1200}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.135 0.012 55 / 0.94) 0%, oklch(0.135 0.012 55 / 0.72) 55%, oklch(0.135 0.012 55 / 0.28) 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 pt-20 pb-16 md:px-8 md:pt-32 md:pb-24">
          <div className="mb-5 flex items-center gap-2 text-ember">
            <span className="eyebrow">Thoughtcasts · How we heal</span>
          </div>
          <h1 className="font-serif font-bold leading-[0.94] tracking-[-0.04em] text-[clamp(2.5rem,7vw,4.75rem)]">
            The thought inside <span className="italic text-ember">the story.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/85 md:text-xl">
            Not motivational quotes. Short, honest conversations about faith, identity, failure,
            grief, forgiveness, and becoming — the kind of thought you would stop for.
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="border-y border-line bg-paper px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`shrink-0 border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${
                topic === t
                  ? "border-ember bg-ember text-white"
                  : "border-line bg-transparent text-ink/70 hover:border-ember hover:text-ember"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      {featured && (
        <section className="bg-sand px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mono-tag mb-6 text-ember">The latest thought</div>
            <Link
              to="/thoughtcasts/$slug"
              params={{ slug: featured.slug }}
              className="group grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-14"
            >
              <div
                className="portrait-frame transition-transform duration-500 group-hover:-translate-y-1"
                style={{
                  aspectRatio: "9/14",
                  ...(featured.image
                    ? {
                        backgroundImage: `linear-gradient(180deg, transparent 45%, oklch(0.12 0.012 55 / 0.78)), url(${featured.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : {}),
                }}
              />
              <div>
                <div className="mono-tag text-ember">
                  {featured.topic} · {featured.duration}
                </div>
                <h2 className="mt-3 font-serif text-3xl leading-[1.05] tracking-[-0.03em] md:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-6 font-serif text-xl italic leading-snug text-ink/85 md:text-2xl">
                  "{featured.thesis}"
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* STACKED INDEX */}
      <section className="bg-cream px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-end justify-between">
            <div className="section-label">All Thoughtcasts</div>
            <div className="mono-tag text-ink/50">{filtered.length} recorded</div>
          </div>
          <hr className="rule-ember" />

          <ul className="mt-10 flex flex-col divide-y divide-line">
            {rest.map((t) => (
              <li key={t.slug} className="py-10 first:pt-0 last:pb-0">
                <Link
                  to="/thoughtcasts/$slug"
                  params={{ slug: t.slug }}
                  className="group grid gap-6 md:grid-cols-[220px_1fr] md:gap-10"
                >
                  <div
                    className="w-full overflow-hidden bg-sand transition-transform duration-500 group-hover:-translate-y-1"
                    style={{
                      aspectRatio: "9/14",
                      ...(t.image
                        ? {
                            backgroundImage: `linear-gradient(180deg, transparent 55%, oklch(0.12 0.012 55 / 0.55)), url(${t.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : {}),
                    }}
                  />
                  <div className="flex flex-col">
                    <div className="mono-tag text-ember">
                      {t.topic} · {t.duration}
                    </div>
                    <h3 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.025em] group-hover:text-ember md:text-4xl">
                      {t.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80">
                      {t.thesis}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ember">
                      Watch the thought →
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-ink-deep px-5 py-20 text-cream md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mono-tag mb-4 text-ember">The whole picture</div>
          <h2 className="font-serif text-3xl leading-tight tracking-[-0.03em] md:text-5xl">
            The <span className="italic text-ember">Mustard Seed</span> is why.
            <br />
            The <span className="italic text-ember">Genesis Moment</span> is how.
            <br />
            Thoughtcasts are how we heal.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/mustard-seed"
              className="bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white hover:-translate-y-0.5 transition-transform"
            >
              About The Mustard Seed
            </Link>
            <Link
              to="/podcast"
              className="border border-cream/30 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream hover:border-ember hover:text-ember"
            >
              Listen to the podcast
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
