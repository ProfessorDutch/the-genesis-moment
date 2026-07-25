import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";


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

  return (
    <div>
      <section className="bg-cream px-5 pt-16 pb-14 md:px-8 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex items-center gap-2 text-ember">
            <span className="eyebrow">Tell your Genesis Moment</span>
          </div>
          <h1 className="font-serif font-bold leading-[0.94] tracking-[-0.04em] text-[clamp(2.5rem,7vw,4.75rem)]">
            Maybe your story is the one somebody needs to hear.
          </h1>
          <p className="drop-cap mt-8 max-w-2xl text-lg leading-relaxed text-ink/80 md:text-xl">
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
            <li>
              <div className="ep-num text-4xl text-ember">01</div>
              <div className="mt-2 font-serif text-xl leading-snug tracking-[-0.02em]">
                A short intro call.
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Fifteen minutes. No script. We listen for the parts of your story most people
                have not heard.
              </p>
            </li>
            <li>
              <div className="ep-num text-4xl text-ember">02</div>
              <div className="mt-2 font-serif text-xl leading-snug tracking-[-0.02em]">
                One honest conversation.
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Recorded at your shop or in studio. Long-form. Ninety minutes on average.
              </p>
            </li>
            <li>
              <div className="ep-num text-4xl text-ember">03</div>
              <div className="mt-2 font-serif text-xl leading-snug tracking-[-0.02em]">
                Your Genesis Moment, released.
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                You review before it goes live. Then someone hears it who needed to.
              </p>
            </li>
          </ol>
        </div>
      </section>


      <section id="form" className="bg-paper px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-2xl">
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
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <Field label="Your name" name="name" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Business or organization" name="business" />
                <Field label="Website (optional)" name="website" type="url" />
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
                  className="min-h-[160px] w-full resize-y border border-line bg-cream px-4 py-3 text-base text-ink outline-none focus:border-ember"
                />
              </div>
              <button
                type="submit"
                className="mt-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
              >
                Share the story
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
        className="w-full border border-line bg-cream px-4 py-3 text-base text-ink outline-none focus:border-ember"
      />
    </div>
  );
}