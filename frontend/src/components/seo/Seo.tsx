import { useEffect } from "react";

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  keywords?: string[];
  structuredData?: JsonLd;
};

const SITE_NAME = "NivuGate";
const DEFAULT_IMAGE = "/images/nuvem.png";
const DEFAULT_KEYWORDS = [
  "reservas con QR",
  "sistema de reservas",
  "app de reservas",
  "check-in con QR",
  "control de acceso eventos",
  "software para eventos",
  "reservas para discotecas",
  "reservas para bares",
  "ticketing con QR",
];

function upsertMetaByName(name: string, content: string) {
  let tag = document.head.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let tag = document.head.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(url: string) {
  let tag = document.head.querySelector("link[rel='canonical']");
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", url);
}

function upsertJsonLd(structuredData?: JsonLd) {
  const id = "nivugate-jsonld";
  const current = document.head.querySelector(`script#${id}`);

  if (!structuredData) {
    if (current) current.remove();
    return;
  }

  let script = current as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(structuredData);
}

export default function Seo({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  keywords = [],
  structuredData,
}: SeoProps) {
  useEffect(() => {
    const rawSiteUrl = import.meta.env.VITE_SITE_URL as string | undefined;
    const siteUrl = rawSiteUrl?.replace(/\/+$/, "") || window.location.origin;
    const canonicalUrl = path ? new URL(path, `${siteUrl}/`).toString() : window.location.href;
    const imageUrl = new URL(image, `${siteUrl}/`).toString();
    const fullTitle = `${title} | ${SITE_NAME}`;
    const robotsValue = noindex ? "noindex, nofollow" : "index, follow";
    const mergedKeywords = Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords])).join(", ");

    document.title = fullTitle;
    document.documentElement.setAttribute("lang", "es");

    upsertMetaByName("description", description);
    upsertMetaByName("keywords", mergedKeywords);
    upsertMetaByName("robots", robotsValue);

    upsertMetaByProperty("og:site_name", SITE_NAME);
    upsertMetaByProperty("og:title", fullTitle);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:type", type);
    upsertMetaByProperty("og:url", canonicalUrl);
    upsertMetaByProperty("og:image", imageUrl);
    upsertMetaByProperty("og:locale", "es_EC");

    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", fullTitle);
    upsertMetaByName("twitter:description", description);
    upsertMetaByName("twitter:image", imageUrl);

    upsertCanonical(canonicalUrl);
    upsertJsonLd(structuredData);
  }, [description, image, keywords, noindex, path, structuredData, title, type]);

  return null;
}
