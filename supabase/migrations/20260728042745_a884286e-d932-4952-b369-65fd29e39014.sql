
-- Roles
create type public.app_role as enum ('admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);
grant select on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "profiles self read" on public.profiles for select to authenticated using (id = auth.uid());

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "user_roles self read" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- New-user handler: create profile; grant admin to designated email
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  if new.email = 'jason@meetemmy.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
    on conflict do nothing;
  end if;
  return new;
end $$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Content tables
create type public.content_type as enum ('podcast', 'thoughtcast');
create type public.content_status as enum ('draft', 'published');

create table public.guests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business text,
  role text,
  city text,
  bio text,
  website text,
  instagram text,
  x_handle text,
  linkedin text,
  facebook text,
  headshot_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.guests to anon, authenticated;
grant all on public.guests to service_role;
alter table public.guests enable row level security;
create policy "guests public read" on public.guests for select to anon, authenticated using (true);
create policy "guests admin write" on public.guests for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create table public.episodes (
  id uuid primary key default gen_random_uuid(),
  type public.content_type not null,
  slug text not null unique,
  title text not null,
  excerpt text,
  description text,
  guest_id uuid references public.guests(id) on delete set null,
  guest_name_override text,
  role_override text,
  duration text,
  youtube_url text,
  youtube_id text,
  instagram_url text,
  image_url text,
  tags text[] not null default '{}',
  status public.content_status not null default 'draft',
  episode_number integer,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.episodes to anon, authenticated;
grant all on public.episodes to service_role;
alter table public.episodes enable row level security;
create policy "episodes public read published" on public.episodes for select to anon, authenticated using (status = 'published');
create policy "episodes admin read all" on public.episodes for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "episodes admin write" on public.episodes for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create index episodes_type_status_idx on public.episodes (type, status, published_at desc);

-- updated_at trigger
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

create trigger set_updated_at_guests before update on public.guests for each row execute function public.tg_set_updated_at();
create trigger set_updated_at_episodes before update on public.episodes for each row execute function public.tg_set_updated_at();
