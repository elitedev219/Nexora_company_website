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
- `CONTACT_TO_EMAIL` — Inbox that receives contact form messages. Set to `techtonic.innov@gmail.com`.
- `RESEND_FROM_EMAIL` — Sender address Resend requires. It must belong to a domain verified in that Resend account. No verified domain was provided, so leave this empty until one exists. A missing key or sender makes the form show its error state. The message body is not logged or stored.
- `NEXT_PUBLIC_BOOKING_URL` — Optional Google Calendar appointment-schedule URL. When this is a real https URL, the contact section embeds it. When it is empty, visitors choose a weekday and a 30-minute start time, then open a Google Calendar event in their own account. That event invites the meeting host on Google Meet. The chosen time is not stored.
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
