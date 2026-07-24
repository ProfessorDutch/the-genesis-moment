import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
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
      { title: "The Genesis Moment — Stories of faith, belief, and becoming" },
      {
        name: "description",
        content:
          "We all have a Genesis Moment — a moment after which life was never the same. A podcast and short-form series about the people, prayers, and moments that changed the trajectory.",
      },
      { property: "og:title", content: "The Genesis Moment" },
      {
        property: "og:description",
        content:
          "Stories of faith, family, belief, and becoming — and the people who believed before there was proof.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = episodes[0];
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
            <div className="eyebrow mb-6">Stories of faith, family, belief, and becoming</div>
            <h1 className="font-serif font-bold text-ink tracking-[-0.045em] leading-[0.92] text-[clamp(3rem,10vw,6.5rem)]">
              We all have a<br />
              Genesis Moment.
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink/80 md:text-xl">
              A moment after which life was never the same. A child. A marriage. Salvation. An
              opportunity. A person who believed. And most of us have more than one.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/podcast"
                className="inline-flex items-center gap-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
              >
                Listen to the podcast <ArrowRight size={14} />
              </Link>
              <Link
                to="/tell-your-story"
                className="inline-flex items-center gap-2 border border-ink/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ember hover:text-ember"
              >
                Tell your story
              </Link>
            </div>
          </div>
          <div className="mt-14 md:mt-0">
            <div className="portrait-frame relative" style={frameStyle(featured.image)}>
              <div className="absolute bottom-5 left-5 right-5 text-white/85">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-ember">
                  Episode 01 · Now streaming
                </div>
                <div className="mt-2 font-serif text-2xl leading-tight md:text-3xl">
                  {featured.title}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.14em] text-white/70">
                  {featured.guest} · {featured.role}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl border-t border-line/70 px-5 py-6 md:px-8">
          <p className="font-serif text-lg italic leading-relaxed text-ink/85 md:text-xl">
            "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened
            unto you."
            <span className="ml-3 not-italic text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">
              — Matthew 7:7
            </span>
          </p>
        </div>
      </section>

      {/* WHAT IS A GENESIS MOMENT */}
      <section className="bg-[oklch(0.19_0.012_55)] px-5 py-24 text-cream md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="section-label mb-5">01 · What is a Genesis Moment</div>
          <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
            A life that could not have existed without it.
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-cream/75 md:text-xl">
            <p>
              A Genesis Moment creates a before and an after. The birth of a child. The person you
              married. The day you were born again. The opportunity someone gave you when there was
              no reason yet to believe it would work.
            </p>
            <p>A different family. A different career. A different faith. A different life.</p>
          </div>

          <div className="mt-14 border-y border-white/12 py-8">
            <p className="font-serif text-2xl leading-snug text-cream md:text-3xl">
              The person who believed.
              <br />
              The person who invested.
              <br />
              The person who prayed.
              <br />
              The person who opened a door.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED EPISODE */}
      <section className="bg-paper px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="section-label mb-4">02 · Featured episode</div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-0.035em] md:text-5xl">
                The story behind the business.
              </h2>
            </div>
            <Link
              to="/podcast"
              className="hidden shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember hover:underline md:inline-flex"
            >
              All episodes <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-16">
            <Link
              to="/podcast/$slug"
              params={{ slug: featured.slug }}
              className="portrait-frame block"
              style={frameStyle(featured.image)}
            />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-ember">
                Episode {String(featured.number).padStart(2, "0")} · {featured.duration}
              </div>
              <h3 className="mt-4 font-serif text-3xl leading-[1.05] tracking-[-0.03em] md:text-4xl">
                {featured.title}
              </h3>
              <div className="mt-3 text-sm uppercase tracking-[0.12em] text-ink/60">
                {featured.guest} · {featured.role}
              </div>
              <p className="mt-6 text-lg leading-relaxed text-ink/80">{featured.excerpt}</p>
              <Link
                to="/podcast/$slug"
                params={{ slug: featured.slug }}
                className="mt-8 inline-flex items-center gap-2 bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5"
              >
                Listen to episode <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <ul className="mt-16 divide-y divide-line border-y border-line">
            {["Who were you before everything changed?",
              "Who believed in you before there was proof?",
              "What did they risk on your behalf?",
              "What became possible because they did?"].map((q) => (
              <li key={q} className="py-6 font-serif text-2xl leading-snug tracking-[-0.02em] md:text-3xl">
                {q}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HINGE */}
      <section className="bg-ember px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.20em] text-white/80">
            The question beneath every story
          </div>
          <blockquote className="mt-6 font-serif font-bold leading-[0.98] tracking-[-0.04em] text-[clamp(2.75rem,8vw,5.5rem)]">
            Where would you be if they hadn't?
          </blockquote>
        </div>
      </section>

      {/* THOUGHTCASTS */}
      <section className="bg-cream px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="section-label mb-4">03 · Thoughtcasts</div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-0.035em] md:text-5xl">
                Short thoughts worth stopping for.
              </h2>
            </div>
            <Link
              to="/thoughtcasts"
              className="hidden shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember hover:underline md:inline-flex"
            >
              Browse all <ArrowRight size={14} />
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
                  style={{ aspectRatio: "9/12", ...frameStyle(t.image) }}
                />
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ember">
                  {t.topic} · {t.duration}
                </div>
                <div className="mt-3 font-serif text-2xl leading-tight tracking-[-0.02em]">
                  {t.title}
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/70">{t.thesis}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="bg-paper px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="section-label mb-4">04 · Why we tell it</div>
          <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
            Because somebody answered the call for you.
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink/80 md:text-xl">
            <p>
              Before you became the person you are today, someone may have been called to invest in
              the person you could become.
            </p>
            <p>
              The point is not perfection. The point is what can happen when another human being
              sees possibility before there is proof.
            </p>
          </div>

          <div className="mt-12 border-l-[3px] border-ember bg-soft/60 px-6 py-8">
            <p className="font-serif text-2xl leading-snug tracking-[-0.02em] md:text-3xl">
              Somewhere right now, there is a life waiting on a Genesis Moment that has not happened
              yet.
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {[
              { q: "I was living with my mother.", a: "Proof that your beginning does not have to resemble your ending." },
              { q: "My dad bought my first tools.", a: "Proof that one act of belief can redirect an entire life." },
              { q: "My wife believed before I did.", a: "Proof that someone can carry the vision until you are strong enough to carry it yourself." },
            ].map((row) => (
              <div key={row.q} className="bg-paper p-6">
                <div className="font-serif text-xl leading-tight tracking-[-0.02em]">"{row.q}"</div>
                <div className="mt-3 text-sm leading-relaxed text-ink/65">{row.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MUSTARD SEED */}
      <section className="relative bg-mustard px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 h-3 w-3 rounded-full bg-ember shadow-[0_0_0_12px_oklch(0.68_0.19_45_/_0.14)]" />
          <div className="section-label mb-4">05 · The Mustard Seed</div>
          <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
            Someone planted something in you.
          </h2>
          <p className="mt-6 font-serif text-2xl leading-snug tracking-[-0.02em] md:text-3xl">
            Now we want to help plant it in someone else.
          </p>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/80 md:text-xl">
            <p>
              The Genesis Moment is part of a larger network built to create mentorship,
              partnerships, educational pathways, and real opportunity for young people seeking a
              future in the skilled trades.
            </p>
            <p>
              These young people are not charity cases. They are lives full of possibility, waiting
              for someone to see what could exist if they are given a reason to believe.
            </p>
          </div>
          <div className="mt-10">
            <Link
              to="/mustard-seed"
              className="inline-flex items-center gap-2 border border-ink/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ember hover:text-ember"
            >
              Learn about The Mustard Seed <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA / TELL YOUR STORY */}
      <section className="bg-ink px-5 py-24 text-cream md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div>
            <div className="section-label mb-4">06 · Tell your Genesis Moment</div>
            <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
              Maybe your story is the one somebody needs to hear.
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-cream/75 md:text-xl">
              We are looking for faith-based business owners willing to sit down and tell the real
              story — where you started, what almost stopped you, who believed in you, and the
              moment something changed.
            </p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-cream/75">
              This is not a pitch interview. It is a conversation about becoming.
            </p>
          </div>
          <div className="space-y-3">
            <a
              href="tel:+10000000000"
              className="flex items-center justify-between gap-3 bg-ember px-6 py-5 text-white transition-transform hover:-translate-y-0.5"
            >
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                  Call about being a guest
                </div>
                <div className="mt-1 font-serif text-xl">Speak with our assistant</div>
              </div>
              <Phone size={22} />
            </a>
            <Link
              to="/tell-your-story"
              className="flex items-center justify-between gap-3 border border-white/20 px-6 py-5 text-white transition-colors hover:border-ember"
            >
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
                  Send your information
                </div>
                <div className="mt-1 font-serif text-xl">Fill out the guest form</div>
              </div>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/tell-your-story"
              className="flex items-center justify-between gap-3 border border-white/20 px-6 py-5 text-white transition-colors hover:border-ember"
            >
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
                  Know someone whose story should be heard?
                </div>
                <div className="mt-1 font-serif text-xl">Nominate someone</div>
              </div>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
