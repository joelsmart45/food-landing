-- Enable required extensions
create extension if not exists "pgcrypto";

-- Profiles table (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  email text,
  role text default 'customer' check (role in ('customer', 'admin', 'manager', 'order_staff', 'delivery_staff')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table if exists public.profiles enable row level security;

-- Categories
create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  image_url text,
  active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table if exists public.categories enable row level security;

-- Products
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.categories(id) on delete set null,
  sku text unique,
  name text not null,
  description text,
  price numeric(10, 2) not null check (price >= 0),
  currency text default 'NGN',
  image_url text,
  availability boolean default true,
  stock_quantity integer,
  unit text default 'piece',
  ingredients text,
  allergens text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table if exists public.products enable row level security;

-- Product options (variations, sizes, add-ons)
create table if not exists public.product_options (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade,
  name text not null,
  additional_price numeric(10, 2) default 0 check (additional_price >= 0),
  created_at timestamptz default now()
);

alter table if exists public.product_options enable row level security;

-- Delivery zones
create table if not exists public.delivery_zones (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  fee numeric(10, 2) not null default 0 check (fee >= 0),
  estimated_delivery_time text,
  active boolean default true,
  created_at timestamptz default now()
);

alter table if exists public.delivery_zones enable row level security;

-- Promotions
create table if not exists public.promotions (
  id uuid default gen_random_uuid() primary key,
  code text unique not null,
  discount_type text not null check (discount_type in ('fixed', 'percentage')),
  discount_value numeric(10, 2) not null check (discount_value > 0),
  minimum_order_amount numeric(10, 2) default 0 check (minimum_order_amount >= 0),
  usage_limit integer,
  used_count integer default 0,
  start_at timestamptz,
  end_at timestamptz,
  active boolean default true,
  created_at timestamptz default now()
);

alter table if exists public.promotions enable row level security;

-- Addresses
create table if not exists public.addresses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  recipient text not null,
  phone text not null,
  address_line text not null,
  city text not null,
  state text not null,
  instructions text,
  is_default boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table if exists public.addresses enable row level security;

-- Updated at trigger function
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  NEW.updated_at = now();
  return NEW;
end;
$$ language plpgsql;

-- Create/update triggers for profiles
drop trigger if exists update_profiles_updated_at on public.profiles;
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

-- Create/update triggers for categories
drop trigger if exists update_categories_updated_at on public.categories;
create trigger update_categories_updated_at
  before update on public.categories
  for each row execute function public.update_updated_at_column();

-- Create/update triggers for products
drop trigger if exists update_products_updated_at on public.products;
create trigger update_products_updated_at
  before update on public.products
  for each row execute function public.update_updated_at_column();

-- Create/update triggers for product_options
drop trigger if exists update_product_options_updated_at on public.product_options;
create trigger update_product_options_updated_at
  before update on public.product_options
  for each row execute function public.update_updated_at_column();

-- Create/update triggers for delivery_zones
drop trigger if exists update_delivery_zones_updated_at on public.delivery_zones;
create trigger update_delivery_zones_updated_at
  before update on public.delivery_zones
  for each row execute function public.update_updated_at_column();

-- Create/update triggers for promotions
drop trigger if exists update_promotions_updated_at on public.promotions;
create trigger update_promotions_updated_at
  before update on public.promotions
  for each row execute function public.update_updated_at_column();

-- Create/update triggers for addresses
drop trigger if exists update_addresses_updated_at on public.addresses;
create trigger update_addresses_updated_at
  before update on public.addresses
  for each row execute function public.update_updated_at_column();

-- Helper: create policy if not exists
create or replace function public.ensure_policy(
  policy_name text,
  table_name text,
  command text,
  using_expr text,
  with_check_expr text default null
) returns void as $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = table_name
      and policyname = policy_name
  ) then
    if command = 'INSERT' then
      execute format(
        'create policy %I on public.%I for %s with check (%s)',
        policy_name,
        table_name,
        command,
        coalesce(with_check_expr, 'true')
      );
    else
      execute format(
        'create policy %I on public.%I for %s using (%s)%s',
        policy_name,
        table_name,
        command,
        using_expr,
        case when with_check_expr is not null then format(' with check (%s)', with_check_expr) else '' end
      );
    end if;
  end if;
end;
$$ language plpgsql;

-- Enable RLS policies (idempotent)
select public.ensure_policy(
  'Public read access', 'categories', 'SELECT', 'true'
);
select public.ensure_policy(
  'Public read access', 'products', 'SELECT', 'active = true'
);
select public.ensure_policy(
  'Public read access', 'product_options', 'SELECT', 'true'
);
select public.ensure_policy(
  'Public read access', 'delivery_zones', 'SELECT', 'active = true'
);
select public.ensure_policy(
  'Public read access', 'promotions', 'SELECT', 'active = true'
);
select public.ensure_policy(
  'Users can manage own profile', 'profiles', 'ALL', 'auth.uid() = id'
);
select public.ensure_policy(
  'Users can manage own addresses', 'addresses', 'ALL', 'auth.uid() = user_id'
);
select public.ensure_policy(
  'Admins manage categories', 'categories', 'ALL',
  'exists (select 1 from public.profiles where id = auth.uid() and role in (''admin'', ''manager''))'
);
select public.ensure_policy(
  'Admins manage products', 'products', 'ALL',
  'exists (select 1 from public.profiles where id = auth.uid() and role in (''admin'', ''manager''))'
);
select public.ensure_policy(
  'Admins manage product options', 'product_options', 'ALL',
  'exists (select 1 from public.profiles where id = auth.uid() and role in (''admin'', ''manager''))'
);
select public.ensure_policy(
  'Admins manage delivery zones', 'delivery_zones', 'ALL',
  'exists (select 1 from public.profiles where id = auth.uid() and role in (''admin'', ''manager''))'
);
select public.ensure_policy(
  'Admins manage promotions', 'promotions', 'ALL',
  'exists (select 1 from public.profiles where id = auth.uid() and role in (''admin'', ''manager''))'
);
