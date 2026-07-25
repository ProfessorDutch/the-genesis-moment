import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SeedMark } from "@/components/seed-mark";
import heroBelief from "@/assets/hero-belief.jpg";
import seedHand from "@/assets/seed-hand.jpg";
import pillarReason from "@/assets/pillar-reason.jpg";
import msMentor from "@/assets/ms-mentor-hands.jpg";
import tcPrayer from "@/assets/tc-prayer.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Genesis Moment — Who believed in you first?" },
      {
        name: "description",
        content:
          "A gathering of faith-based business owners telling the story of who they were before anyone knew — so the next generation can see themselves in the beginning.",
      },
      { property: "og:title", content: "The Genesis Moment — Who believed in you first?" },
      {
        property: "og:description",
        content:
          "The Mustard Seed is the reason. The Genesis Moment is how it happened. Thoughtcasts are how we heal.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* HERO — mission-first, full-bleed editorial photo */}
      <section className="relative isolate overflow-hidden bg-ink-deep text-cream">
        <div className="absolute inset-0">
          <img
            src={heroBelief}
            alt="An older craftsman rests his hand on the shoulder of a younger man in a workshop, lit by warm window light."
            className="h-full w-full object-cover object-center ken-burns"
            width={1600}
            height={1200}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.135 0.012 55 / 0.92) 0%, oklch(0.135 0.012 55 / 0.78) 45%, oklch(0.135 0.012 55 / 0.35) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 88% 12%, oklch(0.68 0.19 45 / 0.28), transparent 55%)",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-16 px-5 pt-24 pb-28 md:grid-cols-[1.25fr_1fr] md:gap-20 md:px-8 md:pt-36 md:pb-40">
          <div className="rise-in">
            <div className="mb-6 flex items-center gap-2 text-ember">
              <SeedMark size={16} />
              <span className="eyebrow">A mission being built — one story at a time</span>
            </div>
            <h1 className="font-serif font-bold tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,7vw,4.75rem)]">
              Who saw<br />
              something in<br />
              <span className="italic text-ember">you</span> first?
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-cream/80 md:text-xl">
              Faith-based business owners telling the story of who they were before anyone knew —
              so a kid somewhere can finally see himself in the beginning of it.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/mustard-seed"
                className="group inline-flex items-center gap-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_-10px_oklch(0.68_0.19_45/0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_oklch(0.68_0.19_45/0.8)]"
              >
                Start with the reason
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/tell-your-story"
                className="inline-flex items-center gap-2 border border-cream/30 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-ember hover:text-ember"
              >
                Tell Your Story
              </Link>
            </div>
          </div>

          <aside className="fade-in-slow mt-4 md:mt-2">
            <div className="border-l-[3px] border-ember bg-ink-deep/50 px-6 py-8 backdrop-blur-sm md:px-8 md:py-10">
              <div className="mono-tag text-ember">Voices we are gathering</div>
              <div className="mt-5 space-y-6 font-serif tracking-[-0.02em] text-cream">
                <blockquote className="text-2xl leading-snug md:text-[1.75rem]">
                  &ldquo;My wife believed in me before I believed in myself.&rdquo;
                </blockquote>
                <hr className="rule-ember" />
                <blockquote className="text-2xl leading-snug md:text-[1.75rem]">
                  &ldquo;My dad bought me my first toolbox.&rdquo;
                </blockquote>
                <hr className="rule-ember" />
                <blockquote className="text-2xl leading-snug md:text-[1.75rem]">
                  &ldquo;One phone call. One yes. A whole different life.&rdquo;
                </blockquote>
              </div>
              <div className="mt-6 text-[11px] uppercase tracking-[0.16em] text-cream/55">
                Sentences carried quietly for years — soon spoken out loud.
              </div>
            </div>
          </aside>
        </div>
      </section>


      {/* THE MUSTARD SEED — the reason (moved forward, given weight) */}
      <section className="relative bg-mustard px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-2 text-ember">
            <SeedMark size={18} />
            <span className="section-label">The Mustard Seed · The Reason</span>
          </div>
          <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
            This did not begin as a podcast.
          </h2>
          <p className="mt-8 font-serif italic text-2xl leading-snug text-ink/85 md:text-3xl">
            It began with a kid who needed to hear a beginning that looked like his own.
          </p>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/85 md:text-xl">
            <p className="drop-cap">
              The Mustard Seed is why we are doing any of this. A young person looks at a
              successful owner and sees someone completely different from themselves. Then they
              hear the beginning — and something in them shifts.
            </p>
            <p>
              Everything else on this site exists to serve that one moment.
            </p>
          </div>
          <div className="mt-10">
            <Link
              to="/mustard-seed"
              className="inline-flex items-center gap-2 bg-ink-deep px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5"
            >
              Read The Mustard Seed <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* THREE PILLARS — the architecture of the mission */}
      <section className="bg-paper px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="section-label mb-4">How the whole thing fits together</div>
          <h2 className="max-w-3xl font-serif text-3xl leading-tight tracking-[-0.035em] md:text-5xl">
            Three parts. One purpose.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <article className="flex flex-col border border-line bg-cream p-8">
              <div className="mono-tag text-ember">01 · The Reason</div>
              <h3 className="mt-4 font-serif text-2xl leading-tight tracking-[-0.02em] md:text-3xl">
                The Mustard Seed
              </h3>
              <p className="mt-4 flex-1 text-base leading-relaxed text-ink/75">
                Why any of this matters. Business owners share their stories so kids have someone
                to both relate to and look up to.
              </p>
              <Link
                to="/mustard-seed"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember hover:underline"
              >
                Read the mission <ArrowRight size={12} />
              </Link>
            </article>

            <article className="flex flex-col border border-line bg-cream p-8">
              <div className="mono-tag text-ember">02 · The How</div>
              <h3 className="mt-4 font-serif text-2xl leading-tight tracking-[-0.02em] md:text-3xl">
                The Genesis Moment
              </h3>
              <p className="mt-4 flex-1 text-base leading-relaxed text-ink/75">
                How it happened for them. Long-form conversations about the seasons before anyone
                knew — and the person who believed first.
              </p>
              <Link
                to="/podcast"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember hover:underline"
              >
                See what&rsquo;s coming <ArrowRight size={12} />
              </Link>
            </article>

            <article className="flex flex-col border border-line bg-cream p-8">
              <div className="mono-tag text-ember">03 · The Healing</div>
              <h3 className="mt-4 font-serif text-2xl leading-tight tracking-[-0.02em] md:text-3xl">
                Thoughtcasts
              </h3>
              <p className="mt-4 flex-1 text-base leading-relaxed text-ink/75">
                How to heal the wounds underneath. Short spoken pieces on faith, identity,
                failure, forgiveness — the work between the stories.
              </p>
              <Link
                to="/thoughtcasts"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember hover:underline"
              >
                Listen to a Thoughtcast <ArrowRight size={12} />
              </Link>
            </article>
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

      {/* BUILDING THE FIRST SEASON — honest, no fake episodes */}
      <section className="bg-sand px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="section-label mb-4">Building the first season</div>
          <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
            We are gathering the storytellers now.
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink/85 md:text-xl">
            <p className="drop-cap">
              Before the first episode goes out, we are sitting down with the owners, fathers,
              mentors, and builders whose beginnings deserve to be spoken out loud. If that is
              you — or someone you love — this is the moment to say so.
            </p>
            <p>
              No polished pitch required. Just the person, the story, and a willingness to be
              honest about the part before the success.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/tell-your-story"
              className="inline-flex items-center gap-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
            >
              Tell Your Story <ArrowRight size={14} />
            </Link>
            <Link
              to="/tell-your-story"
              className="inline-flex items-center gap-2 border border-ink/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ember hover:text-ember"
            >
              Nominate Someone <ArrowRight size={14} />
            </Link>
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
              to="/mustard-seed"
              className="inline-flex items-center gap-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
            >
              Read The Mustard Seed <ArrowRight size={14} />
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
