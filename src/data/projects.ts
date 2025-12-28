export type ProjectCategory = "ERP" | "CRM" | "FinTech" | "EdTech" | "Ecommerce";

export type Project = {
  id: string;
  titleKey: string;
  descKey: string;
  category: ProjectCategory;
  stack: string[];
  highlightsKey: string[];
  featured?: boolean;

  // Image path (served from /public)
  image?: string; // e.g. "/projects/afz-erp.svg"

  // Optional links (some projects may not have all of them)
  links?: {
    web?: string;
    googlePlay?: string;
    appStore?: string;
  };
};

export const projects: Project[] = [
  {
    id: "afz-erp",
    titleKey: "projects.items.afz.title",
    descKey: "projects.items.afz.desc",
    category: "ERP",
    featured: true,
    image: "/projects/afz-erp.svg",
    links: {
      web: "https://example.com",
    },
    stack: ["Laravel", "Livewire", "Spatie Translatable", "Audit Logs"],
    highlightsKey: [
      "projects.items.afz.h1",
      "projects.items.afz.h2",
      "projects.items.afz.h3",
    ],
  },
  {
    id: "brmja-crm",
    titleKey: "projects.items.crm.title",
    descKey: "projects.items.crm.desc",
    category: "CRM",
    featured: true,
    image: "/projects/crm-brmja.svg",
    links: {
      web: "https://example.com",
    },
    stack: ["Laravel", "Livewire", "Meta Webhooks", "Notifications"],
    highlightsKey: [
      "projects.items.crm.h1",
      "projects.items.crm.h2",
      "projects.items.crm.h3",
    ],
  },
  {
    id: "mecarde-wallet",
    titleKey: "projects.items.mecarde.title",
    descKey: "projects.items.mecarde.desc",
    category: "FinTech",
    featured: true,
    image: "/projects/mecarde-wallet.svg",
    links: {
      web: "https://example.com",
    },
    stack: ["Wallet", "OPay", "Providers API", "Idempotency"],
    highlightsKey: [
      "projects.items.mecarde.h1",
      "projects.items.mecarde.h2",
      "projects.items.mecarde.h3",
    ],
  },
  {
    id: "deana-edtech",
    titleKey: "projects.items.deana.title",
    descKey: "projects.items.deana.desc",
    category: "EdTech",
    image: "/projects/deana-edtech.svg",
    links: {
      web: "https://example.com",
      googlePlay: "https://play.google.com/store",
      appStore: "https://www.apple.com/app-store/",
    },
    stack: ["Laravel API", "Meet Sessions", "Time Wallet", "Ratings"],
    highlightsKey: [
      "projects.items.deana.h1",
      "projects.items.deana.h2",
      "projects.items.deana.h3",
    ],
  },
  {
    id: "react-ecommerce",
    titleKey: "projects.items.ecom.title",
    descKey: "projects.items.ecom.desc",
    category: "Ecommerce",
    image: "/projects/ecommerce-react.svg",
    links: {
      web: "https://example.com",
    },
    stack: ["React", "TypeScript", "Tailwind", "i18n", "Theming"],
    highlightsKey: [
      "projects.items.ecom.h1",
      "projects.items.ecom.h2",
      "projects.items.ecom.h3",
    ],
  },
];
