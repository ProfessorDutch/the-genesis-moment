import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGuard } from "@/lib/admin-guard";
import { toast } from "sonner";
import {
  effectiveStatus,
  routePath,
  STATUSES,
  type EntryStatus,
} from "@/lib/publishing";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Admin — The Genesis Moment" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

type Episode = {
  id: string;
  type: "podcast" | "thoughtcast";
  slug: string;
  title: string;
  status: EntryStatus;
  scheduled_at: string | null;
  preview_token: string | null;
  episode_number: number | null;
  published_at: string | null;
  updated_at: string;
  guest_name_override: string | null;
  guests: { name: string } | null;
};

type Guest = {
  id: string;
  name: string;
  business: string | null;
  role: string | null;
  headshot_url: string | null;
  updated_at: string;
};

function AdminDashboard() {
  const navigate = useNavigate();
  const guard = useAdminGuard();
  const [tab, setTab] = useState<"podcast" | "thoughtcast" | "guests">("podcast");

  const episodesQ = useQuery({
    queryKey: ["admin", "episodes"],
    enabled: guard.isAdmin,
    queryFn: async (): Promise<Episode[]> => {
      const { data, error } = await supabase
        .from("episodes")
        .select(
          "id, type, slug, title, status, scheduled_at, preview_token, episode_number, published_at, updated_at, guest_name_override, guests(name)",
        )
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Episode[];
    },
  });

  const guestsQ = useQuery({
    queryKey: ["admin", "guests"],
    enabled: guard.isAdmin,
    queryFn: async (): Promise<Guest[]> => {
      const { data, error } = await supabase
        .from("guests")
        .select("id, name, business, role, headshot_url, updated_at")
        .order("name");
      if (error) throw error;
      return data ?? [];
    },
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (guard.loading) {
    return <div className="p-16 text-center text-ink/60">Loading…</div>;
  }
  if (!guard.isAdmin) {
    return (
      <section className="bg-cream px-5 py-24 md:px-8">
        <div className="mx-auto max-w-xl text-center">
          <div className="eyebrow mb-4 text-ember">Restricted</div>
          <h1 className="font-serif text-4xl">Not authorized</h1>
          <p className="mt-4 text-ink/70">
            You are signed in as <strong>{guard.email}</strong>, but this account does not have
            admin access.
          </p>
          <button
            onClick={signOut}
            className="mt-8 border border-ink/30 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] hover:border-ember hover:text-ember"
          >
            Sign out
          </button>
        </div>
      </section>
    );
  }

  const podcasts = (episodesQ.data ?? []).filter((e) => e.type === "podcast");
  const thoughts = (episodesQ.data ?? []).filter((e) => e.type === "thoughtcast");

  return (
    <section className="bg-cream px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="eyebrow mb-2 text-ember">Admin</div>
            <h1 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">Content console</h1>
            <p className="mt-2 text-ink/60">Signed in as {guard.email}</p>
          </div>
          <button
            onClick={signOut}
            className="border border-ink/30 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] hover:border-ember hover:text-ember"
          >
            Sign out
          </button>
        </div>

        <div className="mt-8 flex gap-2 border-b border-line">
          {(
            [
              ["podcast", `Podcasts (${podcasts.length})`],
              ["thoughtcast", `Thoughtcasts (${thoughts.length})`],
              ["guests", `Guests (${guestsQ.data?.length ?? 0})`],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] ${
                tab === k
                  ? "border-b-2 border-ember text-ember"
                  : "text-ink/50 hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "podcast" && (
          <EpisodeList rows={podcasts} label="podcast" refetch={() => episodesQ.refetch()} />
        )}
        {tab === "thoughtcast" && (
          <EpisodeList rows={thoughts} label="thoughtcast" refetch={() => episodesQ.refetch()} />
        )}
        {tab === "guests" && (
          <GuestList rows={guestsQ.data ?? []} refetch={() => guestsQ.refetch()} />
        )}
      </div>
    </section>
  );
}

function statusTone(s: EntryStatus) {
  if (s === "published") return "bg-ember/10 text-ember";
  if (s === "scheduled") return "bg-mustard/20 text-ink/70";
  if (s === "archived") return "bg-ink/5 text-ink/40";
  return "bg-ink/10 text-ink/60";
}

function EpisodeList({
  rows,
  label,
  refetch,
}: {
  rows: Episode[];
  label: "podcast" | "thoughtcast";
  refetch: () => void;
}) {
  const [filter, setFilter] = useState<EntryStatus | "all">("all");

  async function del(id: string) {
    if (!confirm("Delete this permanently? Archiving is usually the better choice.")) return;
    const { error } = await supabase.from("episodes").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      refetch();
    }
  }

  async function setStatus(row: Episode, next: EntryStatus) {
    const { error } = await supabase
      .from("episodes")
      .update({ status: next })
      .eq("id", row.id);
    if (error) toast.error(error.message);
    else {
      toast.success(`Moved to ${next}`);
      refetch();
    }
  }

  const counts = STATUSES.reduce<Record<string, number>>((acc, st) => {
    acc[st] = rows.filter((r) => r.status === st).length;
    return acc;
  }, {});
  const visible = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  return (
    <div className="mt-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(["all", ...STATUSES] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st as EntryStatus | "all")}
              className={`px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] ${
                filter === st ? "bg-ink text-cream" : "border border-line text-ink/55"
              }`}
            >
              {st}
              {st !== "all" ? ` (${counts[st] ?? 0})` : ` (${rows.length})`}
            </button>
          ))}
        </div>
        <Link
          to="/admin/episodes/$id"
          params={{ id: "new" }}
          search={{ type: label }}
          className="bg-ember px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
        >
          + New {label === "podcast" ? "episode" : "thoughtcast"}
        </Link>
      </div>
      {visible.length === 0 ? (
        <div className="border border-dashed border-line p-12 text-center text-ink/50">
          Nothing here yet.
        </div>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {visible.map((row) => {
            const eff = effectiveStatus(row);
            return (
              <li key={row.id} className="flex flex-wrap items-center gap-3 py-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${statusTone(row.status)}`}
                    >
                      {row.status}
                      {row.status === "scheduled" && eff === "published" ? " · live" : ""}
                    </span>
                    <span className="mono-tag text-ink/50">{routePath(row.type, row.slug)}</span>
                  </div>
                  <div className="mt-1 font-serif text-lg leading-tight">{row.title}</div>
                  <div className="text-sm text-ink/60">
                    {row.guests?.name || row.guest_name_override || "—"}
                  </div>
                </div>
                {row.status !== "published" && row.preview_token && (
                  <Link
                    to="/preview/$token"
                    params={{ token: row.preview_token }}
                    target="_blank"
                    className="border border-ink/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] hover:border-ember hover:text-ember"
                  >
                    Preview
                  </Link>
                )}
                {row.status === "published" ? (
                  <button
                    onClick={() => setStatus(row, "archived")}
                    className="border border-ink/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] hover:border-ember hover:text-ember"
                  >
                    Archive
                  </button>
                ) : row.status === "archived" ? (
                  <button
                    onClick={() => setStatus(row, "published")}
                    className="border border-ink/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] hover:border-ember hover:text-ember"
                  >
                    Restore
                  </button>
                ) : null}
                <Link
                  to="/admin/episodes/$id"
                  params={{ id: row.id }}
                  className="border border-ink/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] hover:border-ember hover:text-ember"
                >
                  Edit
                </Link>
                <button
                  onClick={() => del(row.id)}
                  className="border border-ink/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] hover:border-red-600 hover:text-red-600"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function GuestList({ rows, refetch }: { rows: Guest[]; refetch: () => void }) {
  async function del(id: string) {
    if (!confirm("Delete this guest?")) return;
    const { error } = await supabase.from("guests").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      refetch();
    }
  }
  return (
    <div className="mt-8">
      <div className="mb-4 flex justify-end">
        <Link
          to="/admin/guests/$id"
          params={{ id: "new" }}
          className="bg-ember px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
        >
          + New guest
        </Link>
      </div>
      {rows.length === 0 ? (
        <div className="border border-dashed border-line p-12 text-center text-ink/50">
          No guests yet.
        </div>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {rows.map((g) => (
            <li key={g.id} className="flex items-center gap-4 py-4">
              {g.headshot_url ? (
                <img
                  src={g.headshot_url}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <div className="h-14 w-14 rounded-full bg-ink/10" />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-serif text-lg">{g.name}</div>
                <div className="text-sm text-ink/60">
                  {[g.role, g.business].filter(Boolean).join(" · ") || "—"}
                </div>
              </div>
              <Link
                to="/admin/guests/$id"
                params={{ id: g.id }}
                className="border border-ink/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] hover:border-ember hover:text-ember"
              >
                Edit
              </Link>
              <button
                onClick={() => del(g.id)}
                className="border border-ink/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] hover:border-red-600 hover:text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
