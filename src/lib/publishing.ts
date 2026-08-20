/**
 * Publishing rules shared by the admin console, the public templates,
 * and the sitemap. Pure functions only — safe on client and server.
 */
import {
  abs,
  CREATOR_ID,
  CREATOR_NAME,
  CREATOR_URL,
  THOUGHTCAST_TERM_URL,
} from "@/lib/site";

export type ContentType = "podcast" | "thoughtcast";
export type EntryStatus = "draft" | "preview" | "scheduled" | "published" | "archived";

export const STATUSES: EntryStatus[] = [
  "draft",
  "preview",
  "scheduled",
  "published",
  "archived",
];

export const TYPE_LABEL: Record<ContentType, string> = {
  podcast: "Podcast Episode",
  thoughtcast: "Thoughtcast",
};

/** Entry shape used everywhere (mirrors the content_entries model). */
export type ContentEntry = {
  id: string;
  type: ContentType;
  status: EntryStatus;
  slug: string;
  title: string;
  short_description: string | null;
  body: string | null;
  author_name: string | null;
  author_id: string | null;
  guest_name_override: string | null;
  guest_description: string | null;
  role_override: string | null;
  published_at: string | null;
  scheduled_at: string | null;
  updated_at: string;
  created_at: string;
  audio_url: string | null;
  audio_duration: string | null;
  social_image: string | null;
  transcript: string | null;
  featured: boolean;
  image_url: string | null;
  duration: string | null;
  episode_number: number | null;
  tags: string[];
  youtube_id: string | null;
  preview_token?: string | null;
};

/* ---------------------------------------------------------------- slugs */

/**
 * lowercase → strip trademark marks → strip punctuation →
 * spaces to single hyphens → collapse duplicates.
 */
export function slugifyTitle(input: string): string {
  return input
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u2122\u00ae\u00a9]/g, "")
    .replace(/['\u2018\u2019\u201c\u201d]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

export function collectionPath(type: ContentType) {
  return type === "podcast" ? "/podcast" : "/thoughtcasts";
}

export function routePath(type: ContentType, slug: string) {
  return `${collectionPath(type)}/${slug}`;
}

export function canonicalUrl(type: ContentType, slug: string) {
  return abs(routePath(type, slug));
}

/* ------------------------------------------------------------- metadata */

export function titleTag(entry: Pick<ContentEntry, "type" | "title">) {
  return entry.type === "podcast"
    ? `${entry.title} \u2014 The Genesis Moment\u2122`
    : `${entry.title} \u2014 Thoughtcasts\u2122`;
}

export function schemaType(entry: Pick<ContentEntry, "type" | "status">) {
  if (entry.type === "thoughtcast") return "Article";
  return isReleased(entry.status) ? "PodcastEpisode" : "WebPage";
}

export function bylineText(entry: Pick<ContentEntry, "type">) {
  return entry.type === "thoughtcast"
    ? `A Thoughtcast\u2122 by ${CREATOR_NAME}`
    : `A conversation series created by ${CREATOR_NAME}. The story belongs to the guest.`;
}

export const AUTHOR_DEFAULTS = {
  name: CREATOR_NAME,
  id: CREATOR_ID,
  url: CREATOR_URL,
  termUrl: THOUGHTCAST_TERM_URL,
};

/* --------------------------------------------------------------- status */

/** A scheduled entry whose moment has arrived counts as published. */
export function effectiveStatus(
  entry: Pick<ContentEntry, "status" | "scheduled_at">,
  now = new Date(),
): EntryStatus {
  if (
    entry.status === "scheduled" &&
    entry.scheduled_at &&
    new Date(entry.scheduled_at) <= now
  ) {
    return "published";
  }
  return entry.status;
}

function isReleased(status: EntryStatus) {
  return status === "published" || status === "archived";
}

export function isPubliclyRoutable(entry: Pick<ContentEntry, "status" | "scheduled_at">) {
  const s = effectiveStatus(entry);
  return s === "published" || s === "archived";
}

export function isInCollection(entry: Pick<ContentEntry, "status" | "scheduled_at">) {
  return effectiveStatus(entry) === "published";
}

export function isInSitemap(entry: Pick<ContentEntry, "status" | "scheduled_at">) {
  return effectiveStatus(entry) === "published";
}

export function robotsFor(entry: Pick<ContentEntry, "status" | "scheduled_at">) {
  return isInSitemap(entry) ? "index, follow" : "noindex, nofollow";
}

/* ----------------------------------------------------------- validation */

export type Validation = { blocking: string[]; warnings: string[] };

export function validateEntry(
  entry: Partial<ContentEntry> & { type?: ContentType },
  opts: { slugTaken?: boolean } = {},
): Validation {
  const blocking: string[] = [];
  const warnings: string[] = [];

  if (!entry.type) blocking.push("Content type is required.");
  if (!entry.title?.trim()) blocking.push("Title is required.");
  if (!entry.slug?.trim()) blocking.push("Slug is required.");
  if (opts.slugTaken) blocking.push("Slug is already used by another entry of this type.");
  if (entry.slug && slugifyTitle(entry.slug) !== entry.slug)
    blocking.push("Slug must be lowercase words separated by single hyphens.");
  if (!entry.short_description?.trim()) blocking.push("Short description is required.");
  if (!entry.body?.trim()) blocking.push("Body is required before publication.");
  if (!entry.published_at) blocking.push("Publication date is required.");
  if (entry.type && entry.slug && !canonicalUrl(entry.type, entry.slug).startsWith("https://"))
    blocking.push("Canonical URL could not be generated.");

  if (entry.type === "podcast") {
    const hasGuest = Boolean(entry.guest_name_override?.trim());
    const hasMedia = Boolean(entry.audio_url?.trim() || entry.youtube_id?.trim());
    if (!hasGuest || !hasMedia) {
      blocking.push(
        "A podcast episode needs a real guest and a real recording (audio or video) before it can be published.",
      );
    }
    if (!entry.audio_duration?.trim() && !entry.duration?.trim())
      warnings.push("No runtime recorded — duration will be omitted from schema.");
    if (!entry.guest_description?.trim()) warnings.push("Guest description is missing.");
  }

  if (!entry.social_image?.trim() && !entry.image_url?.trim())
    warnings.push("Social image is missing.");
  if (!entry.transcript?.trim()) warnings.push("Transcript is missing.");
  if (entry.type === "thoughtcast" && !entry.audio_url?.trim())
    warnings.push("No audio attached (not required for a written Thoughtcast).");

  return { blocking, warnings };
}

export function canPublish(v: Validation) {
  return v.blocking.length === 0;
}
