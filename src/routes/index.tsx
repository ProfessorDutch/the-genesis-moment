import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroBelief from "@/assets/hero-belief.jpg";
import heroCraftsman from "@/assets/hero-craftsman.jpg";
import tcMentor from "@/assets/tc-mentor.jpg";
import msDoorway from "@/assets/ms-doorway.jpg";
import stillBible from "@/assets/still-bible.jpg";
import {
  abs,
  CREATOR_ID,
  CREATOR_URL,
  GENESIS_TERM_ID,
  GENESIS_TERM_URL,
  jsonLd,
  personNode,
  PODCAST_SERIES_ID,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/site";





const HOME_DESCRIPTION =
  "The Genesis Moment is a conversation series created by Jason \u201CDutch\u201D Brown, recording who people were before anyone knew and who believed in them before proof existed.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Genesis Moment\u2122 — Who Believed in You First?" },
      { name: "description", content: HOME_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "The Genesis Moment\u2122 — Who Believed in You First?" },
      { property: "og:description", content: HOME_DESCRIPTION },
      { property: "og:url", content: abs("/") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "The Genesis Moment\u2122 — Who Believed in You First?" },
      { name: "twitter:description", content: HOME_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: abs("/") }],
    scripts: jsonLd([
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: abs("/"),
        name: "The Genesis Moment",
        alternateName: "The Genesis Moment\u2122",
        description: HOME_DESCRIPTION,
        inLanguage: "en-US",
        creator: { "@id": CREATOR_ID },
        about: { "@id": GENESIS_TERM_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#page`,
        url: abs("/"),
        name: "The Genesis Moment\u2122 — Who Believed in You First?",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": GENESIS_TERM_ID },
        inLanguage: "en-US",
      },
      {
        "@type": "PodcastSeries",
        "@id": PODCAST_SERIES_ID,
        url: abs("/podcast"),
        name: "The Genesis Moment",
        description:
          "Long-form conversations with faith-based business owners about who they were before the success was visible and who believed in them first.",
        creator: { "@id": CREATOR_ID },
        isPartOf: { "@id": WEBSITE_ID },
      },
      personNode,
      {
        "@type": "DefinedTerm",
        "@id": GENESIS_TERM_ID,
        name: "The Genesis Moment",
        url: GENESIS_TERM_URL,
      },
    ]),
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
              <span className="eyebrow">The story before the success</span>
            </div>
            <h1 className="font-serif font-bold tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,7vw,4.75rem)]">
              Who saw something<br />
              in <span className="italic text-ember">you</span> before<br />
              you could see it<br />
              in yourself?
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-cream/80 md:text-xl">
              Before the confidence. Before the company. Before your life looked like proof.
              There was a person, a moment, or a small act of faith that changed what you
              believed was possible.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/tell-your-story"
                className="group inline-flex items-center gap-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_-10px_oklch(0.68_0.19_45/0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_oklch(0.68_0.19_45/0.8)]"
              >
                Tell your story
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/mustard-seed"
                className="inline-flex items-center gap-2 border border-cream/30 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-ember hover:text-ember"
              >
                Start with the reason
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

      {/* THE DEFINITION — definition of record */}
      <section className="bg-cream px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <div className="section-label mb-4 text-ember">The definition</div>
            <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-5xl">
              Belief before proof.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-ink/85 md:text-xl">
            <p>
              The Genesis Moment&trade; is the name Jason &ldquo;Dutch&rdquo; Brown gave to the
              moment someone believes in who another person can become before there is enough
              proof to justify that belief. It may arrive as an opportunity, an introduction, an
              investment, a prayer, or a single yes. The outcome belongs to the person who
              eventually becomes visible; the Genesis Moment belongs to the person who saw them
              before anyone knew.
            </p>
            <p>
              The Genesis Moment&trade; is also the conversation series created by Jason
              &ldquo;Dutch&rdquo; Brown to record those stories&mdash;who people were before the
              outcome was visible, who believed in them first, and what that belief made possible.
            </p>
            <p className="text-base text-ink/65">
              The term, its definition, and its use within this body of work originate with{" "}
              <a
                href={CREATOR_URL}
                className="underline decoration-ink/25 underline-offset-4 hover:text-ember"
              >
                Jason &ldquo;Dutch&rdquo; Brown
              </a>
              .
            </p>
            <div className="border-l-[3px] border-ember pl-5">
              <p className="text-base text-ink/70">The canonical definition lives with its creator.</p>
              <a
                href={GENESIS_TERM_URL}
                className="mt-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember"
              >
                Read the definition of record &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>




      {/* THE MUSTARD SEED — the reason (with imagery) */}
      <section className="relative overflow-hidden bg-mustard">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.68 0.19 45 / 0.55), transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-24 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-20 md:px-8 md:py-32">
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-[0_30px_60px_-20px_oklch(0.135_0.012_55/0.45)]">
              <img
                src={stillBible}
                alt="An open Bible and a ceramic mug on a rough wooden workbench, lit by morning window light."
                loading="lazy"
                width={1280}
                height={1600}
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-ink/60">
              <span className="h-px w-8 bg-ember" />
              The smallest of all seeds
            </figcaption>
          </figure>
          <div>
            <div className="mb-6 flex items-center gap-2 text-ember">
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
              <p>Everything else on this site exists to serve that one moment.</p>
            </div>
            <div className="mt-10">
              <Link
                to="/mustard-seed"
                className="group inline-flex items-center gap-2 bg-ink-deep px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember"
              >
                Read The Mustard Seed
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
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
            {[
              {
                num: "The Reason",
                title: "The Mustard Seed",
                copy: "Why any of this matters. Business owners share their stories so kids have someone to both relate to and look up to.",
                cta: "Read the mission",
                to: "/mustard-seed" as const,
                img: heroCraftsman,
                alt: "A carpenter pauses at his workbench beside a window of warm afternoon light.",
              },
              {
                num: "The How",
                title: "The Genesis Moment",
                copy: "How it happened for them. Long-form conversations about the seasons before anyone knew — and the person who believed first.",
                cta: "See what's coming",
                to: "/podcast" as const,
                img: tcMentor,
                alt: "A veteran contractor and a young apprentice on a jobsite at golden hour.",
              },
              {
                num: "The Healing",
                title: "Thoughtcasts",
                copy: "How to heal the wounds underneath. Short spoken pieces on faith, identity, failure, forgiveness — the work between the stories.",
                cta: "Listen to a Thoughtcast",
                to: "/thoughtcasts" as const,
                img: msDoorway,
                alt: "A young apprentice standing quietly in a doorway of warm lamplight.",
              },
            ].map((p) => (
              <article
                key={p.title}
                className="group flex flex-col border border-line bg-cream transition-all duration-300 hover:-translate-y-1 hover:border-ember hover:shadow-[0_20px_40px_-20px_oklch(0.68_0.19_45/0.35)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-deep">
                  <img
                    src={p.img}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-deep/50 to-transparent"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="mono-tag text-ember">{p.num}</div>
                  <h3 className="mt-4 font-serif text-2xl leading-tight tracking-[-0.02em] md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-ink/75">{p.copy}</p>
                  <Link
                    to={p.to}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember transition-all duration-300 hover:gap-3"
                  >
                    {p.cta} <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* THE PEOPLE BEHIND THE STORY — dark editorial band */}
      <section className="bg-ink-deep px-5 py-24 text-cream md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex items-center gap-2 text-ember">
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

      {/* BELIEF TAKES A FORM */}
      <section className="bg-ink-deep px-5 py-24 text-cream md:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="section-label mb-4 text-ember">Belief is not an idea</div>
          <h2 className="max-w-3xl font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
            It takes a form. Usually a person.
          </h2>
          <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {[
              { k: "A father", v: "who handed over the first tool without a lecture." },
              { k: "A wife", v: "who carried the bills the year nothing came in." },
              { k: "A mentor", v: "who made a phone call that opened a door." },
              { k: "A friend", v: "who kept saying your name in rooms you weren’t in." },
            ].map((b) => (
              <div key={b.k} className="border-t border-cream/15 pt-6">
                <div className="mono-tag text-ember">{b.k}</div>
                <p className="mt-3 font-serif text-2xl leading-snug tracking-[-0.02em] md:text-3xl">
                  {b.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING SCRIPTURE */}
      <section className="bg-cream px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
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
              to="/tell-your-story"
              className="inline-flex items-center gap-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
            >
              Tell your story <ArrowRight size={14} />
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-ink-deep px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5"
            >
              Support the work <ArrowRight size={14} />
            </Link>
            <Link
              to="/mustard-seed"
              className="inline-flex items-center gap-2 border border-ink/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ember hover:text-ember"
            >
              Read The Mustard Seed
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
