ALTER TABLE public.episodes
  ADD COLUMN IF NOT EXISTS short_description text,
  ADD COLUMN IF NOT EXISTS body text,
  ADD COLUMN IF NOT EXISTS author_name text,
  ADD COLUMN IF NOT EXISTS author_id text,
  ADD COLUMN IF NOT EXISTS guest_description text,
  ADD COLUMN IF NOT EXISTS scheduled_at timestamptz,
  ADD COLUMN IF NOT EXISTS audio_url text,
  ADD COLUMN IF NOT EXISTS audio_duration text,
  ADD COLUMN IF NOT EXISTS social_image text,
  ADD COLUMN IF NOT EXISTS transcript text,
  ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS preview_token uuid NOT NULL DEFAULT gen_random_uuid();

UPDATE public.episodes SET short_description = COALESCE(short_description, excerpt), body = COALESCE(body, description);

CREATE UNIQUE INDEX IF NOT EXISTS episodes_type_slug_key ON public.episodes (type, slug);

CREATE TABLE IF NOT EXISTS public.content_redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type public.content_type NOT NULL,
  from_slug text NOT NULL,
  to_slug text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (type, from_slug)
);
GRANT SELECT ON public.content_redirects TO anon, authenticated;
GRANT ALL ON public.content_redirects TO service_role;
ALTER TABLE public.content_redirects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "content_redirects public read" ON public.content_redirects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "content_redirects admin write" ON public.content_redirects FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "episodes public read published" ON public.episodes;
CREATE POLICY "episodes public read live" ON public.episodes FOR SELECT TO anon, authenticated
USING (
  (status = 'published' AND published_at IS NOT NULL AND published_at <= now())
  OR (status = 'scheduled' AND scheduled_at IS NOT NULL AND scheduled_at <= now())
  OR (status = 'archived' AND published_at IS NOT NULL AND published_at <= now())
);

CREATE OR REPLACE FUNCTION public.get_preview_entry(_token uuid)
RETURNS SETOF public.episodes
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT * FROM public.episodes WHERE preview_token = _token AND status IN ('preview','draft','scheduled','published','archived')
$$;
REVOKE EXECUTE ON FUNCTION public.get_preview_entry(uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.get_preview_entry(uuid) TO anon, authenticated;

INSERT INTO public.episodes (type, slug, title, excerpt, short_description, description, body, duration, audio_duration, status, published_at, youtube_id, youtube_url, tags, author_name, author_id, episode_number)
VALUES
('thoughtcast','belief-before-proof','Belief before proof.','Someone has to believe in you before there is anything to point to. That person is not being naive. That person is being obedient.','Someone has to believe in you before there is anything to point to. That person is not being naive. That person is being obedient.','Most of us waited until we had evidence before we would bet on ourselves. The people who changed our lives did not wait. They saw something the rest of us needed a decade to see.','Most of us waited until we had evidence before we would bet on ourselves. The people who changed our lives did not wait. They saw something the rest of us needed a decade to see.','1:12','1:12','published','2025-01-20T00:00:00Z','dQw4w9WgXcQ',NULL,ARRAY['Belief'],'Jason “Dutch” Brown','https://jasondutchbrown.com/#person',NULL),
('thoughtcast','the-thought-you-almost-quit-on','The thought you almost quit on.','The moment you almost stopped is usually the moment right before it started to work.','The moment you almost stopped is usually the moment right before it started to work.','Nobody talks about the Tuesday afternoon when you sat in your truck and decided to give it one more week. But that Tuesday is the story.','Nobody talks about the Tuesday afternoon when you sat in your truck and decided to give it one more week. But that Tuesday is the story.','0:54','0:54','published','2025-01-27T00:00:00Z','dQw4w9WgXcQ',NULL,ARRAY['Perseverance'],'Jason “Dutch” Brown','https://jasondutchbrown.com/#person',NULL),
('thoughtcast','the-prayer-she-never-told-me-about','The prayer she never told me about.','Some of the doors that opened for you were opened by someone praying in a room you were not in.','Some of the doors that opened for you were opened by someone praying in a room you were not in.','You will not always know who was carrying you. You may never know. That does not make it less true.','You will not always know who was carrying you. You may never know. That does not make it less true.','1:06','1:06','published','2025-02-05T00:00:00Z','dQw4w9WgXcQ',NULL,ARRAY['Prayer'],'Jason “Dutch” Brown','https://jasondutchbrown.com/#person',NULL),
('thoughtcast','what-a-kid-hears-when-you-say-yes','What a kid hears when you say yes.','When you give a young person one real opportunity, you are not giving them a job. You are telling them who they are allowed to become.','When you give a young person one real opportunity, you are not giving them a job. You are telling them who they are allowed to become.','A yes at seventeen is a sentence a person carries for the rest of their life.','A yes at seventeen is a sentence a person carries for the rest of their life.','1:22','1:22','published','2025-02-14T00:00:00Z','dQw4w9WgXcQ',NULL,ARRAY['Mentorship'],'Jason “Dutch” Brown','https://jasondutchbrown.com/#person',NULL),
('thoughtcast','the-hero-is-not-the-point','The hero is not the point.','The hero is who they became. The story is who they were before anyone knew that was possible.','The hero is who they became. The story is who they were before anyone knew that was possible.','Every successful person you admire was, at one point, small, uncertain, and easy to overlook. That is not the shameful part of the story. That is the whole point of it.','Every successful person you admire was, at one point, small, uncertain, and easy to overlook. That is not the shameful part of the story. That is the whole point of it.','1:04','1:04','published','2025-02-25T00:00:00Z','dQw4w9WgXcQ',NULL,ARRAY['Identity'],'Jason “Dutch” Brown','https://jasondutchbrown.com/#person',NULL),
('thoughtcast','recognize-yourself','So they can recognize themselves.','We are not showing kids successful people so they can admire them. We are showing them where those people started so they can recognize themselves.','We are not showing kids successful people so they can admire them. We are showing them where those people started so they can recognize themselves.','Admiration keeps a young person in the audience. Recognition invites them onto the stage.','Admiration keeps a young person in the audience. Recognition invites them onto the stage.','1:18','1:18','published','2025-03-04T00:00:00Z','dQw4w9WgXcQ',NULL,ARRAY['The Mustard Seed'],'Jason “Dutch” Brown','https://jasondutchbrown.com/#person',NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.episodes (type, slug, title, excerpt, short_description, description, body, duration, status, guest_name_override, role_override, tags, episode_number, author_name, author_id)
VALUES
('podcast','the-first-toolbox','The first toolbox my father ever bought me.','Before the shop, before the crew, before anyone knew his name — Ray was living with his mother and did not believe he was going to make it.','Before the shop, before the crew, before anyone knew his name — Ray was living with his mother and did not believe he was going to make it.','A conversation about the years before the business existed. About the father who bought a set of tools when there was no reason yet to believe they would matter. About the wife who kept praying while Ray still questioned whether he was the man for the job.','A conversation about the years before the business existed. About the father who bought a set of tools when there was no reason yet to believe they would matter. About the wife who kept praying while Ray still questioned whether he was the man for the job.',NULL,'draft','Ray Delgado','Founder, Delgado Custom Millwork',ARRAY['Fatherhood','Trades','First Believers'],1,'Jason “Dutch” Brown','https://jasondutchbrown.com/#person'),
('podcast','she-believed-before-i-did','She believed before I did.','Marcus talks about the season he almost walked away — and the woman who refused to let him.','Marcus talks about the season he almost walked away — and the woman who refused to let him.','Two failed businesses, a bankruptcy, and a marriage that carried the vision until Marcus was strong enough to carry it himself. A conversation about being seen before you are ready to be seen.','Two failed businesses, a bankruptcy, and a marriage that carried the vision until Marcus was strong enough to carry it himself. A conversation about being seen before you are ready to be seen.',NULL,'draft','Marcus Hale','Owner, Hale & Sons Roofing',ARRAY['Marriage','Failure','Second Chances'],2,'Jason “Dutch” Brown','https://jasondutchbrown.com/#person'),
('podcast','the-man-who-hired-me-when-nobody-would','The man who hired me when nobody would.','One phone call. One yes. A whole different life. Jonah on the foreman who saw something in a kid nobody else was betting on.','One phone call. One yes. A whole different life. Jonah on the foreman who saw something in a kid nobody else was betting on.','A story about probation, doubt, and the older tradesman who kept showing up. What it does to a young man when someone decides he is worth the risk.','A story about probation, doubt, and the older tradesman who kept showing up. What it does to a young man when someone decides he is worth the risk.',NULL,'draft','Jonah Reyes','Master Electrician, Reyes Electric',ARRAY['Mentorship','Trades','Redemption'],3,'Jason “Dutch” Brown','https://jasondutchbrown.com/#person'),
('podcast','born-again-and-still-scared','Born again — and still scared.','Salvation did not remove the fear. It gave Elias a reason to walk through it anyway.','Salvation did not remove the fear. It gave Elias a reason to walk through it anyway.','A conversation about the difference between being saved and feeling capable, and about the community that helped Elias keep both his faith and his business alive.','A conversation about the difference between being saved and feeling capable, and about the community that helped Elias keep both his faith and his business alive.',NULL,'draft','Pastor Elias Ford','Pastor & Small Business Owner',ARRAY['Faith','Calling','Community'],4,'Jason “Dutch” Brown','https://jasondutchbrown.com/#person')
ON CONFLICT (slug) DO NOTHING;