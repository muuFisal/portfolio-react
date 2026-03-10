# Portfolio API Endpoints

Base URL: `/api/v1/portfolio`

## Global Rules

- `Accept-Language`: `en` or `ar`
- All responses include:
  - `code`
  - `message`
  - `data`
  - `pagination`
- All image and file fields return full URLs.
- Non-paginated endpoints return `"pagination": null`
- Paginated endpoints return:

```json
{
  "page": 1,
  "per_page": 10,
  "total": 100,
  "last_page": 10
}
```

---

## GET `/settings`

Purpose: Get global portfolio settings, contacts, socials, branding, and default SEO values.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.site_name` -> string|null
- `data.site_title` -> string|null
- `data.site_description` -> string|null
- `data.site_address` -> string|null
- `data.contacts` -> object
- `data.contacts.phone` -> string|null
- `data.contacts.email` -> string|null
- `data.contacts.support_email` -> string|null
- `data.contacts.whatsapp` -> string|null
- `data.socials` -> object
- `data.socials.facebook` -> string|null
- `data.socials.x` -> string|null
- `data.socials.youtube` -> string|null
- `data.socials.instagram` -> string|null
- `data.socials.tiktok` -> string|null
- `data.socials.linkedin` -> string|null
- `data.socials.github` -> string|null
- `data.branding` -> object
- `data.branding.logo_url` -> string|null
- `data.branding.logo_dark_url` -> string|null
- `data.branding.favicon_url` -> string|null
- `data.branding.profile_image_url` -> string|null
- `data.branding.resume_url` -> string|null
- `data.seo` -> object
- `data.seo.keywords` -> array
- `data.seo.keywords[]` -> string
- `data.seo.description` -> string|null
- `data.seo.default_og_image_url` -> string|null
- `data.copyright` -> string|null
- `data.promotion_url` -> string|null
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "site_name": "Fisal Portfolio",
    "site_title": "Mohamed Fisal | Backend & Full-Stack Engineer",
    "site_description": "Portfolio backend for Mohamed Fisal with projects, experience, testimonials, and contact channels.",
    "site_address": "Cairo, Egypt",
    "contacts": {
      "phone": "+20 100 000 0000",
      "email": "hello@fisal.dev",
      "support_email": "support@fisal.dev",
      "whatsapp": "https://wa.me/201000000000"
    },
    "socials": {
      "facebook": "https://facebook.com/fisal.dev",
      "x": "https://x.com/fisaldev",
      "youtube": "https://youtube.com/@fisaldev",
      "instagram": "https://instagram.com/fisal.dev",
      "tiktok": "https://tiktok.com/@fisaldev",
      "linkedin": "https://linkedin.com/in/fisaldev",
      "github": "https://github.com/fisaldev"
    },
    "branding": {
      "logo_url": "http://localhost/uploads/images/logo.png",
      "logo_dark_url": "http://localhost/uploads/images/logo_white.png",
      "favicon_url": "http://localhost/uploads/images/logo.png",
      "profile_image_url": "http://localhost/uploads/users/1758033097_68c974c9d8ca5_about_2.jpg",
      "resume_url": null
    },
    "seo": {
      "keywords": [
        "Mohamed Fisal",
        "Laravel",
        "PHP",
        "Portfolio",
        "Backend Developer"
      ],
      "description": "Mohamed Fisal portfolio API serving profile, case studies, testimonials, and contact details.",
      "default_og_image_url": "http://localhost/uploads/images/Frame%202087326965.png"
    },
    "copyright": "Copyright 2026 Mohamed Fisal. All rights reserved.",
    "promotion_url": "https://brmja.tech"
  },
  "pagination": null
}
```

---

## GET `/navigation`

Purpose: Get active navigation items.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.items` -> array
- `data.items[].label` -> string
- `data.items[].href` -> string
- `data.items[].page_key` -> string|null
- `data.items[].target` -> string
- `data.items[].icon` -> string|null
- `data.filters` -> null
- `data.summary` -> object
- `data.summary.total_items` -> integer
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "items": [
      {
        "label": "Home",
        "href": "/",
        "page_key": "home",
        "target": "_self",
        "icon": "home"
      },
      {
        "label": "About",
        "href": "/about",
        "page_key": "about",
        "target": "_self",
        "icon": "user"
      }
    ],
    "filters": null,
    "summary": {
      "total_items": 4
    }
  },
  "pagination": null
}
```

---

## GET `/seo/pages/{pageKey}`

Purpose: Get SEO data for a page key such as `home`, `about`, `projects`, or `contact`.

Query Parameters: None

Request Body: None

Validation: `pageKey` must exist in `portfolio_pages.page_key`

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.page_key` -> string
- `data.title` -> string|null
- `data.seo_title` -> string|null
- `data.seo_description` -> string|null
- `data.seo_keywords` -> array
- `data.seo_keywords[]` -> string
- `data.og_image_url` -> string|null
- `data.canonical_url` -> string|null
- `data.robots` -> string|null
- `data.extra_meta` -> object
- `data.extra_meta.schema` -> string|null
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "page_key": "projects",
    "title": "Projects",
    "seo_title": "Projects by Mohamed Fisal",
    "seo_description": "Selected portfolio projects.",
    "seo_keywords": [
      "projects",
      "case-study"
    ],
    "og_image_url": "http://localhost/uploads/images/Frame%202087326965.png",
    "canonical_url": "https://portfolio.brmja.tech/projects",
    "robots": "index,follow",
    "extra_meta": {
      "schema": "CollectionPage"
    }
  },
  "pagination": null
}
```

---

## GET `/profile`

Purpose: Get the main profile payload.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.full_name` -> string
- `data.headline` -> string
- `data.short_bio` -> string
- `data.long_bio` -> string|null
- `data.location` -> string|null
- `data.email` -> string|null
- `data.phone` -> string|null
- `data.availability_text` -> string|null
- `data.years_experience` -> integer|null
- `data.projects_delivered` -> integer|null
- `data.clients_count` -> integer|null
- `data.focus_areas` -> array
- `data.focus_areas[]` -> string
- `data.hero_badges` -> array
- `data.hero_badges[]` -> string
- `data.primary_cta` -> object
- `data.primary_cta.label` -> string|null
- `data.primary_cta.url` -> string|null
- `data.secondary_cta` -> object
- `data.secondary_cta.label` -> string|null
- `data.secondary_cta.url` -> string|null
- `data.resume_url` -> string|null
- `data.profile_image_url` -> string|null
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "full_name": "Mohamed Fisal",
    "headline": "Backend engineer shipping APIs, dashboards, and integrations.",
    "short_bio": "Laravel-focused with strong API contracts and practical frontend collaboration.",
    "long_bio": "I build maintainable backend systems with clear response shapes and real delivery discipline.",
    "location": "Cairo, Egypt",
    "email": "hello@fisal.dev",
    "phone": "+20 100 000 0000",
    "availability_text": "Available for freelance and product work.",
    "years_experience": 4,
    "projects_delivered": 24,
    "clients_count": 12,
    "focus_areas": [
      "Laravel APIs",
      "Payments",
      "Dashboards"
    ],
    "hero_badges": [
      "Laravel",
      "REST APIs",
      "React-ready"
    ],
    "primary_cta": {
      "label": "View Projects",
      "url": "/projects"
    },
    "secondary_cta": {
      "label": "Contact Me",
      "url": "/contact"
    },
    "resume_url": null,
    "profile_image_url": "http://localhost/uploads/users/1758033097_68c974c9d8ca5_about_2.jpg"
  },
  "pagination": null
}
```

---

## GET `/about`

Purpose: Get the about page payload.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.title` -> string|null
- `data.subtitle` -> string|null
- `data.summary` -> string|null
- `data.story` -> string|null
- `data.focus_areas` -> array
- `data.focus_areas[]` -> string
- `data.values` -> array
- `data.values[].title` -> string
- `data.values[].description` -> string
- `data.highlights` -> array
- `data.highlights[].id` -> integer
- `data.highlights[].title` -> string
- `data.highlights[].description` -> string|null
- `data.highlights[].icon` -> string|null
- `data.highlights[].value` -> integer|null
- `data.highlights[].unit` -> string|null
- `data.profile_image_url` -> string|null
- `data.resume_url` -> string|null
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "title": "About Me",
    "subtitle": "Engineer, collaborator, and product-minded builder.",
    "summary": "Laravel-focused with strong API contracts and practical frontend collaboration.",
    "story": "I care about clarity, maintainability, and frontend-ready APIs.",
    "focus_areas": [
      "Laravel APIs",
      "Payments",
      "Dashboards"
    ],
    "values": [
      {
        "title": "Ownership",
        "description": "From requirements to post-release fixes."
      },
      {
        "title": "Communication",
        "description": "Backend constraints translated into frontend decisions."
      }
    ],
    "highlights": [
      {
        "id": 1,
        "title": "Completed Projects",
        "description": "Delivered work across dashboards and integrations.",
        "icon": "briefcase",
        "value": 24,
        "unit": "+"
      }
    ],
    "profile_image_url": "http://localhost/uploads/users/1758033097_68c974c9d8ca5_about_2.jpg",
    "resume_url": null
  },
  "pagination": null
}
```

---

## GET `/home/hero`

Purpose: Get hero section content.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.eyebrow` -> string|null
- `data.title` -> string|null
- `data.subtitle` -> string|null
- `data.description` -> string|null
- `data.badges` -> array
- `data.badges[]` -> string
- `data.primary_cta` -> object
- `data.primary_cta.label` -> string|null
- `data.primary_cta.url` -> string|null
- `data.secondary_cta` -> object
- `data.secondary_cta.label` -> string|null
- `data.secondary_cta.url` -> string|null
- `data.image_url` -> string|null
- `data.resume_url` -> string|null
- `data.stats` -> array
- `data.stats[].label` -> string
- `data.stats[].value` -> integer|null
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "eyebrow": "Mohamed Fisal",
    "title": "Backend systems with product discipline.",
    "subtitle": "Laravel, APIs, dashboards, and integrations built for reliable delivery.",
    "description": "I build backend infrastructure that frontend teams can integrate with quickly.",
    "badges": [
      "Laravel",
      "REST APIs",
      "React-ready"
    ],
    "primary_cta": {
      "label": "View Projects",
      "url": "/projects"
    },
    "secondary_cta": {
      "label": "Contact Me",
      "url": "/contact"
    },
    "image_url": "http://localhost/uploads/users/1758033097_68c974c9d8ca5_about_2.jpg",
    "resume_url": null,
    "stats": [
      {
        "label": "years_experience",
        "value": 4
      },
      {
        "label": "projects_delivered",
        "value": 24
      },
      {
        "label": "clients_count",
        "value": 12
      }
    ]
  },
  "pagination": null
}
```

---

## GET `/home/highlights`

Purpose: Get highlight section metadata and highlight items.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.key` -> string|null
- `data.title` -> string|null
- `data.subtitle` -> string|null
- `data.description` -> string|null
- `data.content` -> object
- `data.content.description` -> string|null
- `data.items` -> array
- `data.items[].id` -> integer
- `data.items[].title` -> string
- `data.items[].description` -> string|null
- `data.items[].icon` -> string|null
- `data.items[].value` -> integer|null
- `data.items[].unit` -> string|null
- `data.image_url` -> string|null
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "key": "home.highlights",
    "title": "Highlights",
    "subtitle": "A quick summary of shipped work.",
    "description": "Numbers across products, dashboards, and integrations.",
    "content": {
      "description": "Numbers across products, dashboards, and integrations."
    },
    "items": [
      {
        "id": 1,
        "title": "Completed Projects",
        "description": "Delivered work across dashboards and integrations.",
        "icon": "briefcase",
        "value": 24,
        "unit": "+"
      }
    ],
    "image_url": null
  },
  "pagination": null
}
```

---

## GET `/home/featured-projects`

Purpose: Get featured projects section metadata and project cards.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.key` -> string|null
- `data.title` -> string|null
- `data.subtitle` -> string|null
- `data.description` -> string|null
- `data.content` -> object
- `data.content.description` -> string|null
- `data.items` -> array
- `data.items[].id` -> integer
- `data.items[].slug` -> string
- `data.items[].title` -> string
- `data.items[].summary` -> string
- `data.items[].category` -> string|null
- `data.items[].tags` -> array
- `data.items[].tags[]` -> string
- `data.items[].featured` -> boolean
- `data.items[].is_open_source` -> boolean
- `data.items[].project_date` -> string|null
- `data.items[].cover_image_url` -> string|null
- `data.items[].links` -> object
- `data.items[].links.web` -> string|null
- `data.items[].links.repository` -> string|null
- `data.items[].links.case_study` -> string|null
- `data.image_url` -> string|null
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "key": "home.featured_projects",
    "title": "Featured Projects",
    "subtitle": "Selected builds with strong backend stories.",
    "description": "Most relevant work for product teams.",
    "content": {
      "description": "Most relevant work for product teams."
    },
    "items": [
      {
        "id": 1,
        "slug": "merchant-core-platform",
        "title": "Merchant Core Platform",
        "summary": "Laravel merchant platform for products, orders, and dashboards.",
        "category": "web",
        "tags": [
          "laravel",
          "dashboard",
          "mysql"
        ],
        "featured": true,
        "is_open_source": false,
        "project_date": "2025-09-01",
        "cover_image_url": "http://localhost/uploads/images/logo.png",
        "links": {
          "web": "https://merchant.example.com",
          "repository": null,
          "case_study": "https://portfolio.brmja.tech/projects/merchant-core-platform"
        }
      }
    ],
    "image_url": null
  },
  "pagination": null
}
```

---

## GET `/home/process`

Purpose: Get process section metadata and steps.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.key` -> string|null
- `data.title` -> string|null
- `data.subtitle` -> string|null
- `data.description` -> string|null
- `data.content` -> object
- `data.content.description` -> string|null
- `data.items` -> array
- `data.items[].step` -> string
- `data.items[].title` -> string
- `data.items[].description` -> string
- `data.image_url` -> string|null
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "key": "home.process",
    "title": "How I Work",
    "subtitle": "A delivery process tuned for clarity.",
    "description": "Each phase keeps technical decisions visible.",
    "content": {
      "description": "Each phase keeps technical decisions visible."
    },
    "items": [
      {
        "step": "01",
        "title": "Clarify scope",
        "description": "Agree on use cases and response shapes first."
      },
      {
        "step": "02",
        "title": "Model data",
        "description": "Shape schema and relations early."
      },
      {
        "step": "03",
        "title": "Ship safely",
        "description": "Verify behavior and document assumptions."
      }
    ],
    "image_url": null
  },
  "pagination": null
}
```

---

## GET `/home/skills-showcase`

Purpose: Get skills showcase section metadata and featured skills.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.key` -> string|null
- `data.title` -> string|null
- `data.subtitle` -> string|null
- `data.description` -> string|null
- `data.content` -> object
- `data.content.description` -> string|null
- `data.items` -> array
- `data.items[].id` -> integer
- `data.items[].title` -> string
- `data.items[].subtitle` -> string|null
- `data.items[].category` -> string|null
- `data.items[].level_label` -> string|null
- `data.items[].icon` -> string|null
- `data.items[].percent` -> integer
- `data.items[].featured` -> boolean
- `data.image_url` -> string|null
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "key": "home.skills_showcase",
    "title": "Skills Showcase",
    "subtitle": "Core strengths used repeatedly in production.",
    "description": "Backend, integrations, and delivery discipline.",
    "content": {
      "description": "Backend, integrations, and delivery discipline."
    },
    "items": [
      {
        "id": 1,
        "title": "Backend Engineering",
        "subtitle": "Laravel / PHP",
        "category": "Core",
        "level_label": "Advanced",
        "icon": "server",
        "percent": 95,
        "featured": true
      }
    ],
    "image_url": null
  },
  "pagination": null
}
```

---

## GET `/home/open-source`

Purpose: Get open-source section metadata and public items.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.key` -> string|null
- `data.title` -> string|null
- `data.subtitle` -> string|null
- `data.description` -> string|null
- `data.content` -> object
- `data.content.description` -> string|null
- `data.items` -> array
- `data.items[].name` -> string
- `data.items[].description` -> string
- `data.items[].url` -> string
- `data.items[].language` -> string
- `data.items[].stars` -> integer
- `data.image_url` -> string|null
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "key": "home.open_source",
    "title": "Open Source",
    "subtitle": "Selected public work and reusable patterns.",
    "description": "A small selection of repos and packages.",
    "content": {
      "description": "A small selection of repos and packages."
    },
    "items": [
      {
        "name": "laravel-service-repository-starter",
        "description": "Starter structure for service/repository Laravel APIs.",
        "url": "https://github.com/fisaldev/laravel-service-repository-starter",
        "language": "PHP",
        "stars": 42
      }
    ],
    "image_url": null
  },
  "pagination": null
}
```

---

## GET `/projects`

Purpose: Get paginated project cards with filter metadata.

Query Parameters:

- `featured` -> boolean, optional
- `category` -> string, optional
- `tag` -> string, optional
- `page` -> integer, optional
- `per_page` -> integer, optional, max 50

Request Body: None

Validation:

- `featured` -> boolean
- `category` -> string, max 100
- `tag` -> string, max 100
- `page` -> integer, min 1
- `per_page` -> integer, min 1, max 50

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.items` -> array
- `data.items[].id` -> integer
- `data.items[].slug` -> string
- `data.items[].title` -> string
- `data.items[].summary` -> string
- `data.items[].category` -> string|null
- `data.items[].tags` -> array
- `data.items[].tags[]` -> string
- `data.items[].featured` -> boolean
- `data.items[].is_open_source` -> boolean
- `data.items[].project_date` -> string|null
- `data.items[].cover_image_url` -> string|null
- `data.items[].links` -> object
- `data.items[].links.web` -> string|null
- `data.items[].links.repository` -> string|null
- `data.items[].links.case_study` -> string|null
- `data.filters` -> object
- `data.filters.categories` -> array
- `data.filters.categories[]` -> string
- `data.filters.tags` -> array
- `data.filters.tags[]` -> string
- `data.summary` -> object
- `data.summary.total_items` -> integer
- `data.summary.returned_items` -> integer
- `pagination` -> object
- `pagination.page` -> integer
- `pagination.per_page` -> integer
- `pagination.total` -> integer
- `pagination.last_page` -> integer

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "slug": "merchant-core-platform",
        "title": "Merchant Core Platform",
        "summary": "Laravel merchant platform for products, orders, and dashboards.",
        "category": "web",
        "tags": [
          "laravel",
          "dashboard",
          "mysql"
        ],
        "featured": true,
        "is_open_source": false,
        "project_date": "2025-09-01",
        "cover_image_url": "http://localhost/uploads/images/logo.png",
        "links": {
          "web": "https://merchant.example.com",
          "repository": null,
          "case_study": "https://portfolio.brmja.tech/projects/merchant-core-platform"
        }
      }
    ],
    "filters": {
      "categories": [
        "fintech",
        "open-source",
        "web"
      ],
      "tags": [
        "api",
        "dashboard",
        "laravel",
        "mysql",
        "open-source",
        "payments",
        "webhooks"
      ]
    },
    "summary": {
      "total_items": 1,
      "returned_items": 1
    }
  },
  "pagination": {
    "page": 1,
    "per_page": 9,
    "total": 1,
    "last_page": 1
  }
}
```

---

## GET `/projects/{slug}`

Purpose: Get a single project detail payload.

Query Parameters: None

Request Body: None

Validation: `slug` must exist in `projects.slug`

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.id` -> integer
- `data.slug` -> string
- `data.title` -> string
- `data.summary` -> string
- `data.description` -> string|null
- `data.category` -> string|null
- `data.tags` -> array
- `data.tags[]` -> string
- `data.stack` -> array
- `data.stack[]` -> string
- `data.highlights` -> array
- `data.highlights[]` -> string
- `data.challenges` -> array
- `data.challenges[]` -> string
- `data.solutions` -> array
- `data.solutions[]` -> string
- `data.metrics` -> array
- `data.metrics[].label` -> string
- `data.metrics[].value` -> string
- `data.featured` -> boolean
- `data.is_open_source` -> boolean
- `data.client_name` -> string|null
- `data.project_date` -> string|null
- `data.cover_image_url` -> string|null
- `data.og_image_url` -> string|null
- `data.gallery` -> array
- `data.gallery[].url` -> string|null
- `data.gallery[].alt` -> string|null
- `data.links` -> object
- `data.links.web` -> string|null
- `data.links.google_play` -> string|null
- `data.links.app_store` -> string|null
- `data.links.repository` -> string|null
- `data.links.case_study` -> string|null
- `data.seo` -> object
- `data.seo.title` -> string|null
- `data.seo.description` -> string|null
- `data.seo.keywords` -> array
- `data.seo.keywords[]` -> string
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "id": 1,
    "slug": "merchant-core-platform",
    "title": "Merchant Core Platform",
    "summary": "Laravel merchant platform for products, orders, and dashboards.",
    "description": "Service-oriented backend with multilingual content and reporting APIs.",
    "category": "web",
    "tags": [
      "laravel",
      "dashboard",
      "mysql"
    ],
    "stack": [
      "Laravel",
      "MySQL",
      "Livewire",
      "REST API"
    ],
    "highlights": [
      "Role-based admin modules",
      "Localization-ready data structures"
    ],
    "challenges": [
      "Legacy settings data and inconsistent media paths."
    ],
    "solutions": [
      "Unified response envelopes and media URL resolution."
    ],
    "metrics": [
      {
        "label": "APIs",
        "value": "32"
      },
      {
        "label": "Modules",
        "value": "7"
      }
    ],
    "featured": true,
    "is_open_source": false,
    "client_name": "Confidential Client",
    "project_date": "2025-09-01",
    "cover_image_url": "http://localhost/uploads/images/logo.png",
    "og_image_url": "http://localhost/uploads/images/Frame%202087326965.png",
    "gallery": [
      {
        "url": "http://localhost/uploads/images/logo.png",
        "alt": "Merchant Core Platform cover"
      },
      {
        "url": "http://localhost/uploads/images/Frame%202087326965.png",
        "alt": "Merchant dashboard preview"
      }
    ],
    "links": {
      "web": "https://merchant.example.com",
      "google_play": null,
      "app_store": null,
      "repository": null,
      "case_study": "https://portfolio.brmja.tech/projects/merchant-core-platform"
    },
    "seo": {
      "title": "Merchant Core Platform Case Study",
      "description": "Case study for a Laravel merchant operations platform.",
      "keywords": [
        "laravel",
        "merchant",
        "dashboard"
      ]
    }
  },
  "pagination": null
}
```

---

## GET `/experiences`

Purpose: Get experience timeline items.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.items` -> array
- `data.items[].id` -> integer
- `data.items[].role` -> string
- `data.items[].company` -> string
- `data.items[].summary` -> string|null
- `data.items[].location` -> string|null
- `data.items[].employment_type` -> string|null
- `data.items[].company_url` -> string|null
- `data.items[].logo_url` -> string|null
- `data.items[].start_date` -> string|null
- `data.items[].end_date` -> string|null
- `data.items[].is_current` -> boolean
- `data.items[].highlights` -> array
- `data.items[].highlights[]` -> string
- `data.filters` -> null
- `data.summary` -> object
- `data.summary.total_items` -> integer
- `data.summary.current_items` -> integer
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "role": "Backend Developer",
        "company": "Brmja Tech",
        "summary": "Built Laravel APIs, dashboards, and integration-heavy modules.",
        "location": "Cairo, Egypt",
        "employment_type": "Full-time",
        "company_url": "https://brmja.tech",
        "logo_url": "http://localhost/uploads/images/logo.png",
        "start_date": "2023-01-01",
        "end_date": null,
        "is_current": true,
        "highlights": [
          "Designed frontend-ready API contracts.",
          "Delivered payments and wallet integrations."
        ]
      }
    ],
    "filters": null,
    "summary": {
      "total_items": 2,
      "current_items": 1
    }
  },
  "pagination": null
}
```

---

## GET `/skills`

Purpose: Get all skills.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.items` -> array
- `data.items[].id` -> integer
- `data.items[].title` -> string
- `data.items[].subtitle` -> string|null
- `data.items[].category` -> string|null
- `data.items[].level_label` -> string|null
- `data.items[].icon` -> string|null
- `data.items[].percent` -> integer
- `data.items[].featured` -> boolean
- `data.filters` -> null
- `data.summary` -> object
- `data.summary.total_items` -> integer
- `data.summary.featured_items` -> integer
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "title": "Backend Engineering",
        "subtitle": "Laravel / PHP",
        "category": "Core",
        "level_label": "Advanced",
        "icon": "server",
        "percent": 95,
        "featured": true
      }
    ],
    "filters": null,
    "summary": {
      "total_items": 5,
      "featured_items": 4
    }
  },
  "pagination": null
}
```

---

## GET `/events`

Purpose: Get event items.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.items` -> array
- `data.items[].id` -> integer
- `data.items[].title` -> string
- `data.items[].type` -> string|null
- `data.items[].date` -> string|null
- `data.items[].location` -> string|null
- `data.items[].description` -> string|null
- `data.items[].url` -> string|null
- `data.items[].cover_image_url` -> string|null
- `data.items[].featured` -> boolean
- `data.filters` -> null
- `data.summary` -> object
- `data.summary.total_items` -> integer
- `data.summary.featured_items` -> integer
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "title": "Portfolio API Release",
        "type": "release",
        "date": "2026-03-01",
        "location": "Remote",
        "description": "Released a frontend integration-ready portfolio backend.",
        "url": "https://portfolio.brmja.tech",
        "cover_image_url": "http://localhost/uploads/images/Frame%202087326965.png",
        "featured": true
      }
    ],
    "filters": null,
    "summary": {
      "total_items": 2,
      "featured_items": 1
    }
  },
  "pagination": null
}
```

---

## GET `/testimonials`

Purpose: Get testimonial items.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.items` -> array
- `data.items[].id` -> integer
- `data.items[].name` -> string
- `data.items[].role` -> string|null
- `data.items[].company` -> string|null
- `data.items[].badge` -> string|null
- `data.items[].quote` -> string
- `data.items[].avatar_url` -> string|null
- `data.items[].featured` -> boolean
- `data.filters` -> null
- `data.summary` -> object
- `data.summary.total_items` -> integer
- `data.summary.featured_items` -> integer
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "name": "Sarah Ahmed",
        "role": "Product Manager",
        "company": "Brmja Tech",
        "badge": "Client",
        "quote": "Clear communication and reliable delivery under pressure.",
        "avatar_url": "http://localhost/uploads/users/1758033689_68c977199bb34_about_2.jpg",
        "featured": true
      }
    ],
    "filters": null,
    "summary": {
      "total_items": 2,
      "featured_items": 1
    }
  },
  "pagination": null
}
```

---

## GET `/comments`

Purpose: Get approved public comments.

Query Parameters:

- `featured` -> boolean, optional
- `page` -> integer, optional
- `per_page` -> integer, optional, max 50

Request Body: None

Validation:

- `featured` -> boolean
- `page` -> integer, min 1
- `per_page` -> integer, min 1, max 50

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.items` -> array
- `data.items[].id` -> integer
- `data.items[].name` -> string
- `data.items[].role` -> string|null
- `data.items[].comment` -> string
- `data.items[].rating` -> integer|null
- `data.items[].avatar_url` -> string|null
- `data.items[].source` -> string|null
- `data.items[].featured` -> boolean
- `data.items[].status` -> string
- `data.items[].submitted_at` -> string|null
- `data.filters` -> object
- `data.filters.featured` -> boolean|null
- `data.summary` -> object
- `data.summary.total_items` -> integer
- `data.summary.returned_items` -> integer
- `pagination` -> object
- `pagination.page` -> integer
- `pagination.per_page` -> integer
- `pagination.total` -> integer
- `pagination.last_page` -> integer

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "name": "Noor",
        "role": "Founder",
        "comment": "The project case studies are structured clearly and easy to follow.",
        "rating": 5,
        "avatar_url": "http://localhost/uploads/users/1758033097_68c974c9d8ca5_about_2.jpg",
        "source": "website",
        "featured": true,
        "status": "approved",
        "submitted_at": "2026-03-10T00:00:00.000000Z"
      }
    ],
    "filters": {
      "featured": true
    },
    "summary": {
      "total_items": 1,
      "returned_items": 1
    }
  },
  "pagination": {
    "page": 1,
    "per_page": 5,
    "total": 1,
    "last_page": 1
  }
}
```

---

## POST `/comments`

Purpose: Submit a new comment.

Query Parameters: None

Request Body Fields

- `name` -> string, required
- `email` -> string, required
- `role` -> string|null, optional
- `comment` -> string, required
- `rating` -> integer|null, optional
- `avatar` -> file|null, optional image
- `source` -> string|null, optional

Validation

- `name` -> required, string, max 255
- `email` -> required, valid email, max 255
- `role` -> nullable, string, max 255
- `comment` -> required, string, max 4000
- `rating` -> nullable, integer, between 1 and 5
- `avatar` -> nullable, image, max 4096 KB
- `source` -> nullable, string, max 100

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.id` -> integer
- `data.name` -> string
- `data.role` -> string|null
- `data.comment` -> string
- `data.rating` -> integer|null
- `data.avatar_url` -> string|null
- `data.source` -> string|null
- `data.featured` -> boolean
- `data.status` -> string
- `data.submitted_at` -> string|null
- `pagination` -> null

### Response Example

```json
{
  "code": 201,
  "message": "Created successfully",
  "data": {
    "id": 3,
    "name": "Test Commenter",
    "role": "Designer",
    "comment": "This portfolio API is well structured.",
    "rating": 5,
    "avatar_url": null,
    "source": "test",
    "featured": false,
    "status": "pending",
    "submitted_at": "2026-03-10T00:00:00.000000Z"
  },
  "pagination": null
}
```

---

## GET `/contact-info`

Purpose: Get contact page info.

Query Parameters: None

Request Body: None

Validation: None

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.title` -> string|null
- `data.subtitle` -> string|null
- `data.availability` -> string|null
- `data.office_hours` -> string|null
- `data.email` -> string|null
- `data.phone` -> string|null
- `data.location` -> string|null
- `data.profile_image_url` -> string|null
- `data.resume_url` -> string|null
- `data.socials` -> object
- `data.socials.linkedin` -> string|null
- `data.socials.github` -> string|null
- `data.socials.x` -> string|null
- `data.socials.instagram` -> string|null
- `data.socials.whatsapp` -> string|null
- `pagination` -> null

### Response Example

```json
{
  "code": 200,
  "message": "Retrieved successfully",
  "data": {
    "title": "Let's Build Something Useful",
    "subtitle": "Share the problem, not only the feature list.",
    "availability": "Replies within 24 hours on business days.",
    "office_hours": "Sun - Thu, 10:00 - 18:00 Cairo time",
    "email": "hello@fisal.dev",
    "phone": "+20 100 000 0000",
    "location": "Cairo, Egypt",
    "profile_image_url": "http://localhost/uploads/users/1758033097_68c974c9d8ca5_about_2.jpg",
    "resume_url": null,
    "socials": {
      "linkedin": "https://linkedin.com/in/fisaldev",
      "github": "https://github.com/fisaldev",
      "x": "https://x.com/fisaldev",
      "instagram": "https://instagram.com/fisal.dev",
      "whatsapp": "https://wa.me/201000000000"
    }
  },
  "pagination": null
}
```

---

## POST `/contact`

Purpose: Submit a contact message.

Query Parameters: None

Request Body Fields

- `name` -> string, required
- `email` -> string, required
- `phone` -> string|null, optional
- `company` -> string|null, optional
- `service_interest` -> string|null, optional
- `budget_range` -> string|null, optional
- `message` -> string, required
- `source` -> string|null, optional

Validation

- `name` -> required, string, max 255
- `email` -> required, valid email, max 255
- `phone` -> nullable, string, max 50
- `company` -> nullable, string, max 255
- `service_interest` -> nullable, string, max 255
- `budget_range` -> nullable, string, max 100
- `message` -> required, string, max 5000
- `source` -> nullable, string, max 100

### Response Keys

- `code` -> integer
- `message` -> string
- `data` -> object
- `data.id` -> integer
- `data.status` -> string
- `pagination` -> null

### Response Example

```json
{
  "code": 201,
  "message": "Received",
  "data": {
    "id": 1,
    "status": "new"
  },
  "pagination": null
}
```
