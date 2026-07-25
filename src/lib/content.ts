import heroCraftsman from "@/assets/hero-craftsman.jpg";
import tcMentor from "@/assets/tc-mentor.jpg";
import mustardYouth from "@/assets/mustard-youth.jpg";
import msDoorway from "@/assets/ms-doorway.jpg";
import stillBible from "@/assets/still-bible.jpg";
import pewLight from "@/assets/pew-light.jpg";
import workshopDusk from "@/assets/workshop-dusk.jpg";
import guestMarcus from "@/assets/guest-marcus.jpg";
import guestJonah from "@/assets/guest-jonah.jpg";
import guestElias from "@/assets/guest-elias.jpg";

export const images = {
  heroCraftsman,
  tcMentor,
  mustardYouth,
  msDoorway,
  stillBible,
  pewLight,
  workshopDusk,

  guestMarcus,
  guestJonah,
  guestElias,
};

export type Episode = {
  slug: string;
  number: number;
  guest: string;
  role: string;
  title: string;
  excerpt: string;
  description: string;
  duration: string;
  publishedAt: string;
  tags: string[];
  image?: string;
  youtubeId?: string;
  audioUrl?: string;
  website?: string;
  transcript?: string;
  relatedThoughtcasts?: string[];
};

export type Thoughtcast = {
  slug: string;
  title: string;
  thesis: string;
  body: string;
  topic: string;
  duration: string;
  publishedAt: string;
  image?: string;
  youtubeId?: string;
  relatedEpisode?: string;
};

export const episodes: Episode[] = [
  {
    slug: "the-first-toolbox",
    number: 1,
    guest: "Ray Delgado",
    role: "Founder, Delgado Custom Millwork",
    title: "The first toolbox my father ever bought me.",
    excerpt:
      "Before the shop, before the crew, before anyone knew his name — Ray was living with his mother and did not believe he was going to make it.",
    description:
      "A conversation about the years before the business existed. About the father who bought a set of tools when there was no reason yet to believe they would matter. About the wife who kept praying while Ray still questioned whether he was the man for the job.",
    duration: "52 min",
    publishedAt: "2025-01-14",
    tags: ["Fatherhood", "Trades", "First Believers"],
    image: heroCraftsman,
    youtubeId: "dQw4w9WgXcQ",
    website: "https://example.com",
    relatedThoughtcasts: ["the-thought-you-almost-quit-on", "belief-before-proof"],
  },
  {
    slug: "she-believed-before-i-did",
    number: 2,
    guest: "Marcus Hale",
    role: "Owner, Hale & Sons Roofing",
    title: "She believed before I did.",
    excerpt:
      "Marcus talks about the season he almost walked away — and the woman who refused to let him.",
    description:
      "Two failed businesses, a bankruptcy, and a marriage that carried the vision until Marcus was strong enough to carry it himself. A conversation about being seen before you are ready to be seen.",
    duration: "1 hr 4 min",
    publishedAt: "2025-02-02",
    tags: ["Marriage", "Failure", "Second Chances"],
    image: guestMarcus,
    youtubeId: "dQw4w9WgXcQ",
    relatedThoughtcasts: ["the-prayer-she-never-told-me-about"],
  },
  {
    slug: "the-man-who-hired-me-when-nobody-would",
    number: 3,
    guest: "Jonah Reyes",
    role: "Master Electrician, Reyes Electric",
    title: "The man who hired me when nobody would.",
    excerpt:
      "One phone call. One yes. A whole different life. Jonah on the foreman who saw something in a kid nobody else was betting on.",
    description:
      "A story about probation, doubt, and the older tradesman who kept showing up. What it does to a young man when someone decides he is worth the risk.",
    duration: "47 min",
    publishedAt: "2025-02-21",
    tags: ["Mentorship", "Trades", "Redemption"],
    image: guestJonah,
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "born-again-and-still-scared",
    number: 4,
    guest: "Pastor Elias Ford",
    role: "Pastor & Small Business Owner",
    title: "Born again — and still scared.",
    excerpt:
      "Salvation did not remove the fear. It gave Elias a reason to walk through it anyway.",
    description:
      "A conversation about the difference between being saved and feeling capable, and about the community that helped Elias keep both his faith and his business alive.",
    duration: "58 min",
    publishedAt: "2025-03-10",
    tags: ["Faith", "Calling", "Community"],
    image: guestElias,
    youtubeId: "dQw4w9WgXcQ",
  },
];

export const thoughtcasts: Thoughtcast[] = [
  {
    slug: "belief-before-proof",
    title: "Belief before proof.",
    thesis:
      "Someone has to believe in you before there is anything to point to. That person is not being naive. That person is being obedient.",
    body: "Most of us waited until we had evidence before we would bet on ourselves. The people who changed our lives did not wait. They saw something the rest of us needed a decade to see.",
    topic: "Belief",
    duration: "1:12",
    publishedAt: "2025-01-20",
    image: stillBible,
    youtubeId: "dQw4w9WgXcQ",
    relatedEpisode: "the-first-toolbox",
  },
  {
    slug: "the-thought-you-almost-quit-on",
    title: "The thought you almost quit on.",
    thesis:
      "The moment you almost stopped is usually the moment right before it started to work.",
    body: "Nobody talks about the Tuesday afternoon when you sat in your truck and decided to give it one more week. But that Tuesday is the story.",
    topic: "Perseverance",
    duration: "0:54",
    publishedAt: "2025-01-27",
    image: workshopDusk,
    youtubeId: "dQw4w9WgXcQ",
    relatedEpisode: "the-first-toolbox",
  },
  {
    slug: "the-prayer-she-never-told-me-about",
    title: "The prayer she never told me about.",
    thesis:
      "Some of the doors that opened for you were opened by someone praying in a room you were not in.",
    body: "You will not always know who was carrying you. You may never know. That does not make it less true.",
    topic: "Prayer",
    duration: "1:06",
    publishedAt: "2025-02-05",
    image: pewLight,
    youtubeId: "dQw4w9WgXcQ",
    relatedEpisode: "she-believed-before-i-did",
  },
  {
    slug: "what-a-kid-hears-when-you-say-yes",
    title: "What a kid hears when you say yes.",
    thesis:
      "When you give a young person one real opportunity, you are not giving them a job. You are telling them who they are allowed to become.",
    body: "A yes at seventeen is a sentence a person carries for the rest of their life.",
    topic: "Mentorship",
    duration: "1:22",
    publishedAt: "2025-02-14",
    image: tcMentor,
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "the-hero-is-not-the-point",
    title: "The hero is not the point.",
    thesis:
      "The hero is who they became. The story is who they were before anyone knew that was possible.",
    body: "Every successful person you admire was, at one point, small, uncertain, and easy to overlook. That is not the shameful part of the story. That is the whole point of it.",
    topic: "Identity",
    duration: "1:04",
    publishedAt: "2025-02-25",
    image: msDoorway,
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "recognize-yourself",
    title: "So they can recognize themselves.",
    thesis:
      "We are not showing kids successful people so they can admire them. We are showing them where those people started so they can recognize themselves.",
    body: "Admiration keeps a young person in the audience. Recognition invites them onto the stage.",
    topic: "The Mustard Seed",
    duration: "1:18",
    publishedAt: "2025-03-04",
    image: mustardYouth,
    youtubeId: "dQw4w9WgXcQ",
  },
];

export function getEpisode(slug: string) {
  return episodes.find((e) => e.slug === slug);
}

export function getThoughtcast(slug: string) {
  return thoughtcasts.find((t) => t.slug === slug);
}