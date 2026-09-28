# NEXORA

## Install

```bash
npm install
```

## Environment variables

Copy the example file and fill in the values. Each variable is documented in `.env.example`.

```bash
cp .env.example .env.local
```

- `RESEND_API_KEY` — Resend API key. Not used yet.
- `CONTACT_TO_EMAIL` — Inbox for contact messages. Not used yet.
- `NEXT_PUBLIC_BOOKING_URL` — Public booking page URL. The iframe is not embedded yet.
- `NEXT_PUBLIC_SITE_URL` — Canonical origin for metadata, Open Graph, and the sitemap.

## Run

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm run start
```
