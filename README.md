<div align="center">

# ✦ BoudraDev

### Personal Portfolio — Built for Performance, Crafted for Clarity

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>

> A **bilingual (English / Arabic)** portfolio website showcasing projects, skills, and experience — with a fully functional contact form, server-side email delivery, and enterprise-grade security headers.

<br/>

[🔴 Live Demo](https://boudradev.vercel.app/en) · [📬 Contact](https://boudradev.vercel.app/en#contact) · [🐛 Report Bug](../../issues) · [💡 Request Feature](../../issues)

</div>

---

## ✨ Features

| Feature | Details |
|---|---|
| 🌍 **Bilingual & RTL** | Full **English** + **Arabic** support. Locale auto-detected from `Accept-Language`. Arabic renders with a true right-to-left layout. |
| ⚡ **Performance-first** | Static pre-rendering via Next.js App Router. Optimized fonts, images, and bundle splitting. |
| 🔍 **SEO-complete** | Dynamic `sitemap.xml`, `robots.txt`, Open Graph, Twitter cards, JSON-LD structured data, and `hreflang` alternates. |
| 📬 **Contact Form** | Server Action with Zod validation, Nodemailer SMTP delivery, and real-time success/error feedback — email confirmation gated. |
| 🛡️ **Spam Protection** | Cloudflare Turnstile widget with server-side token verification. |
| 🎨 **Rich Animations** | Framer Motion transitions, GSAP scroll effects, Three.js / OGL WebGL backgrounds. |
| 📊 **Analytics** | Vercel Analytics — zero-config, privacy-first. |
| 🔒 **Security Headers** | CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` — all configured in `next.config.ts`. |

---

## 🧱 Tech Stack

<details>
<summary><strong>Click to expand full stack</strong></summary>

<br/>

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) — App Router + Turbopack |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), `tw-animate-css`, `clsx`, `tailwind-merge` |
| **i18n** | [next-intl](https://next-intl-docs.vercel.app/) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/), [OGL](https://github.com/oframe/ogl), [Three.js](https://threejs.org/) |
| **Forms** | React `useActionState`, [Zod](https://zod.dev/) |
| **Email** | [Nodemailer](https://nodemailer.com/) over SMTP (Gmail / Brevo) |
| **Spam Guard** | [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) |
| **Components** | [Radix UI](https://www.radix-ui.com/) primitives (shadcn-style) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) |
| **Linting** | ESLint 9 (flat config) |
| **Deployment** | [Vercel](https://vercel.com/) |

</details>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `20+` (Node 24 recommended)
- **npm** / pnpm / yarn / bun
- An **SMTP** provider — Gmail App Password or [Brevo](https://www.brevo.com/)
- A **Cloudflare Turnstile** site key + secret key → [Get one free](https://dash.cloudflare.com/?to=/:account/turnstile)

### 1 — Clone & Install

```bash
git clone <your-repo-url> boudradev
cd boudradev
npm install
```

### 2 — Configure Environment Variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the required values:

| Variable | Required | Description |
|---|---|---|
| `SMTP_HOST` | ✅ | SMTP server host (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | ✅ | `465` (SSL) or `587` (STARTTLS) |
| `SMTP_USER` | ✅ | SMTP username / Gmail address |
| `SMTP_PASS` | ✅ | SMTP password or Gmail App Password |
| `FROM_EMAIL` | ✅ | Sender address + admin notification recipient |
| `FROM_NAME` | ⬜ | Display name for outgoing emails (default: `BoudraDev`) |
| `CLOUDFLARE_RECAPTCHA_SECRET_KEY` | ✅ | Turnstile **secret** key (server-side) |
| `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` | ✅ | Turnstile **site** key (client widget) |
| `NEXT_PUBLIC_SITE_URL` | ⬜ | Canonical URL (e.g. `https://boudradev.space`) |

> **Gmail users:** Create an [App Password](https://myaccount.google.com/apppasswords) — your regular password will not work with SMTP.

### 3 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the middleware auto-redirects to your detected locale (`/en` or `/ar`).

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server (run `build` first) |
| `npm run lint` | Lint the entire codebase with ESLint 9 |

---

## 🗂️ Project Structure

```
boudradev/
├── messages/                    # i18n translation files
│   ├── en.json                  #   → English strings
│   └── ar.json                  #   → Arabic strings
│
├── public/                      # Static assets (images, fonts, icons)
│
├── src/
│   ├── app/
│   │   ├── [locale]/            # Localized route group
│   │   │   ├── [...rest]/       #   → Catch-all → 404 page
│   │   │   ├── layout.tsx       #   → Root layout (fonts, providers)
│   │   │   ├── not-found.tsx    #   → 404 component
│   │   │   └── page.tsx         #   → Main portfolio page
│   │   ├── layout.tsx           # Root layout (html / body)
│   │   ├── manifast.ts          # Web app manifest
│   │   ├── robots.txt           # robots.txt generation
│   │   └── sitemap.ts           # Dynamic sitemap generation
│   │
│   ├── components/              # All UI components
│   │   ├── Hero.tsx             # Animated hero section + WebGL
│   │   ├── About.tsx            # About / bio section
│   │   ├── Skills.tsx           # Skills grid
│   │   ├── Experience.tsx       # Timeline experience section
│   │   ├── Projects.tsx         # Project cards
│   │   ├── Contact.tsx          # Contact form (Server Action)
│   │   ├── Footer.tsx           # Site footer
│   │   ├── Turnstile.tsx        # Cloudflare Turnstile widget
│   │   ├── TextType.tsx         # Typewriter animation
│   │   ├── LetterGlitch.tsx     # Glitch text effect
│   │   ├── LocaleSwitcher.tsx   # Language toggle
│   │   └── ui/                  # Radix-based primitive components
│   │
│   ├── i18n/                    # next-intl routing & request config
│   ├── lib/
│   │   ├── actions.ts           # Contact form Server Action (Zod + email)
│   │   ├── email.ts             # Nodemailer — admin + welcome email
│   │   ├── fonts.ts             # Next.js font optimization setup
│   │   └── utils.ts             # Shared utilities
│   │
│   ├── proxy.ts                 # Middleware — locale detection & redirect
│   └── config.ts                # Runtime host / port configuration
│
├── next.config.ts               # Next.js config + security headers
├── tailwind.config / postcss    # Tailwind v4 setup
├── tsconfig.json
└── .env.example                 # Environment variable template
```

---

## 🌐 Internationalization

Routing is handled by **next-intl**. Supported locales:

| Code | Language | Direction |
|---|---|---|
| `en` | English | LTR (default) |
| `ar` | Arabic | RTL |

The `proxy.ts` middleware reads the `Accept-Language` header on first visit and redirects to the matching locale prefix (`/en` or `/ar`). Translation strings live in `messages/*.json`.

---

## 📬 Contact Form Flow

```
User submits form
      │
      ▼
Cloudflare Turnstile token verified (server-side)
      │
      ▼
Zod schema validation (name, email, message)
      │
      ▼
Nodemailer → Admin notification email
      │
      ▼
Nodemailer → Welcome email to user (locale-aware: EN / AR)
      │
      ├─ Both sent  → ✅ Success message shown to user
      └─ Any fails  → ❌ Error message shown to user
```

No database is involved — the form is fully stateless.

---

## 🔒 Security

All production responses include the following headers (configured in `next.config.ts`):

| Header | Value |
|---|---|
| `Content-Security-Policy` | Restricts scripts, styles, frames — allows `challenges.cloudflare.com` for Turnstile |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `X-Powered-By` | Disabled |

---

## 🚢 Deployment

### Vercel (Recommended)

1. Import the repository into [Vercel](https://vercel.com/new)
2. Add all required environment variables in **Project Settings → Environment Variables**
3. Deploy — Next.js is auto-detected, no extra config needed

### Self-hosted (Node.js)

```bash
npm run build
npm run start          # Runs on port 3000 by default
```

Put it behind **Nginx** or **Caddy** with TLS for production.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

Released under the [MIT License](LICENSE).

Copyright © 2026 **Abdulsamad Boudra** — [boudradev.vercel.app](https://boudradev.vercel.app/en)

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://boudradev.vercel.app/en">Abdulsamad Boudra</a></sub>
</div>
