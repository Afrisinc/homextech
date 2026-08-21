-- ---------------------------------------------------------------------------
-- OfficeHomeTechX — Supabase schema
-- Run in the Supabase SQL editor. Writes happen server-side with the service
-- role key, so RLS stays enabled with no public policies.
-- ---------------------------------------------------------------------------

create extension if not exists "pgcrypto";

create table if not exists public.contact_inquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  source        text,
  full_name     text not null,
  organization  text,
  email         text not null,
  phone         text,
  country       text,
  service       text not null,
  project_type  text,
  message       text not null,
  handled       boolean not null default false
);

create table if not exists public.consultation_requests (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  source                text,
  organization          text not null,
  contact_name          text not null,
  email                 text not null,
  phone                 text,
  infrastructure_type   text not null,
  challenges            text not null,
  user_count            text not null,
  has_servers           text not null,
  has_networking        text not null,
  cloud_requirement     text not null,
  training_requirement  text not null,
  handled               boolean not null default false
);

create table if not exists public.training_applications (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  source        text,
  full_name     text not null,
  email         text not null,
  phone         text,
  program_slug  text not null,
  background    text,
  handled       boolean not null default false
);

create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null unique,
  source      text
);

create index if not exists contact_inquiries_created_at_idx
  on public.contact_inquiries (created_at desc);
create index if not exists consultation_requests_created_at_idx
  on public.consultation_requests (created_at desc);

alter table public.contact_inquiries       enable row level security;
alter table public.consultation_requests   enable row level security;
alter table public.training_applications   enable row level security;
alter table public.newsletter_subscribers  enable row level security;

-- No policies are defined on purpose: the anon and authenticated roles get no
-- access at all. The service role bypasses RLS and is used only from the
-- Next.js route handlers. Add narrowly scoped policies when the admin
-- dashboard is introduced.
