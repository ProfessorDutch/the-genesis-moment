import { supabase } from "@/integrations/supabase/client";
import { episodes as staticEpisodes, thoughtcasts as staticThoughtcasts } from "@/lib/content";
import type { ContentEntry, ContentType } from "@/lib/publishing";
import { effectiveStatus } from "@/lib/publishing";

export const ENTRY_COLUMNS =
  "id, type, status, slug, title, short_description, body, author_name, author_id, guest_id, guest_name_override, guest_description, role_override, published_at, scheduled_at, updated_at, created_at, audio_url, audio_duration, social_image, transcript, featured, image_url, duration, episode_number, tags, youtube_id, youtube_url, instagram_url, excerpt, description";

/** Artwork shipped with the approved design, keyed by slug. */
export const legacyImages: Record<string, string> = {
  ...Object.fromEntries(staticEpisodes.map((e) => [e.slug, e.image ?? ""])),
  ...Object.fromEntries(staticThoughtcasts.map((t) => [t.slug, t.image ?? ""])),
};

export function entryImage(entry: {
  slug: string;
  social_image?: string | null;
  image_url?: string | null;
}) {
  return entry.social_image || entry.image_url || legacyImages[entry.slug] || undefined;
}

type Row = Record<string, unknown>;

export function normalizeEntry(row: Row): ContentEntry {
  const r = row as any;
  return {
    ...r,
    short_description: r.short_description ?? r.excerpt ?? null,
    body: r.body ?? r.description ?? null,
    tags: r.tags ?? [],
    featured: Boolean(r.featured),
  } as ContentEntry;
}

/** Entries that may appear in a public collection. */
export async function fetchCollection(type: ContentType): Promise<ContentEntry[]> {
  const { data } = await supabase
    .from("episodes")
    .select(ENTRY_COLUMNS)
    .eq("type", type)
    .in("status", ["published", "scheduled"])
    .order("published_at", { ascending: false });
  return (data ?? [])
    .map(normalizeEntry)
    .filter((e) => effectiveStatus(e) === "published");
}

/** A single publicly routable entry, or null. */
export async function fetchEntry(type: ContentType, slug: string): Promise<ContentEntry | null> {
  const { data } = await supabase
    .from("episodes")
    .select(ENTRY_COLUMNS)
    .eq("type", type)
    .eq("slug", slug)
    .maybeSingle();
  if (!data) return null;
  const entry = normalizeEntry(data);
  const s = effectiveStatus(entry);
  return s === "published" || s === "archived" ? entry : null;
}

/** Where an old slug now points, if anywhere. */
export async function fetchRedirect(type: ContentType, fromSlug: string) {
  const { data } = await supabase
    .from("content_redirects")
    .select("to_slug")
    .eq("type", type)
    .eq("from_slug", fromSlug)
    .maybeSingle();
  return data?.to_slug ?? null;
}

/** Preview-token lookup (unpublished content, private link only). */
export async function fetchPreview(token: string): Promise<ContentEntry | null> {
  const { data } = await supabase.rpc("get_preview_entry", { _token: token });
  const row = Array.isArray(data) ? data[0] : data;
  return row ? normalizeEntry(row as Row) : null;
}
