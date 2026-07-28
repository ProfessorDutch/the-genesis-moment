import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import stillMic from "@/assets/still-mic.jpg";
import pewLight from "@/assets/pew-light.jpg";

const GHL_ENDPOINT = "https://emmy-call-flow-fix.lovable.app/api/public/ghl-lead";

export const Route = createFileRoute("/tell-your-story")({
  head: () => ({
    meta: [
      { title: "Tell Your Genesis Moment — The Genesis Moment" },
      {
        name: "description",
        content:
          "We are looking for faith-based business owners and others with a Genesis Moment worth telling. Share your story or nominate someone.",
      },
      { property: "og:title", content: "Tell Your Genesis Moment" },
      {
        property: "og:description",
        content: "Maybe your story is the one somebody needs to hear.",
      },
      { property: "og:url", content: "/tell-your-story" },
    ],
    links: [{ rel: "canonical", href: "/tell-your-story" }],
  }),
  component: TellYourStory,
});

function TellYourStory() {
  const [mode, setMode] = useState<"self" | "nominate">("self");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-ink-deep text-cream">
        <div className="absolute inset-0">
          <img
            src={stillMic}
            alt="A vintage silver ribbon microphone lit by warm tungsten light in a small recording room."
            className="h-full w-full object-cover object-center"
            width={1600}
            height={1200}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.135 0.012 55 / 0.92) 0%, oklch(0.135 0.012 55 / 0.72) 55%, oklch(0.135 0.012 55 / 0.25) 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 pt-20 pb-16 md:px-8 md:pt-32 md:pb-24">
          <div className="mb-5 flex items-center gap-2 text-ember">
            <span className="eyebrow">Tell your Genesis Moment</span>
          </div>
          <h1 className="font-serif font-bold leading-[0.94] tracking-[-0.04em] text-[clamp(2.5rem,7vw,4.75rem)]">
            Maybe your story is the one <span className="italic text-ember">somebody</span> needs to hear.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/85 md:text-xl">
            This is not a pitch interview and not a celebration of perfection. It is a
            conversation about becoming — where you started, what almost stopped you, who
            believed in you, and the moment something changed.
          </p>
        </div>
      </section>


      <section className="bg-sand px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mono-tag mb-6 text-ember">What to expect</div>
          <ol className="grid gap-6 md:grid-cols-3">
            <li className="border-t-2 border-ember pt-5">
              <div className="font-serif text-xl leading-snug tracking-[-0.02em]">
                A short intro call.
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Fifteen minutes. No script. We listen for the parts of your story most people
                have not heard.
              </p>
            </li>
            <li className="border-t-2 border-ember pt-5">
              <div className="font-serif text-xl leading-snug tracking-[-0.02em]">
                One honest conversation.
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Recorded at your shop or in studio. Long-form. Ninety minutes on average.
              </p>
            </li>
            <li className="border-t-2 border-ember pt-5">
              <div className="font-serif text-xl leading-snug tracking-[-0.02em]">
                Your Genesis Moment, released.
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                You review before it goes live. Then someone hears it who needed to.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="relative bg-ink-deep">
        <img
          src={pewLight}
          alt="Empty wooden church pew with warm sunlight streaming through a tall arched window."
          loading="lazy"
          width={1600}
          height={1200}
          className="h-[45vh] min-h-[280px] w-full object-cover opacity-90 sm:h-[55vh]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/40 to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-8 md:pb-16">
          <p className="mx-auto max-w-3xl font-serif text-xl leading-snug tracking-[-0.02em] text-cream sm:text-2xl md:text-4xl">
            Someone somewhere is waiting for the sentence you've been carrying quietly.
          </p>
        </figcaption>
      </section>




      <section id="form" className="bg-paper px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 border border-ember/40 bg-cream p-6 md:p-7">
            <div className="section-label mb-2 text-ember">Rather talk than type?</div>
            <div className="font-serif text-2xl leading-snug tracking-[-0.02em]">
              Have Emmy call you and hear your nomination story.
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Emmy is our intake voice. She'll listen, take notes, and pass the story to a founder.
              No pitch. No script. Just talk.
            </p>
            <a
              href="tel:+18443213669"
              className="mt-5 inline-flex items-center gap-2 bg-ink-deep px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-cream hover:-translate-y-0.5 transition-transform"
            >
              Call Emmy · 844-321-3669
            </a>
            <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-ink/50">
              Or fill out the form below
            </p>
          </div>

          <div className="section-label mb-4">Or write to us</div>
          <h2 className="font-serif text-3xl leading-tight tracking-[-0.03em] md:text-4xl">
            Send your information.
          </h2>


          <div className="mt-8 inline-flex border border-line bg-cream">
            {[
              { id: "self" as const, label: "I have a story" },
              { id: "nominate" as const, label: "I want to nominate" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setMode(opt.id)}
                className={`px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] ${
                  mode === opt.id ? "bg-ember text-white" : "text-ink/70"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {submitted ? (
            <div className="mt-10 border border-ember bg-cream p-8">
              <div className="font-serif text-2xl leading-snug tracking-[-0.02em]">
                Thank you. We received it.
              </div>
              <p className="mt-3 text-ink/70">
                A founder will reach out personally. In the meantime, listen to a few episodes and
                Thoughtcasts to get a feel for the conversation.
              </p>
            </div>
          ) : (
            <form
              className="mt-8 grid gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);
                const fd = new FormData(e.currentTarget);
                const name = String(fd.get("name") || "").trim();
                const email = String(fd.get("email") || "").trim();
                if (!name || !email) {
                  setError("Please share your name and email.");
                  return;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  setError("Please enter a valid email.");
                  return;
                }
                setSending(true);
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
                      phone: String(fd.get("phone") || "").trim(),
                      business_name: String(fd.get("business") || "").trim(),
                      website: String(fd.get("website") || "").trim(),
                      message: String(fd.get("story") || "").trim(),
                      nominee: String(fd.get("nominee") || "").trim(),
                      nominee_contact: String(fd.get("nominee_contact") || "").trim(),
                      source: `genesis-moment-${mode}`,
                    }),
                  });
                  if (!res.ok) throw new Error(await res.text());
                  setSubmitted(true);
                } catch (err) {
                  setError(
                    err instanceof Error ? err.message : "Something went wrong.",
                  );
                } finally {
                  setSending(false);
                }
              }}
            >
              <Field label="Your name" name="name" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Business or organization" name="business" />
                <Field
                  label="Website (optional)"
                  name="website"
                  type="text"
                  pattern="^\s*(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?\s*$"
                  title="Enter a website (e.g. example.com, example.co, example.net)"
                />
              </div>
              {mode === "nominate" && (
                <>
                  <Field label="Who are you nominating?" name="nominee" required />
                  <Field label="How can we reach them?" name="nominee_contact" />
                </>
              )}
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-ink/70">
                  {mode === "self"
                    ? "Tell us a little about your Genesis Moment"
                    : "Why should their story be heard?"}
                </label>
                <textarea
                  name="story"
                  required
                  maxLength={2000}
                  className="min-h-[160px] w-full resize-y border border-line bg-cream px-4 py-3 text-base text-ink outline-none focus:border-ember"
                />
              </div>
              {error && (
                <p className="text-xs uppercase tracking-[0.12em] text-ember">{error}</p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="mt-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Share the story"}
              </button>
              <p className="text-xs text-ink/50">
                Only what we need. No newsletter. A real person will follow up.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  pattern,
  title,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  pattern?: string;
  title?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-ink/70">
        {label}
        {required && <span className="text-ember"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        pattern={pattern}
        title={title}
        className="w-full border border-line bg-cream px-4 py-3 text-base text-ink outline-none focus:border-ember"
      />
    </div>
  );
}