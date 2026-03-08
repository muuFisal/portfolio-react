import { useEffect } from "react";

type Props = {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonicalPath?: string;
};

const SITE_URL = "https://mohamed-fisal.com";

export default function Seo({ title, description, keywords, image, canonicalPath }: Props) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content?: string, attr: "name" | "property" = "name") => {
      if (!content) return;
      const selector = attr === "name" ? `meta[name="${name}"]` : `meta[property="${name}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:image", image, "property");
    setMeta("twitter:card", image ? "summary_large_image" : "summary", "name");
    setMeta("twitter:title", title, "name");
    setMeta("twitter:description", description, "name");
    setMeta("twitter:image", image, "name");

    if (canonicalPath) {
      const href = canonicalPath.startsWith("http") ? canonicalPath : `${SITE_URL}${canonicalPath}`;
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = href;
    }
  }, [title, description, keywords, image, canonicalPath]);

  return null;
}
