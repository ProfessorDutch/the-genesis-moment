ALTER TYPE public.content_status ADD VALUE IF NOT EXISTS 'preview';
ALTER TYPE public.content_status ADD VALUE IF NOT EXISTS 'scheduled';
ALTER TYPE public.content_status ADD VALUE IF NOT EXISTS 'archived';