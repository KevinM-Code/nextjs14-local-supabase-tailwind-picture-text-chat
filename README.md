
![image info](./image.png)

## Getting Started

#### 1. From the command line inside the `local-supabase-with-docker` folder copy the `.env.example` to `.env` file. Change environment variables to your preference or keep the same if you are just trying it out. Leave everything the same for quick start.

### 2. From the command line inside the `local-supabase-with-docker` folder run
`docker compose -f docker-compose.yml -f ./dev/docker-compose.dev.yml up -d`
to spin up the local Supabase instance.

### 3. Login to the local Supabase instance at `http://localhost:8000` with username `supabase` and password `this_password_is_insecure_and_should_be_updated`.

### 4. Run Create Table Script

Once logged in to the dashboard click the link on the left and go to where you can run SQL scripts and run this script below

```
create table
  public.messages (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    is_edit boolean not null default false,
    send_by text not null,
    text text not null,
    img_path text null,
    user_id uuid null,
    constraint messages_pkey primary key (id),
    constraint messages_users_fkey foreign key (user_id) references users (id) on update cascade on delete cascade
  ) tablespace pg_default;
```

### 5. Go to `Table Editor` icon on the left and select the messages table and turn on real-time. You will see it along the top.

### 6. Disable `RLS` if your just trying the app out. I will leave it to you to enable `RLS` and choose what permissions are appropiate and who (e.g. `ANON` or `AUTHENTICATED`).

### 7. Go to storage and create a bucket name `chat-pic` and click the toggle to make the permissions `public`.

### 8. Create the permissions that would allow `AUTHENTICATED` users to run `SELECT`, `INSERT` AND `DELETE` actions.

![image info](./buketsettings.png)

### 9. In storage click on `Policies` then `Other policies under storage.objects`

Create a couple of policies `INSERT Enable insert for authenticated users only` and 
`SELECT Enable read access for all users` to get you started.

### 10. Click on the `Authentication` icon on the left horizontal bar and click `Users` and create 2 or more users for the chat application.

### 11. In the command line at the root directory install packages with `bun`, `pnpm` or whatever you use.

### 12. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

[ ] fallback loading
[ ] Edit
[ ] Delete Message
[ ] Realtime listener
[ ] Pagination  

```
curl 'https://exdezzoyljbzksrsnfqc.supabase.co/rest/v1/profile?select=*' \
-H "apikey: SUPABASE_CLIENT_ANON_KEY" \
-H "Authorization: Bearer SUPABASE_CLIENT_ANON_KEY"
```
