export type Locale = "en" | "ar";

export type ApiPagination = {
  page: number;
  per_page: number;
  total: number;
  last_page: number;
};

export type ApiEnvelope<T> = {
  code: number;
  message: string;
  data: T;
  pagination: ApiPagination | null;
};

export type ApiValidationErrors = Record<string, string[]>;

export type ApiError = {
  status: number;
  code?: number;
  message: string;
  details?: unknown;
  validation?: ApiValidationErrors;
};

export type ActionLink = {
  label: string | null;
  url: string | null;
};

export type SettingsContacts = {
  phone: string | null;
  email: string | null;
  support_email: string | null;
  whatsapp: string | null;
};

export type SettingsSocials = {
  facebook: string | null;
  x: string | null;
  youtube: string | null;
  instagram: string | null;
  tiktok: string | null;
  linkedin: string | null;
  github: string | null;
};

export type SettingsBranding = {
  logo_url: string | null;
  logo_dark_url: string | null;
  favicon_url: string | null;
  profile_image_url: string | null;
  resume_url: string | null;
};

export type SettingsSeo = {
  keywords: string[];
  description: string | null;
  default_og_image_url: string | null;
};

export type PortfolioSettings = {
  site_name: string | null;
  site_title: string | null;
  site_description: string | null;
  site_address: string | null;
  contacts: SettingsContacts;
  socials: SettingsSocials;
  branding: SettingsBranding;
  seo: SettingsSeo;
  copyright: string | null;
  promotion_url: string | null;
};

export type NavigationItem = {
  label: string;
  href: string;
  page_key: string | null;
  target: string;
  icon: string | null;
};

export type NavigationPayload = {
  items: NavigationItem[];
  filters: null;
  summary: {
    total_items: number;
  };
};

export type SeoPagePayload = {
  page_key: string;
  title: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[];
  og_image_url: string | null;
  canonical_url: string | null;
  robots: string | null;
  extra_meta: {
    schema: string | null;
  };
};

export type ProfilePayload = {
  full_name: string;
  headline: string;
  short_bio: string;
  long_bio: string | null;
  location: string | null;
  email: string | null;
  phone: string | null;
  availability_text: string | null;
  years_experience: number | null;
  projects_delivered: number | null;
  clients_count: number | null;
  focus_areas: string[];
  hero_badges: string[];
  primary_cta: ActionLink;
  secondary_cta: ActionLink;
  resume_url: string | null;
  profile_image_url: string | null;
};

export type AboutValue = {
  title: string;
  description: string;
};

export type HighlightItem = {
  id: number;
  title: string;
  description: string | null;
  icon: string | null;
  value: number | null;
  unit: string | null;
};

export type AboutPayload = {
  title: string | null;
  subtitle: string | null;
  summary: string | null;
  story: string | null;
  focus_areas: string[];
  values: AboutValue[];
  highlights: HighlightItem[];
  profile_image_url: string | null;
  resume_url: string | null;
};

export type HomeSectionMeta = {
  key: string | null;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  content: {
    description: string | null;
  };
  image_url: string | null;
};

export type HomeHeroStat = {
  label: string;
  value: number | null;
};

export type HomeHeroPayload = {
  eyebrow: string | null;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  badges: string[];
  primary_cta: ActionLink;
  secondary_cta: ActionLink;
  image_url: string | null;
  resume_url: string | null;
  stats: HomeHeroStat[];
};

export type HomeHighlightsPayload = HomeSectionMeta & {
  items: HighlightItem[];
};

export type ProjectLinks = {
  web: string | null;
  repository: string | null;
  case_study: string | null;
};

export type ProjectCard = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  category: string | null;
  tags: string[];
  featured: boolean;
  is_open_source: boolean;
  project_date: string | null;
  cover_image_url: string | null;
  links: ProjectLinks;
};

export type HomeFeaturedProjectsPayload = HomeSectionMeta & {
  items: ProjectCard[];
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type HomeProcessPayload = HomeSectionMeta & {
  items: ProcessStep[];
};

export type SkillItem = {
  id: number;
  title: string;
  subtitle: string | null;
  category: string | null;
  level_label: string | null;
  icon: string | null;
  percent: number;
  featured: boolean;
};

export type HomeSkillsShowcasePayload = HomeSectionMeta & {
  items: SkillItem[];
};

export type OpenSourceItem = {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
};

export type HomeOpenSourcePayload = HomeSectionMeta & {
  items: OpenSourceItem[];
};

export type ProjectsListFilters = {
  featured?: boolean;
  category?: string;
  tag?: string;
  page?: number;
  per_page?: number;
};

export type ProjectsListPayload = {
  items: ProjectCard[];
  filters: {
    categories: string[];
    tags: string[];
  };
  summary: {
    total_items: number;
    returned_items: number;
  };
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectGalleryItem = {
  url: string | null;
  alt: string | null;
};

export type ProjectDetailLinks = ProjectLinks & {
  google_play: string | null;
  app_store: string | null;
};

export type ProjectDetailPayload = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string | null;
  category: string | null;
  tags: string[];
  stack: string[];
  highlights: string[];
  challenges: string[];
  solutions: string[];
  metrics: ProjectMetric[];
  featured: boolean;
  is_open_source: boolean;
  client_name: string | null;
  project_date: string | null;
  cover_image_url: string | null;
  og_image_url: string | null;
  gallery: ProjectGalleryItem[];
  links: ProjectDetailLinks;
  seo: {
    title: string | null;
    description: string | null;
    keywords: string[];
  };
};

export type ExperienceItem = {
  id: number;
  role: string;
  company: string;
  summary: string | null;
  location: string | null;
  employment_type: string | null;
  company_url: string | null;
  logo_url: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  highlights: string[];
};

export type ExperiencesPayload = {
  items: ExperienceItem[];
  filters: null;
  summary: {
    total_items: number;
    current_items: number;
  };
};

export type SkillsPayload = {
  items: SkillItem[];
  filters: null;
  summary: {
    total_items: number;
    featured_items: number;
  };
};

export type EventItem = {
  id: number;
  title: string;
  type: string | null;
  date: string | null;
  location: string | null;
  description: string | null;
  url: string | null;
  cover_image_url: string | null;
  featured: boolean;
};

export type EventsPayload = {
  items: EventItem[];
  filters: null;
  summary: {
    total_items: number;
    featured_items: number;
  };
};

export type TestimonialItem = {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  badge: string | null;
  quote: string;
  avatar_url: string | null;
  featured: boolean;
};

export type TestimonialsPayload = {
  items: TestimonialItem[];
  filters: null;
  summary: {
    total_items: number;
    featured_items: number;
  };
};

export type CommentsListFilters = {
  featured?: boolean;
  page?: number;
  per_page?: number;
};

export type CommentItem = {
  id: number;
  name: string;
  role: string | null;
  comment: string;
  rating: number | null;
  avatar_url: string | null;
  source: string | null;
  featured: boolean;
  status: string;
  submitted_at: string | null;
};

export type CommentsPayload = {
  items: CommentItem[];
  filters: {
    featured: boolean | null;
  };
  summary: {
    total_items: number;
    returned_items: number;
  };
};

export type CreateCommentPayload = {
  name: string;
  email: string;
  role?: string;
  comment: string;
  rating?: number | null;
  avatar?: File | null;
  source?: string;
};

export type CreateCommentResponse = {
  id: number;
  name: string;
  role: string | null;
  comment: string;
  rating: number | null;
  avatar_url: string | null;
  source: string | null;
  featured: boolean;
  status: string;
  submitted_at: string | null;
};

export type ContactInfoSocials = {
  linkedin: string | null;
  github: string | null;
  x: string | null;
  instagram: string | null;
  whatsapp: string | null;
};

export type ContactInfoPayload = {
  title: string | null;
  subtitle: string | null;
  availability: string | null;
  office_hours: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  profile_image_url: string | null;
  resume_url: string | null;
  socials: ContactInfoSocials;
};

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest?: string;
  budget_range?: string;
  message: string;
  source?: string;
};

export type ContactResponse = {
  id: number;
  status: string;
};
