export const SITE_URL = "https://thegenesismoment.com";

export const CREATOR_URL = "https://jasondutchbrown.com/";
export const CREATOR_ID = "https://jasondutchbrown.com/#person";
export const CREATOR_NAME = "Jason \u201CDutch\u201D Brown";

export const GENESIS_TERM_URL = "https://jasondutchbrown.com/the-genesis-moment";
export const GENESIS_TERM_ID = `${GENESIS_TERM_URL}#term`;
export const THOUGHTCAST_TERM_URL = "https://jasondutchbrown.com/thoughtcast";
export const THOUGHTCAST_TERM_ID = `${THOUGHTCAST_TERM_URL}#term`;

export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PODCAST_SERIES_ID = `${SITE_URL}/podcast#series`;
export const THOUGHTCAST_SERIES_ID = `${SITE_URL}/thoughtcasts#series`;

/** Absolute URL for a route path such as "/podcast". */
export function abs(path: string) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export const personNode = {
  "@type": "Person",
  "@id": CREATOR_ID,
  name: CREATOR_NAME,
  url: CREATOR_URL,
};

/** Build a head() scripts entry containing a JSON-LD graph. */
export function jsonLd(graph: unknown[]) {
  return [
    {
      type: "application/ld+json",
      children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
    },
  ];
}
