# 🔖 Smart Bookmark

A modern, secure, real-time bookmark manager built using **Next.js (App
Router)** and **Supabase**.

Smart Bookmark allows users to authenticate using Google OAuth, save
their favorite links privately, and see updates instantly across
multiple tabs using real-time subscriptions.

------------------------------------------------------------------------

## 🚀 Features

-   🔐 Google OAuth Authentication (Supabase Auth)
-   🛡 Row-Level Security (RLS) for complete user privacy
-   ⚡ Real-time updates across multiple tabs
-   🧠 Server-side data fetching with Next.js App Router
-   📱 Fully responsive layout
-   ☁️ Deployed on Vercel

------------------------------------------------------------------------

## 🏗 Tech Stack

-   **Frontend:** Next.js 16 (App Router)
-   **Styling:** Tailwind CSS + shadcn/ui
-   **Backend:** Supabase (Postgres + Auth + Realtime)
-   **Language:** TypeScript
-   **Deployment:** Vercel

------------------------------------------------------------------------

## 📦 Installation

``` bash
git clone https://github.com/your-username/smart-bookmark.git
cd smart-bookmark
npm install
npm run dev
```

------------------------------------------------------------------------

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add:

    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_publishable_key

You can find these in:

Supabase Dashboard → Settings → API

------------------------------------------------------------------------

## 🗄 Database Schema

``` sql
create table public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  created_at timestamp with time zone default now()
);
```

------------------------------------------------------------------------

## 🔒 Row-Level Security (RLS)

``` sql
alter table bookmarks enable row level security;

create policy "Users can view their bookmarks"
on bookmarks
for select
using (auth.uid() = user_id);

create policy "Users can insert bookmarks"
on bookmarks
for insert
with check (auth.uid() = user_id);

create policy "Users can update their bookmarks"
on bookmarks
for update
using (auth.uid() = user_id);

create policy "Users can delete their bookmarks"
on bookmarks
for delete
using (auth.uid() = user_id);
```

------------------------------------------------------------------------

## ⚡ Enable Realtime

``` sql
alter publication supabase_realtime add table bookmarks;
alter table bookmarks replica identity full;
```

------------------------------------------------------------------------

## 🧠 Architecture Overview

### Server Side

-   Dashboard page fetches bookmarks securely using Supabase server
    client
-   Authentication verified before rendering
-   Initial bookmarks passed as props

### Client Side

-   Real-time subscription using Supabase WebSockets
-   Filtered by `user_id`
-   Handles INSERT, UPDATE, DELETE events
-   Supports multi-tab synchronization

### Security

-   Google OAuth via Supabase Auth
-   Row-Level Security policies
-   `user_id` foreign key referencing `auth.users`
-   Complete user data isolation

------------------------------------------------------------------------

## 🌍 Deployment

Deployed using **Vercel**.

1.  Push project to GitHub
2.  Import project in Vercel
3.  Add environment variables
4.  Deploy

------------------------------------------------------------------------

## 👨‍💻 Author

Akshat Jain

------------------------------------------------------------------------

## 📄 License

This project was created as part of a technical assignment.
