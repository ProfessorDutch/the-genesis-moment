import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { thoughtcasts } from "@/lib/content";

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
  const topics = useMemo(
    () => ["All", ...Array.from(new Set(thoughtcasts.map((t) => t.topic)))],
    [],
  );
  const [topic, setTopic] = useState("All");
  const filtered = topic === "All" ? thoughtcasts : thoughtcasts.filter((t) => t.topic === topic);

  return (
    <div>
      <section className="bg-cream px-5 pt-16 pb-10 md:px-8 md:pt-24 md:pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="eyebrow mb-5">Thoughtcasts</div>
          <h1 className="font-serif font-bold leading-[0.94] tracking-[-0.04em] text-[clamp(2.75rem,8vw,5.5rem)]">
            The thought inside the story.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/75 md:text-xl">
            Not motivational quotes. Short, honest conversations about faith, identity, failure,
            grief, forgiveness, and becoming — the kind of thought you would stop for.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-paper px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto">
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

      <section className="bg-cream px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <Link
              key={t.slug}
              to="/thoughtcasts/$slug"
              params={{ slug: t.slug }}
              className="group flex flex-col border border-line bg-paper p-6 transition-colors hover:border-ember"
            >
              <div
                className="portrait-frame mb-6"
                style={{
                  aspectRatio: "9/14",
                  ...(t.image
                    ? {
                        backgroundImage: `linear-gradient(180deg, transparent 45%, oklch(0.12 0.012 55 / 0.78)), url(${t.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : {}),
                }}
              />
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ember">
                {t.topic} · {t.duration}
              </div>
              <div className="mt-3 font-serif text-2xl leading-tight tracking-[-0.02em]">
                {t.title}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{t.thesis}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}