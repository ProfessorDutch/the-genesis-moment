import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/payment-success")({
  head: () => ({
    meta: [
      { title: "Thank you — The Genesis Moment" },
      {
        name: "description",
        content:
          "Your gift helps us gather and share the stories that let the next generation see their own beginning.",
      },
    ],
    links: [{ rel: "canonical", href: "/payment-success" }],
  }),
  component: PaymentSuccess,
});

function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-paper px-5 py-24 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center bg-ember text-white">
          <Check size={32} strokeWidth={2.5} />
        </div>
        <h1 className="mt-8 font-serif text-4xl leading-[0.95] tracking-[-0.03em] md:text-5xl">
          Thank you.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/80">
          Your gift has been received and it is already doing its work — keeping
          the microphone on, the conversation honest, and the door open for the
          next person who needs to hear a beginning that looks like their own.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink/60">
          A receipt is on its way to your email.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/podcast"
            className="inline-flex items-center gap-2 bg-ink-deep px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream transition-transform hover:-translate-y-0.5"
          >
            Listen to episodes
          </Link>
          <Link
            to="/mustard-seed"
            className="inline-flex items-center gap-2 border border-ink/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ember hover:text-ember"
          >
            Read about The Mustard Seed
          </Link>
        </div>
      </div>
    </div>
  );
}
