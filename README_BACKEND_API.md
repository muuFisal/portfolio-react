# Fisal Portfolio — Backend API (Laravel) Contract

> هذا الملف يوضح **كل الـ Endpoints** التي تحتاجها لربط واجهة React الحالية بباك اند Laravel.
> الهدف: أي تغيير في الاسم/اللوجو/الألوان/الخطوط/السوشيال… يتم من Endpoint واحد ويتم تطبيقه على الموقع كله.

## Base URL
- `https://your-domain.com/api/v1`

## Conventions
- **Localization**
  - Prefer header: `Accept-Language: ar` or `en`
  - Or query: `?lang=ar|en`
- **Success envelope**
```json
{ "success": true, "message": "OK", "data": {} }
```
- **Validation error**
```json
{ "success": false, "message": "Validation error", "errors": { "field": ["..."] } }
```

---

## 1) Settings (Global / Shared)
### GET `/settings`
Returns everything the frontend needs globally:
- Brand name + logo
- Default theme colors (primary/secondary)
- Default font
- Social links
- Contact info
- SEO basics (optional)

**Response**
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "brand": {
      "name": "Mohamed Fisal",
      "tagline": { "ar": "أنظمة قابلة للتوسع...", "en": "Scale-ready systems..." },
      "logo_url": "https://.../storage/brand/logo.png"
    },
    "theme": {
      "default_mode": "light",
      "primary": "#22c55e",
      "secondary": "#6366f1",
      "radius": 16,
      "fonts": {
        "default": "Cairo",
        "available": [
          { "key": "Cairo", "label": "Cairo" },
          { "key": "Poppins", "label": "Poppins" },
          { "key": "Inter", "label": "Inter" },
          { "key": "Tajawal", "label": "Tajawal" },
          { "key": "IBM Plex Sans Arabic", "label": "IBM Plex Sans Arabic" }
        ]
      }
    },
    "social": {
      "facebook": "https://facebook.com/...",
      "whatsapp": "https://wa.me/2011....",
      "instagram": "https://instagram.com/...",
      "linkedin": "https://linkedin.com/in/...",
      "github": "https://github.com/...",
      "behance": "https://behance.net/..."
    },
    "contact": {
      "email": "you@email.com",
      "phone": "+20...",
      "location": { "ar": "القاهرة", "en": "Cairo" }
    }
  }
}
```

> NOTE: Frontend caches settings in localStorage and re-applies theme immediately.

---

## 2) Projects
### GET `/projects`
Supports search & filter (optional):
- `?q=crm`
- `?tag=payments`
- `?page=1&per_page=12`

**Response**
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "items": [
      {
        "id": 1,
        "slug": "mecarde",
        "title": { "ar": "Mecarde", "en": "Mecarde" },
        "summary": { "ar": "نظام...", "en": "A platform..." },
        "tags": ["Laravel", "Wallet", "OPay", "Webhooks"],
        "featured": true,
        "cover_image_url": "https://.../storage/projects/mecarde/cover.jpg",
        "gallery": [
          "https://.../storage/projects/mecarde/1.jpg",
          "https://.../storage/projects/mecarde/2.jpg"
        ],
        "links": {
          "web": "https://mecarde.com",
          "google_play": "https://play.google.com/store/apps/...",
          "app_store": null,
          "demo": null
        }
      }
    ],
    "pagination": { "page": 1, "per_page": 12, "total": 1, "last_page": 1 }
  }
}
```

### GET `/projects/{slug}`
Returns full project details.

---

## 3) Experience
### GET `/experiences`
**Response**
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "items": [
      {
        "id": 1,
        "role": { "ar": "Backend Developer", "en": "Backend Developer" },
        "company": "Brmja Tech",
        "start_date": "2023-01-01",
        "end_date": null,
        "highlights": [
          { "ar": "Wallet flows", "en": "Wallet flows" },
          { "ar": "Payment gateways", "en": "Payment gateways" }
        ]
      }
    ]
  }
}
```

---

## 4) Events
### GET `/events`
**Response**
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "items": [
      {
        "id": 1,
        "title": { "ar": "إطلاق CRM", "en": "CRM Launch" },
        "date": "2025-10-02",
        "location": { "ar": "القاهرة", "en": "Cairo" },
        "description": { "ar": "....", "en": "...." }
      }
    ]
  }
}
```

---

## 5) Testimonials
### GET `/testimonials`
**Response**
```json
{
  "success": true,
  "message": "OK",
  "data": {
    "items": [
      {
        "id": 1,
        "name": "Project Manager",
        "badge": { "ar": "عميل", "en": "Client" },
        "quote": { "ar": "....", "en": "...." }
      }
    ]
  }
}
```

---

## 6) Contact (Lead)
### POST `/contact`
Body:
```json
{
  "name": "Ahmed",
  "email": "a@email.com",
  "phone": "+20...",
  "message": "I need a CRM...",
  "source": "portfolio"
}
```

**Response**
```json
{ "success": true, "message": "Received", "data": { "id": 123 } }
```

---

## 7) (Optional) Skills
> حالياً الـ skills موجودة static داخل الواجهة، لكن لو عايزها dynamic:
### GET `/skills`
Returns skills groups and items.

---

## Storage & Images Notes
- All image urls should be absolute.
- `gallery` & `links.app_store/google_play/web` can be **null**.

---

## Suggested Laravel Tables (Quick)
- `settings` (single row or key-value)
- `projects` + `project_images`
- `experiences`
- `events`
- `testimonials`
- `contact_messages` (or `leads`)

