import { notFound } from "next/navigation";
import { Locale, hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { clsx } from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { routing } from "@/i18n/routing";
import { roboto, kufi } from "@/lib/fonts";
import "./styles.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#101E33" },
  ],
};

export async function generateMetadata(
  props: Omit<LayoutProps<"/[locale]">, "children">
) {
  const { locale } = await props.params;
  const isArabic = locale === "ar";

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "Layout",
  });
    
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://boudradev.space";
  const siteName = "BoudraDev";
  const title = `${t("title")} - ${
    isArabic ? "مطوّر برمجيات" : "Software Developer"
  }`;
  const englishWords =   "Full stack developer, abdulsamad boudra, Software Developer full-stack, DevOps, React، Next.js، go, golang, express, TypeScript";
  
  const description = isArabic
    ? "عبدالصمد بودرة - مطوّر برمجيات متكامل متخصص في بناء تطبيقات ويب حديثة وعالية الأداء باستخدام أحدث التقنيات ." + englishWords
    : "Abdulsamad Boudra - Full Stack Software Developer specializing in building modern, high-performance web applications with React, Next.js, go, golang,  express, TypeScript, and more.";

  const keywords = isArabic
    ? [
        "مطوّر برمجيات",
        "مطوّر ويب",
        "عبد الصمد بودرة مبرمج",
        "عبد الصمد",
        "عبد الصمد مبرمج",
        "بودرة",
        "مبرمج عربي",
        "مبرمج مغربي",
        "مبرمج محترف",
        "freelance",
        "تطوير تطبيقات",
        "nodejs developer",
        "React developer",
        "React",
        "Next.js",
        "TypeScript",
        "express",
        "express.js",
        "Node.js",
        "Full Stack Developer",
        "تطوير الواجهة الأمامية",
        "تطوير الواجهة الخلفية",
        "JavaScript",
        "MongoDB",
        "PostgreSQL",
        "Hair devs",
        "Hair me",
        "Tailwind CSS",
        "عبدالصمد بودرة",
        "مبرمج مغربي",
        "برمجة الويب",
        "تطوير مواقع",
        "تطوير تطبيقات الموبايل",
        "انشاء مواقع",
        "golang",
        "BoudraDev",
        "برمجة",
        "تطوير مواقع",
        "Freelance Developer",
        "devops",
        "SaaS",
      ]
    : [
        "Software Developer",
        "freelance",
        "Web Developer",
        "Full Stack Developer",
        "React Developer",
        "Next.js Developer",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Frontend Developer",
        "Backend Developer",
        "MongoDB",
        "devops engineer",
        "PostgreSQL", 
        "Tailwind CSS",
        "Web Development",
        "Software Engineering",
        "Abdulsamad Boudra",
        "BoudraDev",
        "Portfolio",
        "SaaS",
        "Freelance Developer",
        "React Native",
        "Express.js",
        "nodejs developer",
        "React developer",
        "express",
        "golang",
        "AWS",
        "Docker",
        "CI/CD",
        "Hair devs",
        "Hair me",
      ];

  const alternateLocale = locale === "en" ? "ar" : "en";
  const currentPath = locale === "en" ? "" : `/${locale}`;

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Abdulsamad Boudra", url: baseUrl }],
    creator: "Abdulsamad Boudra",
    publisher: "BoudraDev",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: alternateLocale === "ar" ? "ar_SA" : "en_US",
      url: `${baseUrl}${currentPath}`,
      siteName,
      title,
      description,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@boudradev",
      images: [`${baseUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}${currentPath}`,
      languages: {
        en: `${baseUrl}`,
        ar: `${baseUrl}/ar`,
        "x-default": `${baseUrl}`,
      },
    },
    metadataBase: new URL(baseUrl),
    category: "technology",
    classification: "Software Development Portfolio",
    other: {
      "theme-color": "#101E33",
      "color-scheme": "dark",
    },
  };
}

export default async function Layout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  const isArabic = locale === "ar";

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://boudradev.space";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abdulsamad Boudra",
    alternateName: "عبدالصمد بودرة",
    jobTitle: isArabic ? "مطوّر برمجيات" : "Software Developer",
    description: isArabic
      ? "عبدالصمد بودرة - مطوّر برمجيات متكامل متخصص في بناء تطبيقات ويب والموبايل حديثة وعالية الأداء باستخدام React، Next.js، TypeScript والمزيد."
      : "Abdulsamad Boudra - Full Stack Software Developer specializing in building modern, high-performance web applications with React, Next.js, TypeScript, and more.",
    url: `${baseUrl}${locale === "en" ? "" : `/${locale}`}`,
    sameAs: ["https://github.com/boudraprof", "https://github.com/boudradev"],
    knowsAbout: isArabic
      ? [
          "تطوير الويب",
          "التطبيقات الموبايل",
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "MongoDB",
          "PostgreSQL",
          "JavaScript",
          "Full Stack Development",
        ]
      : [
          "Web Development",
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "MongoDB",
          "PostgreSQL",
          "JavaScript",
          "Full Stack Development",
        ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
      addressLocality: "Morocco",
    },
    alumniOf: {
      "@type": "Organization",
      name: "Software Development",
    },
  };

  return (
    <html lang={locale} dir={isArabic ? "rtl" : "ltr"}>
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Hreflang tags for proper language targeting */}
        <link rel="alternate" hrefLang="en" href={`${baseUrl}`} />
        <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar`} />
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}`} />
      </head>
      <body className={clsx(isArabic ? kufi.className : roboto.className)}>
        <NextIntlClientProvider>
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
