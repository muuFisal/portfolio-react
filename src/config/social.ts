export type SocialLink = {
  key: string;
  label: string;
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { key: "facebook", label: "Facebook", href: "https://facebook.com/" },
  { key: "whatsapp", label: "WhatsApp", href: "https://wa.me/" },
  { key: "instagram", label: "Instagram", href: "https://instagram.com/" },
  { key: "linkedin", label: "LinkedIn", href: "https://linkedin.com/" },
  { key: "github", label: "GitHub", href: "https://github.com/" },
  { key: "behance", label: "Behance", href: "https://behance.net/" },
];
