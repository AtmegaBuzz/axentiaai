-- ============================================================
-- ENTERPRISE INQUIRIES
-- ============================================================

create table if not exists public.enterprise_inquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text not null,
  message text not null,
  submitted_at timestamptz default now() not null
);

create index if not exists idx_enterprise_inquiries_submitted_at
  on public.enterprise_inquiries(submitted_at desc);

alter table public.enterprise_inquiries enable row level security;

drop policy if exists "Admin can read enterprise inquiries" on public.enterprise_inquiries;
drop policy if exists "Anyone can insert enterprise inquiries" on public.enterprise_inquiries;

create policy "Admin can read enterprise inquiries" on public.enterprise_inquiries
  for select using (auth.email() = 'admin@axentiaai.in');

create policy "Anyone can insert enterprise inquiries" on public.enterprise_inquiries
  for insert with check (true);
