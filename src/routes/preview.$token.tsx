import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { fetchPreview } from "@/lib/entries";
import {
  canonicalUrl,
  effectiveStatus,
  schemaType,
  titleTag,
  TYPE_LABEL,
} from "@/lib/publishing";

export const Route = createFileRoute("/preview/$token")({
  loader: async ({ params }) => {
    const entry = await fetchPreview(params.token);
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Preview — ${loaderData.title}` : "Preview" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PreviewPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="font-serif text-3xl">Preview link not found</h1>
    </div>
  ),
});

function PreviewPage() {
  const entry = Route.useLoaderData();
  const url = canonicalUrl(entry.type, entry.slug);
  const runtime = entry.audio_duration || entry.duration || "";

  return (
    <div className="bg-cream">
      <div className="bg-ink-deep px-5 py-3 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-cream">
        Private preview · {TYPE_LABEL[entry.type]} · {effectiveStatus(entry)} · not indexed
      </div>

      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-ember">
            {[entry.tags?.[0], runtime].filter(Boolean).join(" · ")}
          </div>
          <h1 className="mt-4 font-serif font-bold leading-[0.98] tracking-[-0.035em] text-[clamp(2.25rem,6vw,4.25rem)]">
            {entry.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">{entry.short_description}</p>
          {(entry.body ?? "").split("\n\n").filter(Boolean).map((p, i) => (
            <p key={i} className="mt-5 text-lg leading-relaxed text-ink/80">
              {p}
            </p>
          ))}

          <dl className="mt-12 grid gap-3 border-t border-line pt-6 text-sm text-ink/70">
            <Meta label="Route on publication" value={url} />
            <Meta label="Canonical" value={url} />
            <Meta label="Title tag" value={titleTag(entry)} />
            <Meta label="Meta description" value={entry.short_description ?? "—"} />
            <Meta label="Schema type" value={schemaType(entry)} />
          </dl>

          <Link to="/admin" className="mono-tag mt-8 inline-block text-ink/50 hover:text-ember">
            ← Back to admin
          </Link>
        </div>
      </section>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 md:grid-cols-[190px_1fr]">
      <dt className="mono-tag text-ink/50">{label}</dt>
      <dd className="break-all">{value}</dd>
    </div>
  );
}
