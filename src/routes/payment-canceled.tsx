import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/payment-canceled")({
  head: () => ({
    meta: [
      { title: "Payment canceled — The Genesis Moment" },
      {
        name: "description",
        content:
          "Your donation was not completed. You can try again or contact us if you need help.",
      },
    ],
    links: [{ rel: "canonical", href: "/payment-canceled" }],
  }),
  component: PaymentCanceled,
});

function PaymentCanceled() {
  return (
    <div className="min-h-screen bg-paper px-5 py-24 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl leading-[0.95] tracking-[-0.03em] md:text-5xl">
          No charge was made.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/80">
          If something went wrong, you can try again. If you would rather give
          over the phone, Emmy is happy to walk you through it.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft size={14} />
            Try again
          </Link>
          <a
            href="tel:+18443213669"
            className="inline-flex items-center gap-2 border border-ink/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ember hover:text-ember"
          >
            Call Emmy · 844-321-3669
          </a>
        </div>
      </div>
    </div>
  );
}
