import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { episodes, thoughtcasts } from "@/lib/content";

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
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 12%, oklch(0.68 0.19 45 / 0.16), transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 md:grid md:grid-cols-[1.15fr_1fr] md:gap-16 md:px-8 md:pt-28 md:pb-32">
          <div>
            <div className="eyebrow mb-6">Stories of faith-based business owners</div>
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
          <div className="mt-14 md:mt-0">
            <div className="portrait-frame relative" style={frameStyle(featured.image)}>
              <div className="absolute bottom-5 left-5 right-5 text-white/85">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-ember">
                  Featured Genesis Moment
                </div>
                <div className="mt-2 font-serif text-2xl leading-tight md:text-3xl">
                  “My wife believed in me before I believed in myself.”
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.14em] text-white/70">
                  [Guest Name] · [Business / City]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED GENESIS MOMENT */}
      <section className="bg-paper px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="section-label mb-4">Featured Genesis Moment</div>
          <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-16">
            <Link
              to="/podcast/$slug"
              params={{ slug: featured.slug }}
              className="portrait-frame block"
              style={frameStyle(featured.image)}
            />
            <div>
              <blockquote className="font-serif text-3xl leading-[1.05] tracking-[-0.03em] md:text-4xl">
                “My wife believed in me before I believed in myself.”
              </blockquote>
              <div className="mt-4 text-sm uppercase tracking-[0.12em] text-ink/60">
                [Guest Name] · [Business / City]
              </div>
              <p className="mt-6 text-lg leading-relaxed text-ink/80">
                Before the company became successful, there was uncertainty, sacrifice, and someone
                willing to keep believing. This is the story behind what came next.
              </p>
              <Link
                to="/podcast/$slug"
                params={{ slug: featured.slug }}
                className="mt-8 inline-flex items-center gap-2 bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5"
              >
                <Play size={14} /> Watch Episode
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THE PEOPLE BEHIND THE STORY */}
      <section className="bg-[oklch(0.19_0.012_55)] px-5 py-24 text-cream md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="section-label mb-5 text-ember">The People Behind the Story</div>
          <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
            Most people can tell you what they built.
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-cream/75 md:text-xl">
            <p>
              We want to know who helped them become the person who could build it.
            </p>
          </div>

          <div className="mt-14 border-y border-white/12 py-8">
            <p className="font-serif text-2xl leading-snug text-cream md:text-3xl">
              The father who bought the tools.
              <br />
              The wife who carried the bills.
              <br />
              The friend who gave the first opportunity.
              <br />
              The mentor who made the introduction.
              <br />
              The person who prayed.
              <br />
              The person who stayed.
              <br />
              The person who saw something worth believing in.
            </p>
          </div>

          <div className="mt-10">
            <p className="font-serif text-2xl leading-snug text-cream md:text-3xl">
              Where would you be if they hadn’t?
            </p>
          </div>
        </div>
      </section>

      {/* MORE GENESIS MOMENTS */}
      <section className="bg-cream px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="section-label mb-4">More Genesis Moments</div>
          <h2 className="font-serif text-3xl leading-tight tracking-[-0.035em] md:text-5xl">
            The story behind the person.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                quote: "My dad bought me my first toolbox.",
                guest: "[Guest Name]",
                role: "[Business / City]",
                story:
                  "A story about finding direction when he had very little confidence in where his life was going.",
                episode: moreEpisodes[0],
              },
              {
                quote: "Someone gave me a chance I had not earned yet.",
                guest: "[Guest Name]",
                role: "[Business / City]",
                story:
                  "One opportunity changed how he saw himself—and eventually changed everything that followed.",
                episode: moreEpisodes[1],
              },
              {
                quote: "I was living with my mother when I started.",
                guest: "[Guest Name]",
                role: "[Business / City]",
                story:
                  "The business people see today started in a season he rarely talks about.",
                episode: moreEpisodes[2],
              },
            ].map((item) =>
              item.episode ? (
                <Link
                  key={item.quote}
                  to="/podcast/$slug"
                  params={{ slug: item.episode.slug }}
                  className="group flex flex-col border border-line bg-paper p-6 transition-colors hover:border-ember"
                >
                  <div
                    className="portrait-frame mb-6"
                    style={{ aspectRatio: "4/5", ...frameStyle(item.episode.image) }}
                  />
                  <blockquote className="font-serif text-2xl leading-tight tracking-[-0.02em]">
                    “{item.quote.replace(/^“|”$/g, "")}”
                  </blockquote>
                  <div className="mt-3 text-xs uppercase tracking-[0.12em] text-ink/60">
                    {item.guest} · {item.role}
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/70">
                    {item.story}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember">
                    Watch <ArrowRight size={12} />
                  </div>
                </Link>
              ) : (
                <div
                  key={item.quote}
                  className="flex flex-col border border-line bg-paper p-6"
                >
                  <div
                    className="portrait-frame mb-6"
                    style={{ aspectRatio: "4/5" }}
                  />
                  <blockquote className="font-serif text-2xl leading-tight tracking-[-0.02em]">
                    “{item.quote.replace(/^“|”$/g, "")}”
                  </blockquote>
                  <div className="mt-3 text-xs uppercase tracking-[0.12em] text-ink/60">
                    {item.guest} · {item.role}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.story}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* THE STORY BEFORE THE SUCCESS */}
      <section className="bg-paper px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="section-label mb-4">The Story Before the Success</div>
          <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
            Success is easy to see.
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink/80 md:text-xl">
            <p>The beginning usually is not.</p>
            <p>
              The Genesis Moment goes back to the seasons when people felt unsure, behind,
              embarrassed, rejected, or simply unable to imagine what their life might eventually
              become.
            </p>
            <p>Those are often the parts of the story people need most.</p>
            <p>
              Because the successful business owner may feel impossible to relate to. The person they
              used to be usually does not.
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
                Short spoken pieces about faith, identity, failure, relationships, grief, belief, and
                the things that shape who we become.
              </p>
            </div>
            <Link
              to="/thoughtcasts"
              className="hidden shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember hover:underline md:inline-flex"
            >
              Watch All Thoughtcasts <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "[Thoughtcast Title]",
                quote: "When you measure good decisions by good outcomes, your compass is a ruler.",
                thoughtcast: featuredThoughts[0],
              },
              {
                title: "[Thoughtcast Title]",
                quote: "A starving man can’t think of anything but bread.",
                thoughtcast: featuredThoughts[1],
              },
              {
                title: "[Thoughtcast Title]",
                quote:
                  "Most people spend years trying to become the person they believe they are supposed to be.",
                thoughtcast: featuredThoughts[2],
              },
            ].map((item) =>
              item.thoughtcast ? (
                <Link
                  key={item.quote}
                  to="/thoughtcasts/$slug"
                  params={{ slug: item.thoughtcast.slug }}
                  className="group flex flex-col border border-line bg-paper p-6 transition-colors hover:border-ember"
                >
                  <div
                    className="portrait-frame mb-6"
                    style={{ aspectRatio: "16/10", ...frameStyle(item.thoughtcast.image) }}
                  />
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ember">
                    {item.thoughtcast.topic} · {item.thoughtcast.duration}
                  </div>
                  <div className="mt-3 font-serif text-2xl leading-tight tracking-[-0.02em]">
                    {item.title}
                  </div>
                  <blockquote className="mt-3 text-sm leading-relaxed text-ink/70">
                    “{item.quote}”
                  </blockquote>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember">
                    Watch <ArrowRight size={12} />
                  </div>
                </Link>
              ) : (
                <div key={item.quote} className="flex flex-col border border-line bg-paper p-6">
                  <div className="portrait-frame mb-6" style={{ aspectRatio: "16/10" }} />
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ember">
                    Thoughtcast
                  </div>
                  <div className="mt-3 font-serif text-2xl leading-tight tracking-[-0.02em]">
                    {item.title}
                  </div>
                  <blockquote className="mt-3 text-sm leading-relaxed text-ink/70">
                    “{item.quote}”
                  </blockquote>
                </div>
              )
            )}
          </div>

          <div className="mt-12 md:hidden">
            <Link
              to="/thoughtcasts"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember hover:underline"
            >
              Watch All Thoughtcasts <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* THE MUSTARD SEED */}
      <section className="relative bg-mustard px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 h-3 w-3 rounded-full bg-ember shadow-[0_0_0_12px_oklch(0.68_0.19_45_/_0.14)]" />
          <div className="section-label mb-4">The Mustard Seed</div>
          <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
            Your beginning may be the part a kid needs to hear.
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/80 md:text-xl">
            <p>
              A young person may look at a successful owner and see someone completely different from
              themselves.
            </p>
            <p>Then they hear the beginning.</p>
          </div>

          <div className="mt-12 border-l-[3px] border-ember bg-soft/60 px-6 py-8">
            <p className="font-serif text-2xl leading-snug tracking-[-0.02em] md:text-3xl">
              “I struggled in school.”
              <br />
              “I had already failed.”
              <br />
              “We had no money.”
              <br />
              “My dad bought me the tools.”
              <br />
              “My wife kept believing.”
              <br />
              “Someone gave me one chance.”
            </p>
          </div>

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/80 md:text-xl">
            <p>Now the distance is smaller.</p>
            <p>
              We are not showing young people successful people so they can admire them. We are
              showing them where successful people started so they can recognize themselves.
            </p>
            <p>
              The Mustard Seed exists to turn those stories into belief, mentorship, exposure,
              education, and pathways into the skilled trades.
            </p>
          </div>

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

      {/* SOMEONE PLANTED SOMETHING IN YOU */}
      <section className="bg-paper px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
            Someone planted something in you.
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/80 md:text-xl">
            <p>Maybe it was money.</p>
            <p>Maybe it was a room.</p>
            <p>A prayer. A job. An introduction. A toolbox. A second chance.</p>
            <p>
              Or maybe it was simply another person refusing to let you believe that where you were
              was all you could ever become.
            </p>
            <p>Whatever it was, something grew from it.</p>
            <p className="font-semibold">That is the story we want to preserve.</p>
          </div>
        </div>
      </section>

      {/* TELL / NOMINATE */}
      <section className="bg-[oklch(0.19_0.012_55)] px-5 py-24 text-cream md:px-8 md:py-32">
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
                  Who believed in you. What life looked like then. What you were struggling with. What
                  they gave you. And what became possible because they did.
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
                  A business owner whose customers know the company—but may have never heard the story
                  behind the person who built it.
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

      {/* CLOSING SCRIPTURE + CTA */}
      <section className="bg-cream px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-serif text-2xl italic leading-relaxed text-ink/85 md:text-3xl">
            “Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened
            unto you.”
            <span className="ml-3 not-italic text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">
              — Matthew 7:7
            </span>
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Sometimes the door opens because somebody on the other side chooses to open it.
          </p>
          <p className="mt-3 text-lg leading-relaxed text-ink/70">
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
          <div className="mt-16 font-serif text-xl text-ink/60">TheGenesisMoment.com</div>
        </div>
      </section>
    </div>
  );
}
