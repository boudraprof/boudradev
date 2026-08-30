# BoudraDev — Personal Portfolio

A modern (English / Arabic) personal portfolio built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **next-intl** for internationalization. It showcases projects, skills, and experience, and includes a contact form backed by MongoDB and email notifications with Cloudflare Turnstile spam protection.

## ✨ Features

- **Bilingual & RTL-aware** — Full English (`en`) and Arabic (`ar`) support with automatic locale detection via `Accept-Language` and right-to-left layout for Arabic.
- **Static & SEO optimized** — Prerendered pages, dynamic `sitemap.xml`, `robots.txt`, Open Graph / Twitter cards, JSON-LD structured data, and `hreflang` alternates.
- **Contact form** — Server Action validated with Zod, persisted to MongoDB, and emailed via Nodemailer (SMTP). Protected by Cloudflare Turnstile.
- **Modern UI** — Animated hero, timeline experience, skill grid, and project cards built with Framer Motion, GSAP, and `lucide-react` icons.
- **Analytics** — Vercel Analytics integration.
- **Production hardening** — Security headers (CSP, HSTS, X-Frame-Options, etc.) configured in `next.config.ts`.

## 🧱 Tech Stack

| Category        | Technology |
| --------------- | ---------- |
| Framework       | Next.js 16 (App Router, Turbopack) |
| UI Library      | React 19 |
| Styling         | Tailwind CSS v4, `tw-animate-css`, `clsx`, `tailwind-merge` |
| i18n            | next-intl |
| Animation       | Framer Motion, GSAP, OGL, Three.js |
| Forms / Validation | React `useActionState`, Zod |
| Database        | MongoDB via Mongoose |
| Email           | Nodemailer (SMTP) |
| Spam Protection | Cloudflare Turnstile |
| Components       | Radix UI primitives (shadcn-style `ui/` components) |
| Lint / Type     | ESLint 9 (flat config), TypeScript 5 |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ (Node 24 recommended)
- **npm** (or pnpm / yarn / bun)
- A **MongoDB** instance (Atlas or self-hosted)
- An **SMTP** provider (e.g., Brevo, Gmail App Password) for contact emails
- A **Cloudflare Turnstile** site key + secret

### Installation

```bash
# Clone the repository
git clone https://github.com/boudraprof/boudradev boudradev
cd boudradev

# Install dependencies
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `MONGODB_URI` | ✅ | MongoDB connection string used by the contact form. |
| `SMTP_HOST` | ✅ | SMTP server host (e.g., `smtp-relay.brevo.com`). |
| `SMTP_PORT` | ✅ | SMTP port. `465` uses implicit TLS; `587`/`25` use STARTTLS. |
| `SMTP_USER` | ✅ | SMTP username. |
| `SMTP_PASS` | ✅ | SMTP password / app password. |
| `FROM_EMAIL` | ✅ | Sender and admin notification address. |
| `FROM_NAME` | ⬜ | Display name for outgoing email (defaults to `BoudraDev`). |
| `CLOUDFLARE_RECAPTCHA_SECRET_KEY` | ✅ | Cloudflare Turnstile secret key (server-side verification). |
| `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` | ✅ | Cloudflare Turnstile public site key (client widget). |
| `NEXT_PUBLIC_SITE_URL` | ⬜ | Canonical site URL (e.g., `https://boudradev.space`). Defaults to `https://boudradev.space`. |

> **Note:** `BREVO_SMTP_KEY` in the example is optional and only needed if you use Brevo's API directly instead of SMTP.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to the detected locale (e.g., `/en` or `/ar`).

### Production Build

```bash
npm run build
npm run start
```

## 📜 Scripts

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Start the production server (after `build`). |
| `npm run lint` | Lint the codebase with ESLint. |

## 🗂️ Project Structure

```
boudradev/
├── messages/                 # Translation files (en.json, ar.json) + generated types
├── public/                   # Static assets (images, fonts)
├── src/
│   ├── app/
│   │   ├── [locale]/         # Localized pages, layout, not-found
│   │   │   ├── [...rest]/     # Catch-all → 404
│   │   │   └── page.tsx       # Main portfolio page
│   │   ├── opengraph-image.tsx
│   │   ├── robots.txt
│   │   ├── sitemap.ts
│   │   └── manifast.ts        # Web app manifest
│   ├── components/           # UI sections (Hero, About, Skills, Projects, …) + ui/
│   ├── i18n/                 # next-intl routing, request config, navigation
│   ├── lib/                  # actions (contact form), email, mongoose, utils, fonts
│   ├── models/               # Mongoose models (Contact)
│   ├── proxy.ts              # Next.js proxy / middleware (locale detection)
│   └── config.ts             # Runtime host/port config
├── next.config.ts            # Next.js + next-intl + security headers
├── tailwind / postcss config
└── .env.example
```

## 🌐 Internationalization

Locales are defined in `src/i18n/routing.ts` (`en` default, `ar`). Translations live in `messages/en.json` and `messages/ar.json`. The `proxy.ts` middleware detects the visitor's preferred language from the `Accept-Language` header and redirects accordingly.

## 🔒 Security

`next.config.ts` sets production security headers including a Content Security Policy (allowing `challenges.cloudflare.com` for Turnstile), `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Strict-Transport-Security`. The `poweredByHeader` is disabled.

## 🚢 Deployment

This project is optimized for **Vercel**:

1. Import the repository into Vercel.
2. Set the environment variables from `.env.example` in the Vercel project settings.
3. Deploy — the build command (`next build`) and output are detected automatically.

## 📄 License

This project is licensed under the [MIT License](LICENSE) — see the [LICENSE](LICENSE) file for details.

Copyright © 2026 Abdulsamad Boudra.
