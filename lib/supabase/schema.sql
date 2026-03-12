-- ============================================================
-- AXENTIA AI COMMUNITY FORUM — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. PROFILES (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  bio text,
  forum_approved boolean default false not null,
  created_at timestamptz default now() not null
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. CATEGORIES
create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text,
  icon text, -- emoji or icon name
  color text, -- tailwind color class
  sort_order int default 0,
  created_at timestamptz default now() not null
);

-- Seed categories
insert into public.categories (name, slug, description, icon, color, sort_order) values
  ('General Discussion', 'general', 'Open conversations about consulting, careers, and more', '💬', 'brand', 0),
  ('SAP & ERP', 'sap-erp', 'SAP modules, ERP implementation, configuration help', '⚙️', 'indigo', 1),
  ('Data & AI', 'data-ai', 'AI/ML, data analytics, enterprise AI use cases', '🧠', 'violet', 2),
  ('Career Advice', 'career', 'Job search, interviews, career transitions, mentorship', '🎯', 'amber', 3),
  ('Program Q&A', 'programs', 'Questions about DCAP, EAP, and Online programs', '📚', 'teal', 4),
  ('Showcase', 'showcase', 'Share your projects, certifications, and wins', '🏆', 'emerald', 5)
on conflict (slug) do nothing;

-- 3. THREADS
create table if not exists public.threads (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.categories on delete cascade not null,
  author_id uuid references public.profiles on delete cascade not null,
  title text not null,
  slug text not null,
  is_pinned boolean default false,
  is_locked boolean default false,
  view_count int default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index if not exists idx_threads_category on public.threads(category_id);
create index if not exists idx_threads_author on public.threads(author_id);
create index if not exists idx_threads_created on public.threads(created_at desc);

-- 4. POSTS (replies within a thread; first post = thread body)
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  thread_id uuid references public.threads on delete cascade not null,
  author_id uuid references public.profiles on delete cascade not null,
  content text not null,
  parent_id uuid references public.posts on delete set null, -- for nested replies
  is_solution boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index if not exists idx_posts_thread on public.posts(thread_id);
create index if not exists idx_posts_author on public.posts(author_id);

-- 5. REACTIONS (upvote/downvote)
create table if not exists public.reactions (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts on delete cascade not null,
  user_id uuid references public.profiles on delete cascade not null,
  type text not null check (type in ('upvote', 'downvote')),
  created_at timestamptz default now() not null,
  unique(post_id, user_id) -- one reaction per user per post
);

create index if not exists idx_reactions_post on public.reactions(post_id);

-- 6. UPDATE thread.updated_at when a new post is added
create or replace function public.update_thread_timestamp()
returns trigger as $$
begin
  update public.threads set updated_at = now() where id = new.thread_id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_post_created on public.posts;
create trigger on_post_created
  after insert on public.posts
  for each row execute function public.update_thread_timestamp();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.threads enable row level security;
alter table public.posts enable row level security;
alter table public.reactions enable row level security;

-- Profiles: anyone can read, users can update their own, admin can update any
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admin can update any profile" on public.profiles for update using (auth.email() = 'admin@axentiaai.in');

-- Categories: anyone can read
create policy "Categories are viewable by everyone" on public.categories for select using (true);

-- Threads: anyone can read, approved users can create, authors can update/delete
create policy "Threads are viewable by everyone" on public.threads for select using (true);
create policy "Approved users can create threads" on public.threads for insert with check (
  auth.uid() = author_id and (
    (select forum_approved from public.profiles where id = auth.uid()) = true
    or auth.email() = 'admin@axentiaai.in'
  )
);
create policy "Authors can update own threads" on public.threads for update using (auth.uid() = author_id);
create policy "Authors can delete own threads" on public.threads for delete using (auth.uid() = author_id);

-- Posts: anyone can read, approved users can create, authors can update/delete
create policy "Posts are viewable by everyone" on public.posts for select using (true);
create policy "Approved users can create posts" on public.posts for insert with check (
  auth.uid() = author_id and (
    (select forum_approved from public.profiles where id = auth.uid()) = true
    or auth.email() = 'admin@axentiaai.in'
  )
);
create policy "Authors can update own posts" on public.posts for update using (auth.uid() = author_id);
create policy "Authors can delete own posts" on public.posts for delete using (auth.uid() = author_id);

-- Reactions: anyone can read, authenticated users can create/delete their own
create policy "Reactions are viewable by everyone" on public.reactions for select using (true);
create policy "Authenticated users can react" on public.reactions for insert with check (auth.uid() = user_id);
create policy "Users can remove own reactions" on public.reactions for delete using (auth.uid() = user_id);
