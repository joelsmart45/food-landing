-- Carts
create table if not exists public.carts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  session_id text,
  updated_at timestamptz default now()
);

alter table if exists public.carts enable row level security;

-- Cart items
create table if not exists public.cart_items (
  id uuid default gen_random_uuid() primary key,
  cart_id uuid references public.carts(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  product_option_id uuid references public.product_options(id) on delete set null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price numeric(10, 2) not null check (unit_price >= 0),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table if exists public.cart_items enable row level security;

-- Orders
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  order_reference text unique not null,
  user_id uuid references public.profiles(id) on delete set null,
  status text not null default 'pending_payment' check (status in (
    'pending_payment', 'order_received', 'confirmed', 'preparing',
    'ready_for_pickup', 'out_for_delivery', 'delivered', 'cancelled', 'refunded'
  )),
  subtotal numeric(10, 2) not null check (subtotal >= 0),
  delivery_fee numeric(10, 2) not null default 0 check (delivery_fee >= 0),
  discount numeric(10, 2) not null default 0 check (discount >= 0),
  total numeric(10, 2) not null check (total >= 0),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  delivery_method text not null check (delivery_method in ('delivery', 'pickup')),
  delivery_address_id uuid references public.addresses(id) on delete set null,
  delivery_instructions text,
  preferred_delivery_at timestamptz,
  payment_method text,
  payment_reference text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table if exists public.orders enable row level security;

-- Order items
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name_snapshot text not null,
  unit_price numeric(10, 2) not null check (unit_price >= 0),
  quantity integer not null default 1 check (quantity > 0),
  options jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

alter table if exists public.order_items enable row level security;

-- Payments
create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  provider text not null,
  provider_reference text,
  amount numeric(10, 2) not null check (amount >= 0),
  currency text default 'NGN',
  status text not null default 'pending' check (status in ('pending', 'success', 'failed', 'refunded')),
  paid_at timestamptz,
  created_at timestamptz default now()
);

alter table if exists public.payments enable row level security;

-- Notifications
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  channel text not null check (channel in ('email', 'sms', 'whatsapp')),
  status text not null default 'pending' check (status in ('pending', 'sent', 'failed')),
  sent_at timestamptz,
  created_at timestamptz default now()
);

alter table if exists public.notifications enable row level security;

-- Create/update triggers for carts
drop trigger if exists update_carts_updated_at on public.carts;
create trigger update_carts_updated_at
  before update on public.carts
  for each row execute function public.update_updated_at_column();

-- Create/update triggers for cart_items
drop trigger if exists update_cart_items_updated_at on public.cart_items;
create trigger update_cart_items_updated_at
  before update on public.cart_items
  for each row execute function public.update_updated_at_column();

-- Create/update triggers for orders
drop trigger if exists update_orders_updated_at on public.orders;
create trigger update_orders_updated_at
  before update on public.orders
  for each row execute function public.update_updated_at_column();

-- Create/update triggers for order_items
drop trigger if exists update_order_items_updated_at on public.order_items;
create trigger update_order_items_updated_at
  before update on public.order_items
  for each row execute function public.update_updated_at_column();

-- Create/update triggers for payments
drop trigger if exists update_payments_updated_at on public.payments;
create trigger update_payments_updated_at
  before update on public.payments
  for each row execute function public.update_updated_at_column();

-- Create/update triggers for notifications
drop trigger if exists update_notifications_updated_at on public.notifications;
create trigger update_notifications_updated_at
  before update on public.notifications
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

-- RLS policies for orders (idempotent)
select public.ensure_policy(
  'Users can read own orders', 'orders', 'SELECT', 'auth.uid() = user_id'
);
select public.ensure_policy(
  'Users can create own orders', 'orders', 'INSERT', 'true', 'auth.uid() = user_id'
);
select public.ensure_policy(
  'Staff can manage orders', 'orders', 'ALL',
  'exists (select 1 from public.profiles where id = auth.uid() and role in (''admin'', ''manager'', ''order_staff'', ''delivery_staff''))'
);

select public.ensure_policy(
  'Users can read own order items', 'order_items', 'SELECT',
  'exists (select 1 from public.orders where id = order_id and user_id = auth.uid())'
);
select public.ensure_policy(
  'Staff can manage order items', 'order_items', 'ALL',
  'exists (select 1 from public.profiles where id = auth.uid() and role in (''admin'', ''manager'', ''order_staff''))'
);

select public.ensure_policy(
  'Users can read own carts', 'carts', 'SELECT',
  'auth.uid() = user_id or session_id = (select current_setting(''app.session_id'', true))'
);
select public.ensure_policy(
  'Users can manage own carts', 'carts', 'ALL',
  'auth.uid() = user_id or session_id = (select current_setting(''app.session_id'', true))'
);

select public.ensure_policy(
  'Users can read own cart items', 'cart_items', 'SELECT',
  'exists (select 1 from public.carts where id = cart_id and (' ||
  'auth.uid() = user_id or session_id = (select current_setting(''app.session_id'', true))' ||
  '))'
);
select public.ensure_policy(
  'Users can manage own cart items', 'cart_items', 'ALL',
  'exists (select 1 from public.carts where id = cart_id and (' ||
  'auth.uid() = user_id or session_id = (select current_setting(''app.session_id'', true))' ||
  '))'
);

select public.ensure_policy(
  'Users can read own payments', 'payments', 'SELECT',
  'exists (select 1 from public.orders where id = order_id and user_id = auth.uid())'
);
select public.ensure_policy(
  'Staff can manage payments', 'payments', 'ALL',
  'exists (select 1 from public.profiles where id = auth.uid() and role in (''admin'', ''manager''))'
);

select public.ensure_policy(
  'Users can read own notifications', 'notifications', 'SELECT', 'auth.uid() = user_id'
);

select public.ensure_policy(
  'Admins manage carts', 'carts', 'ALL',
  'exists (select 1 from public.profiles where id = auth.uid() and role in (''admin'', ''manager''))'
);
select public.ensure_policy(
  'Admins manage cart items', 'cart_items', 'ALL',
  'exists (select 1 from public.profiles where id = auth.uid() and role in (''admin'', ''manager''))'
);

-- Order reference generation helper
create or replace function public.generate_order_reference()
returns text as $$
declare
  ref text;
begin
  loop
    ref := 'FB' || to_char(now(), 'YYMMDD') || lpad(floor(random() * 10000)::int::text, 4, '0');
    exit when not exists (select 1 from public.orders where order_reference = ref);
  end loop;
  return ref;
end;
$$ language plpgsql;
