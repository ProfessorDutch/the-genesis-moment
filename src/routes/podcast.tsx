import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";
import { episodes as staticEpisodes } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";
import stillMic from "@/assets/still-mic.jpg";

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "Podcast — The Genesis Moment" },
      {
        name: "description",
        content:
          "Long-form conversations with faith-based business owners about who they were before the success was visible.",
      },
      { property: "og:title", content: "The Genesis Moment — Podcast" },
      {
        property: "og:description",
        content: "Real stories about faith, family, failure, and the people who believed first.",
      },
      { property: "og:url", content: "/podcast" },
    ],
    links: [{ rel: "canonical", href: "/podcast" }],
  }),
  component: PodcastIndex,
});

function PodcastIndex() {
  const { data: dbRows } = useQuery({
    queryKey: ["public", "episodes", "podcast"],
    queryFn: async () => {
      const { data } = await supabase
        .from("episodes")
        .select("slug, title, excerpt, duration, episode_number, image_url, guest_name_override, role_override, guests(name, role, business, city, website, instagram, x_handle, linkedin, bio)")
        .eq("type", "podcast")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      return data ?? [];
    },
  });
  const episodes =
    dbRows && dbRows.length > 0
      ? dbRows.map((r, i) => ({
          slug: r.slug,
          number: r.episode_number ?? i + 1,
          guest: r.guest_name_override || r.guests?.name || "",
          role: r.role_override || r.guests?.role || "",
          business: r.guests?.business ?? "",
          city: r.guests?.city ?? "",
          website: r.guests?.website ?? "",
          bio: r.guests?.bio ?? "",
          title: r.title,
          excerpt: r.excerpt ?? "",
          duration: r.duration ?? "",
          image: r.image_url ?? undefined,
        }))
      : staticEpisodes.map((e) => ({ ...e, business: "", city: "", website: "", bio: e.description }));
  const [featured, ...rest] = episodes;
  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink-deep text-cream">
        <div className="absolute inset-0">
          <img
            src={stillMic}
            alt="A vintage ribbon microphone under warm tungsten light."
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
            <span className="eyebrow">The Genesis Moment · Podcast</span>
          </div>
          <h1 className="font-serif font-bold leading-[0.94] tracking-[-0.04em] text-[clamp(2.5rem,7vw,4.75rem)]">
            Who they were <span className="italic text-ember">before</span> anyone knew.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/85 md:text-xl">
            Long-form conversations with faith-based business owners, founders, fathers, husbands,
            and mentors. Not about how far they have come. About who they were while they were
            still becoming.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      {featured && (
        <section className="bg-sand px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mono-tag mb-6 text-ember">Latest episode</div>
            <Link
              to="/podcast/$slug"
              params={{ slug: featured.slug }}
              className="group grid gap-8 md:grid-cols-[1fr_1.15fr] md:items-center md:gap-14"
            >
              <div
                className="portrait-frame transition-transform duration-500 group-hover:-translate-y-1"
                style={
                  featured.image
                    ? {
                        backgroundImage: `linear-gradient(180deg, transparent 45%, oklch(0.12 0.012 55 / 0.78)), url(${featured.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : undefined
                }
              />
              <div>
                <div className="mono-tag text-ember">
                  Episode {String(featured.number).padStart(2, "0")} · {featured.duration}
                </div>
                <h2 className="mt-3 font-serif text-3xl leading-[1.05] tracking-[-0.03em] md:text-5xl">
                  {featured.title}
                </h2>
                <div className="mt-4 text-sm uppercase tracking-[0.12em] text-ink/60">
                  {featured.guest} · {featured.role}
                </div>
                <p className="mt-5 text-lg leading-relaxed text-ink/85">{featured.excerpt}</p>
                <div className="mt-8 inline-flex items-center gap-2 bg-ink-deep px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform group-hover:-translate-y-0.5">
                  <Play size={14} /> Listen to episode
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* STACKED INDEX */}
      <section className="bg-cream px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-end justify-between">
            <div className="section-label">All Episodes</div>
            <div className="mono-tag text-ink/50">{episodes.length} recorded</div>
          </div>
          <hr className="rule-ember" />

          <ul className="mt-10 flex flex-col divide-y divide-line">
            {rest.map((ep) => (
              <li key={ep.slug} className="py-10 first:pt-0 last:pb-0">
                <Link
                  to="/podcast/$slug"
                  params={{ slug: ep.slug }}
                  className="group grid gap-6 md:grid-cols-[280px_1fr] md:gap-10"
                >
                  <div
                    className="aspect-[4/5] w-full overflow-hidden bg-sand transition-transform duration-500 group-hover:-translate-y-1"
                    style={
                      ep.image
                        ? {
                            backgroundImage: `linear-gradient(180deg, transparent 55%, oklch(0.12 0.012 55 / 0.55)), url(${ep.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : undefined
                    }
                  />
                  <div className="flex flex-col">
                    <div className="mono-tag text-ember">
                      Episode {String(ep.number).padStart(2, "0")} · {ep.duration}
                    </div>
                    <h3 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.025em] group-hover:text-ember md:text-4xl">
                      {ep.title}
                    </h3>
                    <div className="mt-3 text-sm uppercase tracking-[0.12em] text-ink/60">
                      {ep.guest} — {ep.role}
                      {ep.city ? <span className="text-ink/40"> · {ep.city}</span> : null}
                    </div>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80">
                      {ep.excerpt}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ember">
                      <Play size={12} /> Listen
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
          <div className="mono-tag mb-4 text-ember">Know someone with a Genesis Moment?</div>
          <h2 className="font-serif text-3xl leading-tight tracking-[-0.03em] md:text-5xl">
            Somebody bet on the guest you just heard.
            <br />
            <span className="italic text-ember">This is us betting on the next one.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/tell-your-story"
              className="bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white hover:-translate-y-0.5 transition-transform"
            >
              Nominate a story
            </Link>
            <a
              href="tel:+18443213669"
              className="border border-cream/30 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream hover:border-ember hover:text-ember"
            >
              Call Emmy · 844-321-3669
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
