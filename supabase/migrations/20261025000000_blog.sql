create schema if not exists private;
grant usage on schema private to authenticated;

create or replace function private.is_owner() returns boolean
language sql stable set search_path = '' as $$
  select coalesce((select auth.uid()) = '5adbbb8f-27cd-4ddd-9e63-4955eaecde3f'::uuid, false)
$$;
revoke execute on function private.is_owner() from public, anon;
grant execute on function private.is_owner() to authenticated;

create or replace function private.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create table public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique
               check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 100),
  title        text not null default '' check (char_length(title) <= 200),
  excerpt      text check (char_length(excerpt) <= 500),
  content      jsonb not null default '{"type":"doc","content":[{"type":"paragraph"}]}',
  cover_image  text,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  word_count   integer not null default 0 check (word_count >= 0),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint posts_published_has_date check (status = 'draft' or published_at is not null)
);

create index posts_published_idx on public.posts (published_at desc)
  where status = 'published';

create trigger posts_set_updated_at before update on public.posts
  for each row execute function private.set_updated_at();

grant select on public.posts to anon;
grant select, insert, update, delete on public.posts to authenticated, service_role;

alter table public.posts enable row level security;

create policy "Published posts are public" on public.posts
  for select to anon, authenticated using (status = 'published');
create policy "Owner reads all" on public.posts
  for select to authenticated using ((select private.is_owner()));
create policy "Owner inserts" on public.posts
  for insert to authenticated with check ((select private.is_owner()));
create policy "Owner updates" on public.posts
  for update to authenticated
  using ((select private.is_owner())) with check ((select private.is_owner()));
create policy "Owner deletes" on public.posts
  for delete to authenticated using ((select private.is_owner()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images', 'blog-images', true, 5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "blog-images owner select" on storage.objects
  for select to authenticated
  using (bucket_id = 'blog-images' and (select private.is_owner()));
create policy "blog-images owner insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'blog-images' and (select private.is_owner()));
create policy "blog-images owner update" on storage.objects
  for update to authenticated
  using (bucket_id = 'blog-images' and (select private.is_owner()))
  with check (bucket_id = 'blog-images' and (select private.is_owner()));
create policy "blog-images owner delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'blog-images' and (select private.is_owner()));
