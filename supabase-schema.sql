-- 按摩師記鐘小幫手 — Supabase 資料庫建表 SQL
-- 在 Supabase Dashboard > SQL Editor 執行

-- 1. 用戶資料表
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role text not null default 'therapist' check (role in ('admin', 'therapist')),
  permissions jsonb default '[]'::jsonb,
  commission_rate numeric default 0.5,
  active boolean default true,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can read own profile"
  on profiles for select using (auth.uid() = id);

create policy "Admins can read all profiles"
  on profiles for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can insert profiles"
  on profiles for insert with check (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can update profiles"
  on profiles for update using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- 2. 服務項目表
create table services (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  default_duration int not null,
  default_price numeric not null,
  sort_order int default 0,
  active boolean default true,
  created_at timestamptz default now()
);

alter table services enable row level security;

create policy "Anyone authenticated can read services"
  on services for select using (auth.uid() is not null);

create policy "Admins can manage services"
  on services for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- 3. 服務紀錄表
create table time_records (
  id uuid primary key default gen_random_uuid(),
  therapist_id uuid references profiles(id) not null,
  service_id uuid references services(id) not null,
  duration int not null,
  price numeric not null,
  commission numeric not null,
  note text,
  service_date date not null default current_date,
  created_at timestamptz default now()
);

alter table time_records enable row level security;

create policy "Therapists can read own records"
  on time_records for select using (auth.uid() = therapist_id);

create policy "Admins can read all records"
  on time_records for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Therapists can insert own records"
  on time_records for insert with check (auth.uid() = therapist_id);

create policy "Therapists can delete own records"
  on time_records for delete using (auth.uid() = therapist_id);

-- 4. 插入預設服務項目
insert into services (label, default_duration, default_price, sort_order) values
  ('腳底按摩', 60, 298, 1),
  ('全身按摩', 60, 398, 2),
  ('精油按摩', 60, 498, 3),
  ('淋巴排毒', 75, 580, 4),
  ('產前按摩', 60, 498, 5);

-- 5. 建立觸發器：新用戶註冊時自動建立 profile
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', 'User'), coalesce(new.raw_user_meta_data->>'role', 'therapist'));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
