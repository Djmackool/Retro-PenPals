alter table public.profiles enable row level security;

drop policy if exists "public can read profiles" on public.profiles;
drop policy if exists "public can insert profiles" on public.profiles;

create policy "public can read profiles"
on public.profiles
for select
to anon, authenticated
using (true);

create policy "public can insert profiles"
on public.profiles
for insert
to anon, authenticated
with check (true);