import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import pewLight from "@/assets/pew-light.jpg";

const GHL_ENDPOINT = "https://emmy-call-flow-fix.lovable.app/api/public/ghl-lead";

const AMOUNTS = [25, 50, 100, 250, 500, 1000] as const;

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Support The Genesis Moment — Help us gather the stories" },
      {
        name: "description",
        content:
          "Your support helps us record, produce, and share the stories of the people who believed — so the next generation can see their own beginning.",
      },
      { property: "og:title", content: "Support The Genesis Moment" },
      {
        property: "og:description",
        content:
          "Help us gather and preserve the stories that let a young person recognize themselves in the beginning.",
      },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: Donate,
});

function Donate() {
  const [frequency, setFrequency] = useState<"monthly" | "once">("monthly");
  const [selected, setSelected] = useState<number | "other">(25);
  const [custom, setCustom] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const amount =
    selected === "other" ? Number(custom.replace(/[^0-9.]/g, "")) || 0 : selected;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const name = form.name.trim();
    const email = form.email.trim();
    if (!name || !email) {
      setError("Please share at least your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!amount || amount < 1) {
      setError("Please choose or enter a giving amount.");
      return;
    }
    setStatus("sending");
    try {
      const [first_name, ...rest] = name.split(" ");
      const last_name = rest.join(" ") || "—";
      const res = await fetch(GHL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          phone: form.phone.trim(),
          business_name: "The Genesis Moment — Donation",
          website: `https://thegenesismoment.com/donate?amount=${amount}&freq=${frequency}`,
          message: form.message.trim(),
          amount,
          frequency,
          gift_type: frequency === "monthly" ? "recurring_monthly" : "one_time",
          source: `genesis-moment-donate-${frequency}`,
        }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Submission failed");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink-deep text-cream">
        <div className="absolute inset-0">
          <img
            src={pewLight}
            alt="Empty wooden church pew lit by warm sunlight through an arched window."
            className="h-full w-full object-cover object-center"
            width={1600}
            height={1200}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.135 0.012 55 / 0.92) 0%, oklch(0.135 0.012 55 / 0.75) 55%, oklch(0.135 0.012 55 / 0.35) 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 pt-24 pb-20 md:px-8 md:pt-32 md:pb-28">
          <div className="mb-5 flex items-center gap-2 text-ember">
            <span className="eyebrow">Support the work</span>
          </div>
          <h1 className="font-serif font-bold leading-[0.95] tracking-[-0.035em] text-[clamp(2.5rem,7vw,4.75rem)]">
            Help someone hear a{" "}
            <span className="italic text-ember">beginning</span> that looks like their own.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/85 md:text-xl">
            Every conversation costs something — travel, studio time, editing, the quiet
            hours it takes to draw a story out honestly. Your gift lets us keep going back
            to the beginning, so the person who needs it most can finally see themselves in it.
          </p>
        </div>
      </section>

      {/* WHERE IT GOES */}
      <section className="bg-sand px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="section-label mb-4">Where your gift goes</div>
          <h2 className="max-w-3xl font-serif text-3xl leading-tight tracking-[-0.03em] md:text-5xl">
            One story, from the workshop to the ear that needed it.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "We find the story.",
                copy: "Nominations, phone calls, an intro conversation that finds the part most people have never heard out loud.",
              },
              {
                title: "We record it honestly.",
                copy: "On location or in studio. Long-form. Time enough for the whole truth to come out — not just the highlight reel.",
              },
              {
                title: "We put it where a kid can find it.",
                copy: "Edited, released, and paired with a Thoughtcast so a young person somewhere can recognize themselves in the beginning.",
              },
            ].map((s) => (
              <div key={s.title} className="border-t-2 border-ember pt-5">
                <h3 className="font-serif text-2xl leading-tight tracking-[-0.02em]">
                  {s.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink/75">{s.copy}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink/65">
            The Genesis Moment is in service of{" "}
            <a
              href="https://www.themustardseed.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ember underline-offset-4 hover:underline"
            >
              The Mustard Seed
            </a>
            . Monthly giving is what actually keeps the microphone on — it's how we plan the next
            conversation before we know whose it will be.
          </p>
        </div>
      </section>

      {/* GIVE */}
      <section id="give" className="bg-paper px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="section-label mb-4">Give</div>
            <h2 className="font-serif text-3xl leading-tight tracking-[-0.03em] md:text-5xl">
              Any amount keeps the microphone on.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              This is a builder-funded, listener-supported project. There is no ad break
              and no sponsor telling us what a story is worth. You give — we go record another one.
            </p>
            <blockquote className="mt-10 border-l-[3px] border-ember pl-6 font-serif italic text-2xl leading-snug tracking-[-0.02em] text-ink/85 md:text-3xl">
              &ldquo;Give, and it shall be given unto you.&rdquo;
              <span className="mt-3 block text-xs not-italic uppercase tracking-[0.18em] text-ink/50">
                Luke 6:38
              </span>
            </blockquote>
          </div>

          {status === "sent" ? (
            <div className="border border-ember bg-cream p-8">
              <div className="mono-tag text-ember">Received</div>
              <h3 className="mt-3 font-serif text-2xl leading-snug tracking-[-0.02em]">
                Thank you, {form.name.split(" ")[0] || "friend"}.
              </h3>
              <p className="mt-3 text-ink/75">
                We&rsquo;ll reach you at {form.email} within one business day with a secure
                giving link for ${amount}. If you&rsquo;d rather give right now, just reply
                to that email and we&rsquo;ll get you set up.
              </p>
              <Link
                to="/mustard-seed"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember hover:gap-3"
              >
                Read what your gift serves <ArrowRight size={12} />
              </Link>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="border border-line bg-cream p-6 md:p-8"
            >
              <div className="mono-tag text-ember">Choose an amount</div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      setSelected(a);
                      setCustom("");
                    }}
                    className={`border px-3 py-3 text-sm font-bold tracking-tight transition-colors ${
                      selected === a
                        ? "border-ember bg-ember text-white"
                        : "border-line text-ink hover:border-ember"
                    }`}
                  >
                    ${a}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelected("other")}
                  className={`shrink-0 border px-3 py-3 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                    selected === "other"
                      ? "border-ember bg-ember text-white"
                      : "border-line text-ink/70 hover:border-ember"
                  }`}
                >
                  Other
                </button>
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/50">
                    $
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Custom amount"
                    value={custom}
                    onFocus={() => setSelected("other")}
                    onChange={(e) => setCustom(e.target.value)}
                    className="w-full border border-line bg-white py-3 pl-7 pr-3 text-base text-ink outline-none focus:border-ember"
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <Field
                  label="Your name"
                  name="name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  required
                  maxLength={100}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  required
                  maxLength={255}
                />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                  maxLength={25}
                />
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-ink/70">
                    A note (optional)
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    maxLength={1000}
                    className="min-h-[100px] w-full resize-y border border-line bg-white px-3 py-3 text-base text-ink outline-none focus:border-ember"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-4 text-xs uppercase tracking-[0.12em] text-ember">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {status === "sending"
                  ? "Sending…"
                  : `Give $${amount || "—"}`}
                {status !== "sending" && <ArrowRight size={14} />}
              </button>
              <p className="mt-3 text-center text-[11px] uppercase tracking-[0.14em] text-ink/50">
                We&rsquo;ll email a secure giving link · No card entered here
              </p>
            </form>
          )}
        </div>
      </section>

      <section className="bg-cream px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-2xl italic leading-snug text-ink/85 md:text-3xl">
            The seed is small. The tree is not.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/mustard-seed"
              className="inline-flex items-center gap-2 border border-ink/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ember hover:text-ember"
            >
              Read The Mustard Seed
            </Link>
            <Link
              to="/tell-your-story"
              className="inline-flex items-center gap-2 bg-ink-deep px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5"
            >
              Tell your story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-ink/70">
        {label}
        {required && <span className="text-ember"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        maxLength={maxLength}
        className="w-full border border-line bg-white px-3 py-3 text-base text-ink outline-none focus:border-ember"
      />
    </label>
  );
}
