import { createFileRoute, useNavigate, useParams, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGuard } from "@/lib/admin-guard";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/guests/$id")({
  head: () => ({
    meta: [
      { title: "Edit guest — Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: GuestEditor,
});

type Form = {
  name: string;
  business: string;
  role: string;
  city: string;
  bio: string;
  website: string;
  instagram: string;
  x_handle: string;
  linkedin: string;
  facebook: string;
  headshot_url: string;
};

const empty: Form = {
  name: "",
  business: "",
  role: "",
  city: "",
  bio: "",
  website: "",
  instagram: "",
  x_handle: "",
  linkedin: "",
  facebook: "",
  headshot_url: "",
};

function GuestEditor() {
  const guard = useAdminGuard();
  const { id } = useParams({ from: "/_authenticated/admin/guests/$id" });
  const navigate = useNavigate();
  const isNew = id === "new";
  const [form, setForm] = useState<Form>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!guard.isAdmin || isNew) return;
    (async () => {
      const { data, error } = await supabase.from("guests").select("*").eq("id", id).single();
      if (error) return toast.error(error.message);
      setForm({
        name: data.name ?? "",
        business: data.business ?? "",
        role: data.role ?? "",
        city: data.city ?? "",
        bio: data.bio ?? "",
        website: data.website ?? "",
        instagram: data.instagram ?? "",
        x_handle: data.x_handle ?? "",
        linkedin: data.linkedin ?? "",
        facebook: data.facebook ?? "",
        headshot_url: data.headshot_url ?? "",
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
        name: form.name.trim(),
        business: form.business.trim() || null,
        role: form.role.trim() || null,
        city: form.city.trim() || null,
        bio: form.bio.trim() || null,
        website: form.website.trim() || null,
        instagram: form.instagram.trim() || null,
        x_handle: form.x_handle.trim() || null,
        linkedin: form.linkedin.trim() || null,
        facebook: form.facebook.trim() || null,
        headshot_url: form.headshot_url.trim() || null,
      };
      if (!payload.name) throw new Error("Name is required");
      if (isNew) {
        const { data, error } = await supabase
          .from("guests")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        toast.success("Guest created");
        navigate({ to: "/admin/guests/$id", params: { id: data.id } });
      } else {
        const { error } = await supabase.from("guests").update(payload).eq("id", id);
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

  return (
    <section className="bg-cream px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-3xl">
        <Link to="/admin" className="mono-tag text-ink/50 hover:text-ember">
          ← Back to admin
        </Link>
        <h1 className="mt-4 font-serif text-3xl md:text-4xl">
          {isNew ? "New guest" : "Edit guest"}
        </h1>
        <form onSubmit={save} className="mt-8 space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" required>
              <input className="input" required value={form.name} onChange={(e) => set("name", e.target.value)} />
            </Field>
            <Field label="Business">
              <input className="input" value={form.business} onChange={(e) => set("business", e.target.value)} />
            </Field>
            <Field label="Role">
              <input className="input" value={form.role} onChange={(e) => set("role", e.target.value)} />
            </Field>
            <Field label="City">
              <input className="input" value={form.city} onChange={(e) => set("city", e.target.value)} />
            </Field>
          </div>
          <Field label="Bio">
            <textarea className="input min-h-28" value={form.bio} onChange={(e) => set("bio", e.target.value)} />
          </Field>
          <Field label="Headshot URL" hint="Paste an image URL. (Uploads can be added later.)">
            <input className="input" value={form.headshot_url} onChange={(e) => set("headshot_url", e.target.value)} />
            {form.headshot_url && (
              <img src={form.headshot_url} alt="" className="mt-3 h-24 w-24 rounded-full object-cover" />
            )}
          </Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Website"><input className="input" value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://…" /></Field>
            <Field label="Instagram"><input className="input" value={form.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="@handle or URL" /></Field>
            <Field label="X (Twitter)"><input className="input" value={form.x_handle} onChange={(e) => set("x_handle", e.target.value)} placeholder="@handle or URL" /></Field>
            <Field label="LinkedIn"><input className="input" value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="URL" /></Field>
            <Field label="Facebook"><input className="input" value={form.facebook} onChange={(e) => set("facebook", e.target.value)} placeholder="URL" /></Field>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={saving} className="bg-ink-deep px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-cream disabled:opacity-50">
              {saving ? "Saving…" : "Save"}
            </button>
            <Link to="/admin" className="border border-ink/30 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em]">Cancel</Link>
          </div>
        </form>
      </div>
      <style>{`.input{width:100%;border:1px solid var(--color-line, #d8d3ca);background:var(--color-paper, #f6f2ea);padding:0.75rem 1rem;color:var(--color-ink, #191512);}`}</style>
    </section>
  );
}

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mono-tag mb-1 text-ink/60">
        {label}
        {required && <span className="text-ember"> *</span>}
      </div>
      {children}
      {hint && <div className="mt-1 text-xs text-ink/45">{hint}</div>}
    </label>
  );
}
