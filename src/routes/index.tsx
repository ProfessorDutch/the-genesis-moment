import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { episodes, thoughtcasts } from "@/lib/content";
import { SeedMark } from "@/components/seed-mark";

const frameStyle = (url?: string) =>
  url
    ? {
        backgroundImage: `linear-gradient(180deg, transparent 45%, oklch(0.12 0.012 55 / 0.78)), url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Genesis Moment — Who believed in you first?" },
      {
        name: "description",
        content:
          "Stories of faith-based business owners, the people who believed in them, and what grew from that belief.",
      },
      { property: "og:title", content: "The Genesis Moment — Who believed in you first?" },
      {
        property: "og:description",
        content:
          "Stories of faith-based business owners, the people who believed in them, and what grew from that belief.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = episodes[0];
  const moreEpisodes = episodes.slice(1, 4);
  const featuredThoughts = thoughtcasts.slice(0, 3);

  return (
    <div>
      {/* HERO — text-only left, typographic pull-quote right (no photo duplication) */}
      <section className="relative overflow-hidden bg-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 85% 15%, oklch(0.68 0.19 45 / 0.14), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 md:grid md:grid-cols-[1.2fr_1fr] md:gap-16 md:px-8 md:pt-24 md:pb-28">
          <div>
            <div className="mb-6 flex items-center gap-2 text-ember">
              <SeedMark size={16} />
              <span className="eyebrow">Stories of faith-based business owners</span>
            </div>
            <h1 className="font-serif font-bold text-ink tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,7vw,4.75rem)]">
              Who saw<br />
              something in<br />
              you first?
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink/80 md:text-xl">
              Stories of faith-based business owners, the people who believed in them, and what
              grew from that belief.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/podcast"
                className="inline-flex items-center gap-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
              >
                Watch the Stories <ArrowRight size={14} />
              </Link>
              <Link
                to="/tell-your-story"
                className="inline-flex items-center gap-2 border border-ink/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ember hover:text-ember"
              >
                Tell Your Story
              </Link>
            </div>
          </div>

          {/* Editorial pull-quote — a stack of three voices, no photo */}
          <aside className="mt-16 md:mt-2">
            <div className="border-l-[3px] border-ember bg-sand/70 px-6 py-8 md:px-8 md:py-10">
              <div className="mono-tag text-ember">Voices on the record</div>
              <div className="mt-5 space-y-6 font-serif tracking-[-0.02em] text-ink">
                <blockquote className="text-2xl leading-snug md:text-[1.75rem]">
                  &ldquo;My wife believed in me before I believed in myself.&rdquo;
                  <cite className="mt-2 block text-[11px] not-italic uppercase tracking-[0.16em] text-ink/55">
                    Marcus Hale · Hale &amp; Sons Roofing
                  </cite>
                </blockquote>
                <hr className="rule-ember" />
                <blockquote className="text-2xl leading-snug md:text-[1.75rem]">
                  &ldquo;My dad bought me my first toolbox.&rdquo;
                  <cite className="mt-2 block text-[11px] not-italic uppercase tracking-[0.16em] text-ink/55">
                    Ray Delgado · Delgado Custom Millwork
                  </cite>
                </blockquote>
                <hr className="rule-ember" />
                <blockquote className="text-2xl leading-snug md:text-[1.75rem]">
                  &ldquo;One phone call. One yes. A whole different life.&rdquo;
                  <cite className="mt-2 block text-[11px] not-italic uppercase tracking-[0.16em] text-ink/55">
                    Jonah Reyes · Reyes Electric
                  </cite>
                </blockquote>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* LATEST GENESIS MOMENT — the single visual featured story, distinct from hero */}
      <section className="bg-paper px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="section-label mb-4">Latest Genesis Moment · Episode 01</div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-0.03em] md:text-5xl">
                The first toolbox my father ever bought me.
              </h2>
            </div>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-16">
            <Link
              to="/podcast/$slug"
              params={{ slug: featured.slug }}
              className="portrait-frame block"
              style={frameStyle(featured.image)}
            />
            <div>
              <blockquote className="font-serif text-3xl leading-[1.05] tracking-[-0.03em] md:text-4xl">
                &ldquo;Before the shop, before the crew, before anyone knew his name — Ray was
                living with his mother and did not believe he was going to make it.&rdquo;
              </blockquote>
              <div className="mt-4 text-sm uppercase tracking-[0.12em] text-ink/60">
                Ray Delgado · Founder, Delgado Custom Millwork
              </div>
              <p className="drop-cap mt-8 text-lg leading-relaxed text-ink/85">
                A conversation about the years before the business existed. About the father who
                bought a set of tools when there was no reason yet to believe they would matter.
                About the wife who kept praying while Ray still questioned whether he was the man
                for the job.
              </p>
              <Link
                to="/podcast/$slug"
                params={{ slug: featured.slug }}
                className="mt-8 inline-flex items-center gap-2 bg-ink-deep px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5"
              >
                <Play size={14} /> Watch Episode
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THE PEOPLE BEHIND THE STORY — dark editorial band */}
      <section className="bg-ink-deep px-5 py-24 text-cream md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex items-center gap-2 text-ember">
            <SeedMark size={16} />
            <span className="section-label">The People Behind the Story</span>
          </div>
          <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
            Most people can tell you what they built.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/75 md:text-xl">
            We want to know who helped them become the person who could build it.
          </p>

          <ol className="mt-14 space-y-4 border-l-[3px] border-ember pl-6 font-serif text-2xl leading-snug tracking-[-0.02em] text-cream md:text-3xl">
            <li>The father who bought the tools.</li>
            <li>The wife who carried the bills.</li>
            <li>The friend who gave the first opportunity.</li>
            <li>The mentor who made the introduction.</li>
            <li>The person who prayed.</li>
            <li>The person who stayed.</li>
            <li>The person who saw something worth believing in.</li>
          </ol>

          <p className="mt-14 font-serif italic text-3xl leading-snug text-cream/90 md:text-4xl">
            Where would you be if they hadn&rsquo;t?
          </p>
        </div>
      </section>

      {/* MORE GENESIS MOMENTS — real guests only, no placeholders */}
      <section className="bg-cream px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="section-label mb-4">More Genesis Moments</div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-0.035em] md:text-5xl">
                The story behind the person.
              </h2>
            </div>
            <Link
              to="/podcast"
              className="hidden shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember hover:underline md:inline-flex"
            >
              All episodes <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {moreEpisodes.map((ep) => (
              <Link
                key={ep.slug}
                to="/podcast/$slug"
                params={{ slug: ep.slug }}
                className="group flex flex-col border border-line bg-paper p-6 transition-colors hover:border-ember"
              >
                <div
                  className="portrait-frame mb-6"
                  style={{ aspectRatio: "4/5", ...frameStyle(ep.image) }}
                />
                <div className="mono-tag text-ember">
                  Ep. {String(ep.number).padStart(2, "0")} · {ep.duration}
                </div>
                <div className="mt-3 font-serif text-2xl leading-tight tracking-[-0.02em]">
                  {ep.title}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.12em] text-ink/60">
                  {ep.guest} · {ep.role}
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/70">
                  {ep.excerpt}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember">
                  Watch <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* THE STORY BEFORE THE SUCCESS — sand surface, drop cap */}
      <section className="bg-sand px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="section-label mb-4">The Story Before the Success</div>
          <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
            Success is easy to see.
          </h2>
          <p className="mt-8 font-serif italic text-2xl leading-snug text-ink/80 md:text-3xl">
            The beginning usually is not.
          </p>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/85 md:text-xl">
            <p className="drop-cap">
              The Genesis Moment goes back to the seasons when people felt unsure, behind,
              embarrassed, rejected, or simply unable to imagine what their life might eventually
              become.
            </p>
            <p>Those are often the parts of the story people need most.</p>
            <p>
              Because the successful business owner may feel impossible to relate to. The person
              they used to be usually does not.
            </p>
          </div>
        </div>
      </section>

      {/* THOUGHTCASTS */}
      <section className="bg-cream px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="section-label mb-4">Thoughtcasts</div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-0.035em] md:text-5xl">
                One idea worth stopping for.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">
                Short spoken pieces about faith, identity, failure, relationships, grief, belief,
                and the things that shape who we become.
              </p>
            </div>
            <Link
              to="/thoughtcasts"
              className="hidden shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember hover:underline md:inline-flex"
            >
              All Thoughtcasts <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featuredThoughts.map((t) => (
              <Link
                key={t.slug}
                to="/thoughtcasts/$slug"
                params={{ slug: t.slug }}
                className="group flex flex-col border border-line bg-paper p-6 transition-colors hover:border-ember"
              >
                <div
                  className="portrait-frame mb-6"
                  style={{ aspectRatio: "16/10", ...frameStyle(t.image) }}
                />
                <div className="mono-tag text-ember">
                  {t.topic} · {t.duration}
                </div>
                <div className="mt-3 font-serif text-2xl leading-tight tracking-[-0.02em]">
                  {t.title}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-ink/70">
                  &ldquo;{t.thesis}&rdquo;
                </blockquote>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember">
                  Watch <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 md:hidden">
            <Link
              to="/thoughtcasts"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember hover:underline"
            >
              All Thoughtcasts <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* THE MUSTARD SEED — poem-typeset quote block */}
      <section className="relative bg-mustard px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-2 text-ember">
            <SeedMark size={18} />
            <span className="section-label">The Mustard Seed</span>
          </div>
          <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
            Your beginning may be the part a kid needs to hear.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/85 md:text-xl">
            A young person may look at a successful owner and see someone completely different
            from themselves. Then they hear the beginning.
          </p>

          <figure className="mt-14 text-center">
            <blockquote className="mx-auto max-w-2xl font-serif tracking-[-0.02em] text-ink">
              <p className="text-2xl leading-tight md:text-3xl">&ldquo;I struggled in school.&rdquo;</p>
              <p className="mt-3 text-xl leading-tight text-ink/85 md:text-2xl">&ldquo;I had already failed.&rdquo;</p>
              <p className="mt-3 text-2xl leading-tight md:text-3xl">&ldquo;We had no money.&rdquo;</p>
              <p className="mt-3 text-xl leading-tight text-ink/85 md:text-2xl">&ldquo;My dad bought me the tools.&rdquo;</p>
              <p className="mt-3 text-2xl leading-tight md:text-3xl">&ldquo;My wife kept believing.&rdquo;</p>
              <p className="mt-3 text-xl leading-tight italic text-ink/85 md:text-2xl">&ldquo;Someone gave me one chance.&rdquo;</p>
            </blockquote>
          </figure>

          <p className="mt-14 max-w-2xl text-lg leading-relaxed text-ink/85 md:text-xl">
            We are not showing young people successful people so they can admire them. We are
            showing them where successful people started so they can recognize themselves.
          </p>

          <div className="mt-10">
            <Link
              to="/mustard-seed"
              className="inline-flex items-center gap-2 border border-ink/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ember hover:text-ember"
            >
              Learn About The Mustard Seed <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* TELL / NOMINATE */}
      <section className="bg-ink-deep px-5 py-24 text-cream md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <div className="section-label mb-4 text-ember">Tell Your Genesis Moment</div>
              <h2 className="font-serif text-3xl leading-[1.02] tracking-[-0.035em] md:text-5xl">
                We are looking for faith-based business owners willing to tell the real story.
              </h2>
              <div className="mt-8 space-y-4 text-lg leading-relaxed text-cream/75">
                <p>Not only what you built.</p>
                <p>Who helped you build the person behind it.</p>
                <p>
                  Who believed in you. What life looked like then. What you were struggling with.
                  What they gave you. And what became possible because they did.
                </p>
              </div>
              <Link
                to="/tell-your-story"
                className="mt-8 inline-flex items-center gap-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
              >
                Tell Your Story <ArrowRight size={14} />
              </Link>
            </div>

            <div>
              <div className="section-label mb-4 text-ember">Nominate Someone</div>
              <h2 className="font-serif text-3xl leading-[1.02] tracking-[-0.035em] md:text-5xl">
                Whose story should be heard?
              </h2>
              <div className="mt-8 space-y-4 text-lg leading-relaxed text-cream/75">
                <p>Your husband. Your father. A friend. A mentor.</p>
                <p>
                  A business owner whose customers know the company — but may have never heard the
                  story behind the person who built it.
                </p>
              </div>
              <Link
                to="/tell-your-story"
                className="mt-8 inline-flex items-center gap-2 border border-cream/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-colors hover:border-ember hover:text-ember"
              >
                Nominate Their Story <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING SCRIPTURE */}
      <section className="bg-cream px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-8 text-ember">
            <SeedMark size={28} />
          </div>
          <p className="font-serif text-2xl italic leading-relaxed text-ink/90 md:text-3xl">
            &ldquo;Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be
            opened unto you.&rdquo;
          </p>
          <div className="mt-4 mono-tag text-ink/55">Matthew 7:7</div>
          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            Sometimes the door opens because somebody on the other side chooses to open it.
            <br />
            Maybe your story becomes their mustard seed.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/podcast"
              className="inline-flex items-center gap-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
            >
              Watch the Stories <ArrowRight size={14} />
            </Link>
            <Link
              to="/tell-your-story"
              className="inline-flex items-center gap-2 border border-ink/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ember hover:text-ember"
            >
              Tell Your Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
