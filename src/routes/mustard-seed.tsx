import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import mustardSprout from "@/assets/mustard-sprout.jpg";
import shopWindow from "@/assets/shop-window-light.jpg";
import mainStreet from "@/assets/main-street-dawn.jpg";
import chapelQuiet from "@/assets/chapel-quiet.jpg";
import stillBible from "@/assets/still-bible.jpg";

export const Route = createFileRoute("/mustard-seed")({
  head: () => ({
    meta: [
      { title: "The Mustard Seed — The Genesis Moment" },
      {
        name: "description",
        content:
          "The Mustard Seed is the reason this podcast exists — business owners telling the truth about how they started, so a kid somewhere can see a version of themselves in it.",
      },
      { property: "og:title", content: "The Mustard Seed — The Reason" },
      {
        property: "og:description",
        content:
          "The Genesis Moment is how it happened. Thoughtcasts are how we heal. The Mustard Seed is why.",
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
            <div className="eyebrow mb-4">The Mustard Seed · The Reason</div>
            <h1 className="font-serif font-bold leading-[0.96] tracking-[-0.035em] text-[clamp(2.25rem,8vw,5.75rem)] break-words">
              Every big life started as a small seed nobody noticed.
            </h1>
            <p className="mt-6 font-serif text-xl leading-snug tracking-[-0.02em] text-ink/85 sm:text-2xl md:mt-8 md:text-4xl">
              We put a microphone in front of the person that seed grew into,
              so a kid can hear what it sounded like at the beginning.
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/70 md:mt-8 md:text-lg">
              The Mustard Seed is the reason this podcast exists. Business owners
              telling the truth about how they started — the doubt, the debt,
              the first job, the one person who took a chance — so a kid
              somewhere can hear a life that sounds like theirs and know it
              can end somewhere better.
            </p>
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
                "The kingdom of heaven is like a mustard seed — the smallest of
                all seeds, yet it grows into the largest of garden plants."
                <span className="mt-1 block not-italic text-[10px] font-bold uppercase tracking-[0.16em] text-ember">
                  Matthew 13:31–32
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* THE THREE — how the pieces fit */}
      <section className="bg-paper px-5 py-16 sm:py-20 md:px-8 md:py-24">
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
                A kid needs to see that the people they look up to were once
                exactly where they are — unsure, un-credentialed, and quietly
                hoping someone would notice.
              </p>
            </div>
            <div className="border-t-2 border-ink/25 pt-5">
              <div className="mono-tag mb-3 text-ink/60">The Story</div>
              <h3 className="font-serif text-2xl leading-tight tracking-[-0.02em]">The Genesis Moment</h3>
              <p className="mt-3 text-base leading-relaxed text-ink/75">
                Long-form conversations with faith-driven business owners about
                the exact moment their life began to turn — the person, the
                sentence, the shift that made the rest of it possible.
              </p>
            </div>
            <div className="border-t-2 border-ink/25 pt-5">
              <div className="mono-tag mb-3 text-ink/60">The Healing</div>
              <h3 className="font-serif text-2xl leading-tight tracking-[-0.02em]">Thoughtcasts</h3>
              <p className="mt-3 text-base leading-relaxed text-ink/75">
                Shorter reflections on the wounds business owners actually
                carry — pride, fear, burnout, faith drift — and the practices
                that help them heal without hiding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE'RE ACTUALLY DOING */}
      <section className="bg-cream px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <div className="section-label mb-5">What we are actually doing</div>
            <p className="font-serif text-2xl leading-[1.1] tracking-[-0.03em] text-ink sm:text-3xl md:text-4xl">
              We put grown men and women on a microphone and ask them to
              remember out loud.
            </p>
            <figure className="mt-10">
              <img
                src={shopWindow}
                alt="A family-owned woodworking shop in warm afternoon light — stacked lumber, a hanging leather apron, an old radio."
                loading="lazy"
                width={1280}
                height={1600}
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="mt-3 text-xs italic leading-relaxed text-ink/60">
                Every workshop was once a scary idea in somebody's head.
              </figcaption>
            </figure>
          </div>

          <div className="md:col-span-7">
            <div className="space-y-6 text-base leading-relaxed text-ink/85 sm:text-lg md:text-xl">
              <p>
                A child sees a successful contractor and assumes that person
                was always confident, always capable, always destined for it.
                Then the contractor sits down across from us and says the
                sentences he has spent his whole life quietly carrying.
              </p>
              <p>
                Those sentences are the point. That is the seed.
              </p>
            </div>

            <ul className="mt-8 space-y-3 border-l-[3px] border-ember pl-5 font-serif text-xl leading-snug tracking-[-0.02em] text-ink sm:pl-6 sm:text-2xl md:mt-10 md:space-y-4 md:text-3xl">
              <li>"I was living with my mom."</li>
              <li>"I screwed up school."</li>
              <li>"We had no money."</li>
              <li>"My dad bought me my first toolbox."</li>
              <li>"My wife believed in me before I did."</li>
              <li>"Someone gave me one chance."</li>
            </ul>

            <p className="mt-8 text-base leading-relaxed text-ink/85 sm:text-lg md:mt-10 md:text-xl">
              A kid hearing those sentences is not being pitied. They are being
              handed a map. The person on the other end of the microphone
              already walked the road, and they are describing it in the
              light so it stops feeling like a dark hallway.
            </p>
          </div>
        </div>
      </section>

      {/* WIDE IMAGE — MAIN STREET (light band) */}
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

      {/* WHO IT'S FOR */}
      <section className="bg-paper px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <div className="section-label mb-4">Who it is for</div>
            <h2 className="font-serif text-3xl leading-[1.06] tracking-[-0.035em] sm:text-4xl md:text-6xl md:leading-[1.02]">
              For the kid who has already decided their story doesn't get to
              be interesting.
            </h2>
            <div className="mt-8 space-y-5 max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg md:mt-10 md:text-xl">
              <p>
                The seventeen-year-old working a shift he doesn't like, at a
                job he doesn't want, for a version of the future he can't
                quite see yet. The one who thinks the successful people on the
                other side of the wall were born there.
              </p>
              <p>
                We are not asking him to admire anyone. We are asking him to
                listen to a stranger describe the beginning of a life that
                sounds a lot like his — and to notice that the beginning was
                not the ending.
              </p>
            </div>
          </div>
          <div className="md:col-span-5">
            <img
              src={stillBible}
              alt="An open Bible and a ceramic mug on a rough wooden workbench in morning window light."
              loading="lazy"
              width={1280}
              height={1600}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* HOW YOU HELP */}
      <section className="bg-cream px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="section-label mb-4">How a seed gets planted</div>
          <h2 className="max-w-3xl font-serif text-3xl leading-[1.06] tracking-[-0.035em] sm:text-4xl md:text-5xl md:leading-[1.02]">
            Three quiet, ordinary things that turn into a life.
          </h2>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 md:mt-14 md:grid-cols-3 md:gap-8">
            <article className="group">
              <div className="mb-6 overflow-hidden">
                <img
                  src={shopWindow}
                  alt="Interior of a small workshop lit by warm afternoon window light."
                  loading="lazy"
                  width={1280}
                  height={1600}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="eyebrow mb-3">Tell a story</div>
              <h3 className="font-serif text-xl leading-tight tracking-[-0.02em] sm:text-2xl md:text-3xl">
                Sit with us for one honest hour.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink/75">
                Your beginning — told without polish — becomes the map a
                stranger's kid didn't know he was allowed to follow.
              </p>
              <Link
                to="/tell-your-story"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ember"
              >
                Tell your story <ArrowRight size={14} />
              </Link>
            </article>

            <article className="group">
              <div className="mb-6 overflow-hidden">
                <img
                  src={mainStreet}
                  alt="An empty small-town Main Street at dawn."
                  loading="lazy"
                  width={1920}
                  height={1280}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="eyebrow mb-3">Open a door</div>
              <h3 className="font-serif text-xl leading-tight tracking-[-0.02em] sm:text-2xl md:text-3xl">
                Offer one shift to one young person.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink/75">
                One shop. One kid. One day a week. That is the whole
                curriculum — and we help make the introduction.
              </p>
              <Link
                to="/tell-your-story"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ember"
              >
                Offer a seat <ArrowRight size={14} />
              </Link>
            </article>

            <article className="group sm:col-span-2 md:col-span-1">
              <div className="mb-6 overflow-hidden">
                <img
                  src={chapelQuiet}
                  alt="A small-town chapel interior at golden hour, sunlight through a tall arched window."
                  loading="lazy"
                  width={1808}
                  height={1200}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:aspect-[16/7] md:aspect-[4/3]"
                />
              </div>
              <div className="eyebrow mb-3">Stand behind it</div>
              <h3 className="font-serif text-xl leading-tight tracking-[-0.02em] sm:text-2xl md:text-3xl">
                Support the microphone and the bridge behind it.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink/75">
                Trade schools, unions, family shops, churches — every gift
                helps us record more stories and connect more kids to the
                people telling them.
              </p>
              <Link
                to="/donate"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ember"
              >
                Support the work <ArrowRight size={14} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-ember px-5 py-20 text-white sm:py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="font-serif text-2xl leading-[1.1] tracking-[-0.035em] sm:text-3xl md:text-5xl md:leading-[1.05]">
            Someone told you the truth about how they started, and it
            changed the shape of your life. Now sit down and tell it back.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-12">
            <Link
              to="/tell-your-story"
              className="inline-flex items-center justify-center gap-2 bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ember"
            >
              Tell your story <ArrowRight size={14} />
            </Link>
            <Link
              to="/podcast"
              className="inline-flex items-center justify-center gap-2 border border-white/50 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-white/10"
            >
              Hear the stories
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 border border-white/50 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-white/10"
            >
              Support the work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
