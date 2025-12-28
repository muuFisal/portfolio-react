export type SkillGroup = {
  titleKey: string;
  items: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    titleKey: "skills.backend",
    items: [
      { name: "PHP / Laravel", level: 95 },
      { name: "REST APIs / Webhooks", level: 92 },
      { name: "Livewire", level: 90 },
      { name: "Auth / Roles & Permissions", level: 88 }
    ]
  },
  {
    titleKey: "skills.frontend",
    items: [
      { name: "React + TypeScript", level: 85 },
      { name: "Inertia", level: 80 },
      { name: "Tailwind / Bootstrap", level: 88 },
      { name: "i18n + RTL", level: 90 }
    ]
  },
  {
    titleKey: "skills.systems",
    items: [
      { name: "Wallet Systems", level: 90 },
      { name: "Payment Gateways", level: 88 },
      { name: "ERP / CRM Architecture", level: 87 },
      { name: "Audit Logs", level: 86 }
    ]
  }
];

export const toolsCloud: string[] = [
  "Laravel", "Livewire", "React", "TypeScript", "Tailwind", "MySQL",
  "Redis", "Queues", "Webhooks", "Payments", "OPay", "Meta API",
  "Spatie i18n", "Audit Logs", "Docker (Basics)", "IIS / Nginx"
];
