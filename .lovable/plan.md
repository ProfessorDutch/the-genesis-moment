You have provided a full homepage narrative for The Genesis Moment — a faith-based storytelling site focused on business owners and the people who believed in them first. The existing project already has the right structure (homepage, podcast, thoughtcasts, Mustard Seed, tell-your-story routes), so the best next step is to rewrite the homepage to match your new copy and tighten the surrounding navigation.

What I will build

1. Rewrite src/routes/index.tsx
   - Hero: "Who saw something in you before you could see it in yourself?" with "Watch the Stories" and "Tell Your Story" CTAs.
   - Featured Genesis Moment section with the wife/belief quote and "Watch Episode" link.
   - "The People Behind the Story" manifesto section.
   - "More Genesis Moments" grid (3 cards: toolbox, chance, living with mother) linking to podcast episodes.
   - "The Story Before the Success" section.
   - Thoughtcasts section with the three quoted pieces and "Watch All Thoughtcasts" link.
   - "The Mustard Seed" section with "Learn About The Mustard Seed" link.
   - "Someone planted something in you" closing section.
   - Final CTAs: "Tell Your Genesis Moment" and "Nominate Someone".
   - Close with the Matthew 7:7 quote and a footer-style domain sign-off.

2. Update navigation
   - Add a "Nominate" link to the site header and footer where it makes sense.
   - Keep existing routes: Podcast, Thoughtcasts, The Mustard Seed, Tell Your Story.

3. Content wiring
   - Map the new copy to the existing episode/thoughtcast data in src/lib/content.ts where possible.
   - Use the existing image assets and design tokens (cream, ink, ember, mustard, serif/sans fonts).
   - Keep the warm, editorial aesthetic already in place.

4. SEO / head metadata
   - Update the homepage title and meta description to match the new angle.

Out of scope for this first pass
   - Building new backend forms or a nomination flow. The "Tell Your Story" and "Nominate" CTAs will link to the existing /tell-your-story route (or a placeholder if you want a separate nomination page later).
   - Generating new images. I will use the existing assets and image placeholders where needed.

If you want me to also create a dedicated /nominate route or a backend form, let me know and I will add it.