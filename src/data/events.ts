export type EventItem = {
  id: string;
  titleKey: string;
  descKey: string;
  year: string;
  type: "Talk" | "Release" | "Milestone";
};

export const events: EventItem[] = [
  {
    id: "e1",
    titleKey: "events.items.e1.title",
    descKey: "events.items.e1.desc",
    year: "2025",
    type: "Milestone"
  },
  {
    id: "e2",
    titleKey: "events.items.e2.title",
    descKey: "events.items.e2.desc",
    year: "2025",
    type: "Release"
  },
  {
    id: "e3",
    titleKey: "events.items.e3.title",
    descKey: "events.items.e3.desc",
    year: "2024",
    type: "Milestone"
  }
];
