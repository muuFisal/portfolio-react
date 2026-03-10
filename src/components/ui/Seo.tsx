import { useEffect, useMemo } from "react";
import { useSettings } from "../../app/settings/context";
import { useSeoPageQuery } from "../../app/api/resources";
import { getCurrentLocale } from "../../app/api/client";
import { toAbsoluteUrl } from "../../utils/portfolio";

type Props = {
  pageKey?: string;
  title?: string | null;
  description?: string | null;
  keywords?: string[] | string | null;
  image?: string | null;
  canonicalPath?: string | null;
  canonicalUrl?: string | null;
  robots?: string | null;
  schema?: string | null;
  type?: "website" | "article";
};

function setMeta(name: string, content?: string, attribute: "name" | "property" = "name") {
  if (!content) {
    return;
  }

  const selector =
    attribute === "name" ? `meta[name="${name}"]` : `meta[property="${name}"]`;
  let element = document.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(href?: string) {
  if (!href) {
    return;
  }

  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

function setSchema(scriptContent?: string) {
  const scriptId = "portfolio-page-schema";
  const existing = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!scriptContent) {
    existing?.remove();
    return;
  }

  if (existing) {
    existing.textContent = scriptContent;
    return;
  }

  const script = document.createElement("script");
  script.id = scriptId;
  script.type = "application/ld+json";
  script.textContent = scriptContent;
  document.head.appendChild(script);
}

function normalizeKeywords(keywords?: string[] | string | null) {
  if (!keywords) {
    return "";
  }

  return Array.isArray(keywords) ? keywords.join(", ") : keywords;
}

export default function Seo({
  pageKey,
  title,
  description,
  keywords,
  image,
  canonicalPath,
  canonicalUrl,
  robots,
  schema,
  type = "website",
}: Props) {
  const { settings } = useSettings();
  const seoQuery = useSeoPageQuery(pageKey || "", { enabled: Boolean(pageKey) });
  const pageSeo = seoQuery.data;
  const locale = getCurrentLocale();

  const resolved = useMemo(() => {
    const resolvedTitle =
      title ||
      pageSeo?.seo_title ||
      pageSeo?.title ||
      settings?.site_title ||
      settings?.site_name ||
      "Portfolio";

    const resolvedDescription =
      description ||
      pageSeo?.seo_description ||
      settings?.seo.description ||
      settings?.site_description ||
      undefined;

    const resolvedKeywords = normalizeKeywords(
      keywords || pageSeo?.seo_keywords || settings?.seo.keywords
    );

    const resolvedImage =
      image ||
      pageSeo?.og_image_url ||
      settings?.seo.default_og_image_url ||
      settings?.branding.profile_image_url ||
      undefined;

    const resolvedCanonical =
      canonicalUrl ||
      pageSeo?.canonical_url ||
      toAbsoluteUrl(canonicalPath || window.location.pathname);

    const resolvedRobots = robots || pageSeo?.robots || "index,follow";

    const resolvedSchema = schema || pageSeo?.extra_meta.schema || null;

    return {
      title: resolvedTitle,
      description: resolvedDescription,
      keywords: resolvedKeywords,
      image: resolvedImage,
      canonical: resolvedCanonical,
      robots: resolvedRobots,
      schema: resolvedSchema,
    };
  }, [
    canonicalPath,
    canonicalUrl,
    description,
    image,
    keywords,
    pageSeo?.canonical_url,
    pageSeo?.extra_meta.schema,
    pageSeo?.og_image_url,
    pageSeo?.robots,
    pageSeo?.seo_description,
    pageSeo?.seo_keywords,
    pageSeo?.seo_title,
    pageSeo?.title,
    robots,
    schema,
    settings?.branding.profile_image_url,
    settings?.seo.default_og_image_url,
    settings?.seo.description,
    settings?.seo.keywords,
    settings?.site_description,
    settings?.site_name,
    settings?.site_title,
    title,
  ]);

  useEffect(() => {
    document.title = resolved.title;

    setMeta("description", resolved.description);
    setMeta("keywords", resolved.keywords);
    setMeta("robots", resolved.robots);
    setMeta("og:title", resolved.title, "property");
    setMeta("og:description", resolved.description, "property");
    setMeta("og:type", type, "property");
    setMeta("og:image", resolved.image, "property");
    setMeta("og:url", resolved.canonical, "property");
    setMeta("og:locale", locale === "ar" ? "ar_EG" : "en_US", "property");
    setMeta("twitter:card", resolved.image ? "summary_large_image" : "summary");
    setMeta("twitter:title", resolved.title);
    setMeta("twitter:description", resolved.description);
    setMeta("twitter:image", resolved.image);
    setCanonical(resolved.canonical);

    if (resolved.schema) {
      const schemaPayload = resolved.schema.trim().startsWith("{")
        ? resolved.schema
        : JSON.stringify({
            "@context": "https://schema.org",
            "@type": resolved.schema,
            name: resolved.title,
            description: resolved.description,
            url: resolved.canonical,
          });
      setSchema(schemaPayload);
      return;
    }

    setSchema(undefined);
  }, [
    locale,
    resolved.canonical,
    resolved.description,
    resolved.image,
    resolved.keywords,
    resolved.robots,
    resolved.schema,
    resolved.title,
    type,
  ]);

  return null;
}
