export type Testimonial = {
  id: string;
  nameKey: string;
  roleKey: string;
  quoteKey: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    nameKey: "testimonials.items.t1.name",
    roleKey: "testimonials.items.t1.role",
    quoteKey: "testimonials.items.t1.quote"
  },
  {
    id: "t2",
    nameKey: "testimonials.items.t2.name",
    roleKey: "testimonials.items.t2.role",
    quoteKey: "testimonials.items.t2.quote"
  },
  {
    id: "t3",
    nameKey: "testimonials.items.t3.name",
    roleKey: "testimonials.items.t3.role",
    quoteKey: "testimonials.items.t3.quote"
  }
];
