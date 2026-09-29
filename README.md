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

- `RESEND_API_KEY` — Resend API key. The contact route uses it to send mail. Submissions are not stored.
- `CONTACT_TO_EMAIL` — Inbox that receives contact form messages.
- `NEXT_PUBLIC_BOOKING_URL` — Google Calendar appointment URL. The contact iframe is embedded only when this is a real https URL.
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
