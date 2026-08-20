import { createFileRoute, useNavigate, useParams, useSearch, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGuard } from "@/lib/admin-guard";
import { extractYouTubeId } from "@/lib/youtube";
import {
  AUTHOR_DEFAULTS,
  bylineText,
  canonicalUrl,
  canPublish,
  routePath,
  schemaType,
  slugifyTitle,
  STATUSES,
  titleTag,
  TYPE_LABEL,
  validateEntry,
  type ContentType,
  type EntryStatus,
} from "@/lib/publishing";
import { toast } from "sonner";

type Search = { type?: ContentType };

export const Route = createFileRoute("/_authenticated/admin/episodes/$id")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    type: s.type === "thoughtcast" ? "thoughtcast" : s.type === "podcast" ? "podcast" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Edit entry — Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EntryEditor,
});

type Form = {
  type: ContentType;
  status: EntryStatus;
  slug: string;
  title: string;
  short_description: string;
  body: string;
  author_name: string;
  author_id: string;
  guest_name_override: string;
  guest_description: string;
  role_override: string;
  published_at: string;
  scheduled_at: string;
  audio_url: string;
  audio_duration: string;
  social_image: string;
  transcript: string;
  featured: boolean;
  duration: string;
  youtube_url: string;
  image_url: string;
  tags: string;
  episode_number: string;
};

const empty = (t: ContentType): Form => ({
  type: t,
  status: "draft",
  slug: "",
  title: "",
  short_description: "",
  body: "",
  author_name: AUTHOR_DEFAULTS.name,
  author_id: AUTHOR_DEFAULTS.id,
  guest_name_override: "",
  guest_description: "",
  role_override: "",
  published_at: "",
  scheduled_at: "",
  audio_url: "",
  audio_duration: "",
  social_image: "",
  transcript: "",
  featured: false,
  duration: "",
  youtube_url: "",
  image_url: "",
  tags: "",
  episode_number: "",
});

const toLocal = (iso: string | null) => (iso ? new Date(iso).toISOString().slice(0, 16) : "");
const toIso = (local: string) => (local ? new Date(local).toISOString() : null);

function EntryEditor() {
  const guard = useAdminGuard();
  const { id } = useParams({ from: "/_authenticated/admin/episodes/$id" });
  const { type: typeParam } = useSearch({ from: "/_authenticated/admin/episodes/$id" });
  const navigate = useNavigate();
  const isNew = id === "new";
  const [form, setForm] = useState<Form>(empty(typeParam ?? "podcast"));
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [everPublished, setEverPublished] = useState(false);
  const [previewToken, setPreviewToken] = useState<string | null>(null);
  const [slugTaken, setSlugTaken] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [typeChosen, setTypeChosen] = useState(!isNew || Boolean(typeParam));

  useEffect(() => {
    if (!guard.isAdmin || isNew) return;
    (async () => {
      const { data, error } = await supabase.from("episodes").select("*").eq("id", id).single();
      if (error) {
        toast.error(error.message);
        return;
      }
      const d = data as any;
      setForm({
        type: d.type,
        status: d.status,
        slug: d.slug,
        title: d.title,
        short_description: d.short_description ?? d.excerpt ?? "",
        body: d.body ?? d.description ?? "",
        author_name: d.author_name ?? AUTHOR_DEFAULTS.name,
        author_id: d.author_id ?? AUTHOR_DEFAULTS.id,
        guest_name_override: d.guest_name_override ?? "",
        guest_description: d.guest_description ?? "",
        role_override: d.role_override ?? "",
        published_at: toLocal(d.published_at),
        scheduled_at: toLocal(d.scheduled_at),
        audio_url: d.audio_url ?? "",
        audio_duration: d.audio_duration ?? "",
        social_image: d.social_image ?? "",
        transcript: d.transcript ?? "",
        featured: Boolean(d.featured),
        duration: d.duration ?? "",
        youtube_url: d.youtube_url ?? "",
        image_url: d.image_url ?? "",
        tags: (d.tags ?? []).join(", "),
        episode_number: d.episode_number != null ? String(d.episode_number) : "",
      });
      setOriginalSlug(d.slug);
      setEverPublished(Boolean(d.published_at) && d.status !== "draft");
      setPreviewToken(d.preview_token ?? null);
      setLoading(false);
    })();
  }, [id, isNew, guard.isAdmin]);

  // Duplicate-slug check within the same content type.
  useEffect(() => {
    if (!guard.isAdmin || !form.slug) return setSlugTaken(false);
    let cancelled = false;
    const t = setTimeout(async () => {
      const { data } = await supabase
        .from("episodes")
        .select("id")
        .eq("type", form.type)
        .eq("slug", form.slug);
      if (!cancelled) setSlugTaken((data ?? []).some((r) => r.id !== id));
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [form.slug, form.type, id, guard.isAdmin]);

  function set<K extends keyof Form>(k: K, v: Form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  const entryLike = useMemo(
    () => ({
      ...form,
      tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
      published_at: toIso(form.published_at),
      scheduled_at: toIso(form.scheduled_at),
      youtube_id: extractYouTubeId(form.youtube_url) ?? "",
    }),
    [form],
  );
  const validation = validateEntry(entryLike as any, { slugTaken });
  const publishable = canPublish(validation);

  async function persist(nextStatus: EntryStatus) {
    if (!form.title.trim()) return toast.error("A title is required.");
    const slug = (form.slug || slugifyTitle(form.title)).trim();
    if (!slug) return toast.error("A slug is required.");
    if (slugTaken) return toast.error("That slug is already used in this content type.");

    const slugChanged = Boolean(originalSlug && originalSlug !== slug);
    if (slugChanged && everPublished) {
      const ok = confirm(
        `This entry has been published at /${routePath(form.type, originalSlug!).slice(1)}.\n\n` +
          `Changing the slug creates a permanent redirect from the old URL to the new one. Continue?`,
      );
      if (!ok) return;
    }

    setSaving(true);
    try {
      const publishedIso =
        toIso(form.published_at) ??
        (nextStatus === "published" ? new Date().toISOString() : null);
      const payload: Record<string, unknown> = {
        type: form.type,
        status: nextStatus,
        slug,
        title: form.title.trim(),
        short_description: form.short_description.trim() || null,
        excerpt: form.short_description.trim() || null,
        body: form.body.trim() || null,
        description: form.body.trim() || null,
        author_name: form.author_name.trim() || AUTHOR_DEFAULTS.name,
        author_id: form.author_id.trim() || AUTHOR_DEFAULTS.id,
        guest_name_override:
          form.type === "podcast" ? form.guest_name_override.trim() || null : null,
        guest_description:
          form.type === "podcast" ? form.guest_description.trim() || null : null,
        role_override: form.type === "podcast" ? form.role_override.trim() || null : null,
        published_at: publishedIso,
        scheduled_at: toIso(form.scheduled_at),
        audio_url: form.audio_url.trim() || null,
        audio_duration: form.audio_duration.trim() || null,
        social_image: form.social_image.trim() || null,
        transcript: form.transcript.trim() || null,
        featured: form.featured,
        duration: form.duration.trim() || null,
        youtube_url: form.youtube_url.trim() || null,
        youtube_id: extractYouTubeId(form.youtube_url),
        image_url: form.image_url.trim() || null,
        tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
        episode_number: form.episode_number ? Number(form.episode_number) : null,
      };

      if (isNew) {
        const { data, error } = await supabase
          .from("episodes")
          .insert(payload as never)
          .select("id")
          .single();
        if (error) throw error;
        toast.success("Created");
        navigate({ to: "/admin/episodes/$id", params: { id: data.id } });
      } else {
        const { error } = await supabase.from("episodes").update(payload as never).eq("id", id);
        if (error) throw error;
        if (slugChanged && everPublished) {
          await supabase
            .from("content_redirects")
            .upsert(
              { type: form.type, from_slug: originalSlug!, to_slug: slug } as never,
              { onConflict: "type,from_slug" },
            );
          // Repoint any redirect that pointed at the old slug.
          await supabase
            .from("content_redirects")
            .update({ to_slug: slug } as never)
            .eq("type", form.type)
            .eq("to_slug", originalSlug!);
        }
        setOriginalSlug(slug);
        setForm((f) => ({ ...f, status: nextStatus, slug }));
        if (nextStatus === "published") setEverPublished(true);
        toast.success(`Saved as ${nextStatus}`);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (guard.loading || loading) return <div className="p-16 text-center text-ink/60">Loading…</div>;
  if (!guard.isAdmin) return <div className="p-16 text-center">Not authorized.</div>;

  if (isNew && !typeChosen) {
    return (
      <section className="bg-cream px-5 py-16 md:px-8">
        <div className="mx-auto max-w-2xl">
          <Link to="/admin" className="mono-tag text-ink/50 hover:text-ember">← Back to admin</Link>
          <h1 className="mt-4 font-serif text-3xl md:text-4xl">What are you creating?</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {(["podcast", "thoughtcast"] as ContentType[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setForm(empty(t));
                  setTypeChosen(true);
                }}
                className="border border-line bg-paper p-8 text-left hover:border-ember"
              >
                <div className="font-serif text-2xl">{TYPE_LABEL[t]}</div>
                <div className="mono-tag mt-3 text-ink/50">
                  {routePath(t, "{slug}")}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const slugSuggestion = slugifyTitle(form.title);
  const canonical = form.slug ? canonicalUrl(form.type, form.slug) : "—";

  return (
    <section className="bg-cream px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-3xl">
        <Link to="/admin" className="mono-tag text-ink/50 hover:text-ember">← Back to admin</Link>
        <h1 className="mt-4 font-serif text-3xl md:text-4xl">
          {isNew ? `New ${TYPE_LABEL[form.type]}` : `Edit ${TYPE_LABEL[form.type]}`}
        </h1>
        <div className="mono-tag mt-2 text-ink/50">Status: {form.status}</div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-5">
          <Row label="Content type">
            <select
              value={form.type}
              onChange={(e) => set("type", e.target.value as ContentType)}
              className="input"
            >
              <option value="podcast">Podcast Episode</option>
              <option value="thoughtcast">Thoughtcast</option>
            </select>
          </Row>

          <Row label="Editorial title">
            <input
              className="input"
              value={form.title}
              onChange={(e) => {
                const v = e.target.value;
                setForm((f) => ({
                  ...f,
                  title: v,
                  slug: !everPublished && (f.slug === "" || f.slug === slugifyTitle(f.title))
                    ? slugifyTitle(v)
                    : f.slug,
                }));
              }}
            />
            <div className="mt-2 font-serif text-2xl leading-tight text-ink/80">
              {form.title || "Untitled"}
            </div>
          </Row>

          <Row
            label="Slug"
            hint={
              everPublished
                ? "Already published — changing this creates a permanent redirect."
                : `Suggested: ${slugSuggestion || "—"}`
            }
          >
            <div className="flex gap-2">
              <input
                className="input"
                value={form.slug}
                onChange={(e) => set("slug", slugifyTitle(e.target.value))}
              />
              <button
                type="button"
                onClick={() => set("slug", slugSuggestion)}
                className="whitespace-nowrap border border-ink/30 px-3 text-[10px] font-bold uppercase tracking-[0.14em] hover:border-ember hover:text-ember"
              >
                Use suggestion
              </button>
            </div>
            {slugTaken && (
              <div className="mt-1 text-xs text-red-700">
                Another {TYPE_LABEL[form.type]} already uses this slug.
              </div>
            )}
          </Row>

          <Row label="Short description" hint="Used as the meta description and collection blurb.">
            <textarea
              className="input min-h-24"
              value={form.short_description}
              onChange={(e) => set("short_description", e.target.value)}
            />
          </Row>

          <Row label="Body" hint="Blank line between paragraphs.">
            <textarea
              className="input min-h-48"
              value={form.body}
              onChange={(e) => set("body", e.target.value)}
            />
          </Row>

          <div className="grid gap-4 md:grid-cols-2">
            <Row label="Author name">
              <input
                className="input"
                value={form.author_name}
                onChange={(e) => set("author_name", e.target.value)}
              />
            </Row>
            <Row label="Author ID">
              <input
                className="input"
                value={form.author_id}
                onChange={(e) => set("author_id", e.target.value)}
              />
            </Row>
          </div>

          {form.type === "podcast" && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <Row label="Guest name">
                  <input
                    className="input"
                    value={form.guest_name_override}
                    onChange={(e) => set("guest_name_override", e.target.value)}
                  />
                </Row>
                <Row label="Guest role">
                  <input
                    className="input"
                    value={form.role_override}
                    onChange={(e) => set("role_override", e.target.value)}
                  />
                </Row>
              </div>
              <Row label="Guest description">
                <textarea
                  className="input min-h-24"
                  value={form.guest_description}
                  onChange={(e) => set("guest_description", e.target.value)}
                />
              </Row>
            </>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Row label="Publication date">
              <input
                type="datetime-local"
                className="input"
                value={form.published_at}
                onChange={(e) => set("published_at", e.target.value)}
              />
            </Row>
            <Row label="Scheduled release" hint="Optional. Goes live automatically at this time.">
              <input
                type="datetime-local"
                className="input"
                value={form.scheduled_at}
                onChange={(e) => set("scheduled_at", e.target.value)}
              />
            </Row>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Row label="Audio URL">
              <input
                className="input"
                value={form.audio_url}
                onChange={(e) => set("audio_url", e.target.value)}
              />
            </Row>
            <Row label="Audio duration" hint="Only enter a real, measured runtime.">
              <input
                className="input"
                value={form.audio_duration}
                onChange={(e) => set("audio_duration", e.target.value)}
                placeholder="52 min"
              />
            </Row>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Row label="YouTube URL">
              <input
                className="input"
                value={form.youtube_url}
                onChange={(e) => set("youtube_url", e.target.value)}
              />
            </Row>
            <Row label="Social image URL">
              <input
                className="input"
                value={form.social_image}
                onChange={(e) => set("social_image", e.target.value)}
              />
            </Row>
          </div>

          <Row label="Transcript">
            <textarea
              className="input min-h-32"
              value={form.transcript}
              onChange={(e) => set("transcript", e.target.value)}
            />
          </Row>

          <div className="grid gap-4 md:grid-cols-3">
            <Row label="Episode #">
              <input
                className="input"
                type="number"
                value={form.episode_number}
                onChange={(e) => set("episode_number", e.target.value)}
              />
            </Row>
            <Row label="Tags" hint="Comma-separated. First tag is the topic.">
              <input
                className="input"
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
              />
            </Row>
            <Row label="Featured">
              <label className="flex items-center gap-2 pt-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                />
                Pin to top of collection
              </label>
            </Row>
          </div>

          {/* PUBLICATION PREVIEW */}
          <div className="border border-line bg-paper p-6">
            <div className="mono-tag mb-4 text-ink/60">What publishing will produce</div>
            <dl className="grid gap-2 text-sm">
              <Meta label="Route" value={form.slug ? routePath(form.type, form.slug) : "—"} />
              <Meta label="Canonical" value={canonical} />
              <Meta label="Title tag" value={titleTag(form)} />
              <Meta label="Meta description" value={form.short_description || "—"} />
              <Meta label="Byline" value={bylineText(form)} />
              <Meta label="Schema type" value={schemaType(form)} />
              <Meta label="Collection" value={form.type === "podcast" ? "/podcast" : "/thoughtcasts"} />
            </dl>
            {previewToken && (
              <Link
                to="/preview/$token"
                params={{ token: previewToken }}
                target="_blank"
                className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-ember"
              >
                Open private preview →
              </Link>
            )}
          </div>

          {/* VALIDATION */}
          <div className="border border-line bg-paper p-6">
            <div className="mono-tag mb-3 text-ink/60">Pre-publication checks</div>
            {validation.blocking.length === 0 ? (
              <div className="text-sm text-ink/80">All required fields are complete.</div>
            ) : (
              <ul className="space-y-1 text-sm text-red-700">
                {validation.blocking.map((m) => (
                  <li key={m}>• {m}</li>
                ))}
              </ul>
            )}
            {validation.warnings.length > 0 && (
              <ul className="mt-3 space-y-1 text-sm text-ink/60">
                {validation.warnings.map((m) => (
                  <li key={m}>· {m}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              disabled={saving}
              onClick={() => persist("draft")}
              className="border border-ink/30 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] disabled:opacity-50"
            >
              Save draft
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => persist("preview")}
              className="border border-ink/30 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] disabled:opacity-50"
            >
              Save as preview
            </button>
            <button
              type="button"
              disabled={saving || !publishable || !form.scheduled_at}
              onClick={() => persist("scheduled")}
              title={!form.scheduled_at ? "Set a scheduled release time first." : undefined}
              className="border border-ink/30 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] disabled:opacity-40"
            >
              Schedule
            </button>
            <button
              type="button"
              disabled={saving || !publishable}
              onClick={() => persist("published")}
              className="bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white disabled:opacity-40"
            >
              Publish
            </button>
            {!isNew && (
              <button
                type="button"
                disabled={saving}
                onClick={() => persist("archived")}
                className="border border-ink/30 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] disabled:opacity-50"
              >
                Archive
              </button>
            )}
          </div>
          {!publishable && (
            <p className="text-xs text-ink/55">
              Publishing and scheduling stay disabled until every required field above is complete.
            </p>
          )}
          <p className="mono-tag text-ink/40">
            Statuses: {STATUSES.join(" · ")}
          </p>
        </form>
      </div>
      <style>{`.input{width:100%;border:1px solid var(--color-line, #d8d3ca);background:var(--color-paper, #f6f2ea);padding:0.75rem 1rem;color:var(--color-ink, #191512);}`}</style>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 md:grid-cols-[170px_1fr]">
      <dt className="mono-tag text-ink/50">{label}</dt>
      <dd className="break-all text-ink/80">{value}</dd>
    </div>
  );
}

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mono-tag mb-1 text-ink/60">{label}</div>
      {children}
      {hint && <div className="mt-1 text-xs text-ink/45">{hint}</div>}
    </label>
  );
}
