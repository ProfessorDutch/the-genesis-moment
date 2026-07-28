import { createFileRoute, useNavigate, useParams, useSearch, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGuard } from "@/lib/admin-guard";
import { extractYouTubeId, slugify } from "@/lib/youtube";
import { toast } from "sonner";

type Search = { type?: "podcast" | "thoughtcast" };

export const Route = createFileRoute("/_authenticated/admin/episodes/$id")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    type: s.type === "thoughtcast" ? "thoughtcast" : s.type === "podcast" ? "podcast" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Edit episode — Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EpisodeEditor,
});

type Form = {
  type: "podcast" | "thoughtcast";
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  guest_id: string | null;
  guest_name_override: string;
  role_override: string;
  duration: string;
  youtube_url: string;
  instagram_url: string;
  image_url: string;
  tags: string;
  status: "draft" | "published";
  episode_number: string;
};

const empty = (t: "podcast" | "thoughtcast"): Form => ({
  type: t,
  slug: "",
  title: "",
  excerpt: "",
  description: "",
  guest_id: null,
  guest_name_override: "",
  role_override: "",
  duration: "",
  youtube_url: "",
  instagram_url: "",
  image_url: "",
  tags: "",
  status: "draft",
  episode_number: "",
});

function EpisodeEditor() {
  const guard = useAdminGuard();
  const { id } = useParams({ from: "/_authenticated/admin/episodes/$id" });
  const { type: typeParam } = useSearch({ from: "/_authenticated/admin/episodes/$id" });
  const navigate = useNavigate();
  const isNew = id === "new";
  const [form, setForm] = useState<Form>(empty(typeParam ?? "podcast"));
  const [guests, setGuests] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!guard.isAdmin) return;
    supabase
      .from("guests")
      .select("id,name")
      .order("name")
      .then(({ data }) => setGuests(data ?? []));
    if (isNew) return;
    (async () => {
      const { data, error } = await supabase.from("episodes").select("*").eq("id", id).single();
      if (error) {
        toast.error(error.message);
        return;
      }
      setForm({
        type: data.type,
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt ?? "",
        description: data.description ?? "",
        guest_id: data.guest_id,
        guest_name_override: data.guest_name_override ?? "",
        role_override: data.role_override ?? "",
        duration: data.duration ?? "",
        youtube_url: data.youtube_url ?? "",
        instagram_url: data.instagram_url ?? "",
        image_url: data.image_url ?? "",
        tags: (data.tags ?? []).join(", "),
        status: data.status,
        episode_number: data.episode_number != null ? String(data.episode_number) : "",
      });
      setLoading(false);
    })();
  }, [id, isNew, guard.isAdmin]);

  function set<K extends keyof Form>(k: K, v: Form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        type: form.type,
        slug: (form.slug || slugify(form.title)).trim(),
        title: form.title.trim(),
        excerpt: form.excerpt.trim() || null,
        description: form.description.trim() || null,
        guest_id: form.guest_id,
        guest_name_override: form.guest_name_override.trim() || null,
        role_override: form.role_override.trim() || null,
        duration: form.duration.trim() || null,
        youtube_url: form.youtube_url.trim() || null,
        youtube_id: extractYouTubeId(form.youtube_url),
        instagram_url: form.instagram_url.trim() || null,
        image_url: form.image_url.trim() || null,
        tags: form.tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        status: form.status,
        episode_number: form.episode_number ? Number(form.episode_number) : null,
        published_at:
          form.status === "published" ? new Date().toISOString() : null,
      };
      if (!payload.title || !payload.slug) throw new Error("Title and slug required");

      if (isNew) {
        const { data, error } = await supabase
          .from("episodes")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        toast.success("Created");
        navigate({ to: "/admin/episodes/$id", params: { id: data.id } });
      } else {
        const { error } = await supabase.from("episodes").update(payload).eq("id", id);
        if (error) throw error;
        toast.success("Saved");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (guard.loading || loading) return <div className="p-16 text-center text-ink/60">Loading…</div>;
  if (!guard.isAdmin) return <div className="p-16 text-center">Not authorized.</div>;

  const ytId = extractYouTubeId(form.youtube_url);

  return (
    <section className="bg-cream px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-3xl">
        <Link to="/admin" className="mono-tag text-ink/50 hover:text-ember">
          ← Back to admin
        </Link>
        <h1 className="mt-4 font-serif text-3xl md:text-4xl">
          {isNew ? `New ${form.type}` : `Edit ${form.type}`}
        </h1>

        <form onSubmit={save} className="mt-8 space-y-5">
          <Row label="Type">
            <select
              value={form.type}
              onChange={(e) => set("type", e.target.value as Form["type"])}
              className="input"
            >
              <option value="podcast">Podcast</option>
              <option value="thoughtcast">Thoughtcast</option>
            </select>
          </Row>
          <Row label="Title">
            <input
              className="input"
              required
              value={form.title}
              onChange={(e) => {
                set("title", e.target.value);
                if (isNew && !form.slug) set("slug", slugify(e.target.value));
              }}
            />
          </Row>
          <Row label="Slug" hint="URL segment: /podcast/your-slug">
            <input
              className="input"
              required
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
            />
          </Row>
          <Row label="Guest" hint="Pick from your guests list or leave blank and use the override.">
            <select
              value={form.guest_id ?? ""}
              onChange={(e) => set("guest_id", e.target.value || null)}
              className="input"
            >
              <option value="">— No guest —</option>
              {guests.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </Row>
          <div className="grid gap-4 md:grid-cols-2">
            <Row label="Guest name override">
              <input
                className="input"
                value={form.guest_name_override}
                onChange={(e) => set("guest_name_override", e.target.value)}
              />
            </Row>
            <Row label="Role override">
              <input
                className="input"
                value={form.role_override}
                onChange={(e) => set("role_override", e.target.value)}
              />
            </Row>
          </div>
          <Row label="Excerpt" hint="One-sentence hook shown in listings.">
            <textarea
              className="input min-h-24"
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
            />
          </Row>
          <Row label="Description" hint="Long-form description / show notes.">
            <textarea
              className="input min-h-40"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </Row>
          <div className="grid gap-4 md:grid-cols-2">
            <Row label="YouTube URL" hint="Auto-extracts embed ID.">
              <input
                className="input"
                value={form.youtube_url}
                onChange={(e) => set("youtube_url", e.target.value)}
                placeholder="https://youtu.be/…"
              />
              {ytId && <div className="mt-1 text-xs text-ink/50">ID: {ytId}</div>}
            </Row>
            <Row label="Instagram URL">
              <input
                className="input"
                value={form.instagram_url}
                onChange={(e) => set("instagram_url", e.target.value)}
                placeholder="https://instagram.com/p/…"
              />
            </Row>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Row label="Duration">
              <input
                className="input"
                value={form.duration}
                onChange={(e) => set("duration", e.target.value)}
                placeholder="52 min"
              />
            </Row>
            <Row label="Episode #">
              <input
                className="input"
                type="number"
                value={form.episode_number}
                onChange={(e) => set("episode_number", e.target.value)}
              />
            </Row>
            <Row label="Status">
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value as Form["status"])}
                className="input"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Row>
          </div>
          <Row label="Cover image URL">
            <input
              className="input"
              value={form.image_url}
              onChange={(e) => set("image_url", e.target.value)}
              placeholder="https://…"
            />
          </Row>
          <Row label="Tags" hint="Comma-separated. e.g. Fatherhood, Trades, First Believers">
            <input
              className="input"
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
            />
          </Row>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-ink-deep px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-cream disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <Link
              to="/admin"
              className="border border-ink/30 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em]"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
      <style>{`.input{width:100%;border:1px solid var(--color-line, #d8d3ca);background:var(--color-paper, #f6f2ea);padding:0.75rem 1rem;color:var(--color-ink, #191512);}`}</style>
    </section>
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
