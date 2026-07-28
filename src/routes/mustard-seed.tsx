import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import mustardSprout from "@/assets/mustard-sprout.jpg";
import shopWindow from "@/assets/shop-window-light.jpg";
import mainStreet from "@/assets/main-street-dawn.jpg";
import chapelQuiet from "@/assets/chapel-quiet.jpg";

export const Route = createFileRoute("/mustard-seed")({
  head: () => ({
    meta: [
      { title: "The Mustard Seed — Betting on the next kid" },
      {
        name: "description",
        content:
          "A percentage of everything this show generates funds trade education — scholarships and training for the next plumber, electrician, roofer who needs someone to go first for them.",
      },
      { property: "og:title", content: "The Mustard Seed — The Reason" },
      {
        property: "og:description",
        content:
          "Somebody bet on the guest sitting across from us. This is us betting on the next one.",
      },
      { property: "og:url", content: "/mustard-seed" },
    ],
    links: [{ rel: "canonical", href: "/mustard-seed" }],
  }),
  component: MustardSeed,
});

function MustardSeed() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-mustard px-5 pt-14 pb-16 sm:pt-16 sm:pb-20 md:px-8 md:pt-24 md:pb-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <div className="mb-6 h-3 w-3 rounded-full bg-ember shadow-[0_0_0_12px_oklch(0.68_0.19_45_/_0.14)]" />
            <div className="eyebrow mb-4">What we fund</div>
            <h1 className="font-serif font-bold leading-[0.96] tracking-[-0.035em] text-[clamp(2.25rem,8vw,5.75rem)] break-words">
              Everyone says somebody should do something.
            </h1>
            <p className="mt-6 font-serif text-xl leading-snug tracking-[-0.02em] text-ink/85 sm:text-2xl md:mt-8 md:text-4xl">
              We did.
            </p>
            <div className="mt-6 max-w-lg space-y-4 text-base leading-relaxed text-ink/75 md:mt-8 md:text-lg">
              <p>
                Every episode of this show exists because somebody bet on
                somebody else before there was proof it would pay off. That's
                the whole premise — the moment where belief showed up before
                the evidence did.
              </p>
              <p>The Mustard Seed is that same bet, pointed at a kid.</p>
            </div>
          </div>
          <div className="md:col-span-5">
            <figure className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden shadow-[0_30px_60px_-30px_oklch(0.20_0.015_55_/_0.35)]">
                <img
                  src={mustardSprout}
                  alt="A single green mustard sprout in a terracotta pot on a weathered wooden windowsill in morning light."
                  loading="lazy"
                  width={1808}
                  height={1200}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 max-w-xs text-xs italic leading-relaxed text-ink/60">
                Somebody bet on the guest sitting across from you. This is us
                betting on the next one.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* WHAT IT FUNDS */}
      <section className="bg-paper px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <div className="section-label mb-5">Where the money goes</div>
            <p className="font-serif text-2xl leading-[1.1] tracking-[-0.03em] text-ink sm:text-3xl md:text-4xl">
              Trade education for the next plumber, electrician, and roofer
              who needs someone to go first for them.
            </p>
            <figure className="mt-10">
              <img
                src={shopWindow}
                alt="A family-owned workshop in warm afternoon light — stacked lumber, a hanging leather apron, an old radio."
                loading="lazy"
                width={1280}
                height={1600}
                className="aspect-[4/5] w-full object-cover"
              />
            </figure>
          </div>

          <div className="md:col-span-7">
            <div className="space-y-6 text-base leading-relaxed text-ink/85 sm:text-lg md:text-xl">
              <p>
                A percentage of what this show generates funds trade
                education — scholarships and training for kids who need
                someone to bet on them before they've earned it, funded by
                the same industry they're entering.
              </p>
              <p>Not a charity pitch. Not a fundraiser. Just the belief, put into motion.</p>
              <p>
                The Mustard Seed is our sister effort at{" "}
                <a
                  href="https://www.themustardseed.co"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-ember underline decoration-ember/30 underline-offset-4 hover:decoration-ember"
                >
                  themustardseed.co
                </a>
                . This podcast is how we point at it out loud.
              </p>
            </div>

            <ul className="mt-10 space-y-3 border-l-[3px] border-ember pl-5 font-serif text-xl leading-snug tracking-[-0.02em] text-ink sm:pl-6 sm:text-2xl md:space-y-4 md:text-3xl">
              <li>Scholarships for trade school and apprenticeships.</li>
              <li>Tools, boots, and the first week of a first job.</li>
              <li>Introductions to the shop owners you hear on this feed.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* THREE — how the pieces fit */}
      <section className="bg-cream px-5 py-16 sm:py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="section-label mb-5">How the three fit together</div>
          <h2 className="max-w-3xl font-serif text-3xl leading-[1.06] tracking-[-0.035em] sm:text-4xl md:text-5xl md:leading-[1.02]">
            The Mustard Seed is the <em className="not-italic text-ember">why</em>.
            The Genesis Moment is the <em className="not-italic text-ember">how</em>.
            Thoughtcasts are the <em className="not-italic text-ember">healing</em>.
          </h2>
          <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3">
            <div className="border-t-2 border-ember pt-5">
              <div className="mono-tag mb-3 text-ember">The Reason</div>
              <h3 className="font-serif text-2xl leading-tight tracking-[-0.02em]">The Mustard Seed</h3>
              <p className="mt-3 text-base leading-relaxed text-ink/75">
                Fund the next kid into a trade. Scholarships and training
                paid for by the same industry hiring them on the other side.
              </p>
            </div>
            <div className="border-t-2 border-ink/25 pt-5">
              <div className="mono-tag mb-3 text-ink/60">The Story</div>
              <h3 className="font-serif text-2xl leading-tight tracking-[-0.02em]">The Genesis Moment</h3>
              <p className="mt-3 text-base leading-relaxed text-ink/75">
                Long-form conversations with faith-driven owners about the
                exact moment someone bet on them — and what grew from that
                bet.
              </p>
            </div>
            <div className="border-t-2 border-ink/25 pt-5">
              <div className="mono-tag mb-3 text-ink/60">The Healing</div>
              <h3 className="font-serif text-2xl leading-tight tracking-[-0.02em]">Thoughtcasts</h3>
              <p className="mt-3 text-base leading-relaxed text-ink/75">
                Shorter reflections on the wounds owners actually carry —
                pride, fear, burnout, faith drift — and how to heal without
                hiding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WIDE IMAGE — MAIN STREET */}
      <section className="relative">
        <img
          src={mainStreet}
          alt="An empty small-town Main Street at dawn, warm sunrise light between brick storefronts."
          loading="lazy"
          width={1920}
          height={1280}
          className="h-[45vh] min-h-[280px] w-full object-cover sm:h-[55vh]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/70 to-transparent">
          <figcaption className="px-5 pb-8 pt-24 sm:pb-10 md:px-8 md:pb-14">
            <p className="mx-auto max-w-3xl font-serif text-xl leading-snug tracking-[-0.02em] text-cream sm:text-2xl md:text-4xl">
              Every storefront on every main street began as one person
              believing something a little bigger than the evidence.
            </p>
          </figcaption>
        </div>
      </section>

      {/* WHO WE'RE BETTING ON */}
      <section className="bg-paper px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <div className="section-label mb-4">Who we are betting on</div>
            <h2 className="font-serif text-3xl leading-[1.06] tracking-[-0.035em] sm:text-4xl md:text-6xl md:leading-[1.02]">
              The kid who hasn't earned it yet — and needs somebody to go
              first anyway.
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-ink/80 sm:text-lg md:mt-10 md:text-xl">
              <p>
                Every owner on this feed can name the person who bet on
                them before there was proof. A dad. A boss. A pastor. A
                stranger who handed them a set of keys and said figure it out.
              </p>
              <p>
                The Mustard Seed is us doing the same thing on their
                behalf — pointing money and mentorship at the next kid who
                needs it, before they've done anything to deserve it except
                show up.
              </p>
            </div>
          </div>
          <div className="md:col-span-5">
            <img
              src={chapelQuiet}
              alt="A small-town chapel interior at golden hour, sunlight through a tall arched window."
              loading="lazy"
              width={1808}
              height={1200}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-ember px-5 py-20 text-white sm:py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="font-serif text-2xl leading-[1.1] tracking-[-0.035em] sm:text-3xl md:text-5xl md:leading-[1.05]">
            Somebody bet on the guest sitting across from us. This is us
            betting on the next one.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-12">
            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ember"
            >
              Fund the next kid <ArrowRight size={14} />
            </Link>
            <a
              href="https://www.themustardseed.co"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/50 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-white/10"
            >
              Visit themustardseed.co
            </a>
            <Link
              to="/podcast"
              className="inline-flex items-center justify-center gap-2 border border-white/50 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-white/10"
            >
              Hear the stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
