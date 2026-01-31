# Finarena - Project Documentation

## 🎯 Project Goal

Build a modern, high-performance corporate website for **Finarena** - a business consulting company specializing in:
1. AI solutions implementation
2. Process automation
3. POC/MVP software development
4. Leadership competency development
5. Team competency mapping using Gallup Strengths methodology
6. Innovation and organizational culture implementation
7. Executive mentoring

The website must combine technical excellence (AI/automation) with human development (leadership/culture) in a cohesive, professional presentation.

## 🏗️ Architecture

**Headless CMS Architecture:**
```
Ghost CMS (Content Management)
    ↓ (Content API)
Next.js 14 (Frontend)
    ↓ (Static Generation + ISR)
End Users (Fast, Animated, SEO-optimized)
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** (App Router) - React framework with SSG/SSR
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations and micro-interactions
- **Lucide React** - Icons
- **Schema.org** - Structured data for SEO

### Backend/Content
- **Ghost CMS** (v5.x) - Headless CMS for blog/case studies
- **Ghost Content API** - Fetching posts, pages, authors
- **MySQL** - Ghost database (managed by Coolify)

### Infrastructure (Coolify on Hetzner VPS)
- **Docker & Docker Compose** - Containerization
- **Coolify** - Deployment automation
- **Nginx** - Reverse proxy (handled by Coolify)
- **Let's Encrypt** - SSL certificates (handled by Coolify)
- **Hetzner VPS** - Server infrastructure

### SEO & Performance
- **Next SEO** - Meta tags management
- **Schema.org JSON-LD** - Rich snippets
- **Static Site Generation (SSG)** - Fast page loads
- **Incremental Static Regeneration (ISR)** - Fresh content
- **Image Optimization** - Next.js Image component
- **Core Web Vitals** - Performance optimization

## 📁 Project Structure

```
finarena-next/
├── AGENTS.md                 # This file
├── docker-compose.yml        # Coolify deployment config
├── Dockerfile                # Next.js container
├── .env.example             # Environment variables template
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout with Schema.org
│   │   ├── page.tsx         # Homepage
│   │   ├── uslugi/          # Services page
│   │   ├── gallup/          # Gallup Strengths page
│   │   ├── kontakt/         # Contact page
│   │   ├── blog/            # Blog listing
│   │   └── case-studies/    # Case studies from Ghost
│   ├── components/          # React components
│   │   ├── ui/              # UI components (Button, Card, etc.)
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   ├── sections/        # Page sections (Hero, Services, etc.)
│   │   └── animations/      # Framer Motion components
│   ├── lib/                 # Utilities
│   │   ├── ghost.ts         # Ghost API client
│   │   ├── schema/          # Schema.org generators
│   │   └── utils.ts         # Helper functions
│   ├── types/               # TypeScript types
│   └── styles/              # Global styles
└── public/                  # Static assets
    ├── images/
    └── fonts/
```

## 🔧 Coolify Deployment Setup

### Prerequisites
1. Hetzner VPS with Coolify installed
2. Domain pointed to VPS (finarena.pl)
3. Coolify resources:
   - 1x Ghost instance (automatically managed)
   - 1x Next.js instance (Docker)

### Ghost Configuration
1. Install Ghost via Coolify UI
2. Configure Ghost URL: `https://cms.finarena.pl` (subdomain)
3. Generate Content API Key in Ghost Admin → Integrations
4. Note the API key for Next.js environment variables

### Environment Variables
```env
# Ghost CMS
GHOST_URL=https://cms.finarena.pl
GHOST_CONTENT_API_KEY=your_api_key_here

# Site
NEXT_PUBLIC_SITE_URL=https://finarena.pl
NEXT_PUBLIC_SITE_NAME=Finarena

# Contact Form (optional)
CONTACT_FORM_ENDPOINT=your_form_endpoint
```

## 📝 Content Strategy

### Managed in Ghost:
- **Blog posts** - Articles about AI, automation, leadership
- **Case studies** - Success stories with client results
- **Team members** - Authors/experts profiles
- **Tags** - Categories (AI, Automation, Gallup, Leadership)

### Static in Next.js:
- **Homepage** - Landing page with animations
- **Services** - Service descriptions with Schema.org
- **Gallup Strengths** - Detailed methodology page
- **Contact** - Form and company info
- **About** - Company story and mission

## 🎨 Design System

### Colors
- Primary: `#2563eb` (Blue)
- Primary Dark: `#1d4ed8`
- Background: `#ffffff`
- Background Secondary: `#f8fafc`
- Text Primary: `#1e293b`
- Text Secondary: `#64748b`

### Typography
- Font: Inter (Google Fonts)
- Headings: 600 weight
- Body: 400 weight

### Animations
- Scroll-triggered fade-ins
- Staggered children animations
- Hover micro-interactions
- Page transitions

## 🔍 Schema.org Implementation

### Required Schemas:
1. **Organization** - Company info (global)
2. **Service** - For each service page
3. **Article** - Blog posts and case studies
4. **FAQPage** - FAQ sections
5. **LocalBusiness** - Address and contact
6. **BreadcrumbList** - Navigation breadcrumbs

## 🚀 Development Workflow

1. **Local development:**
   ```bash
   npm install
   npm run dev
   ```

2. **Content updates:**
   - Write in Ghost admin
   - Next.js fetches via API
   - ISR regenerates pages automatically

3. **Deployment:**
   - Push to Git repository
   - Coolify auto-deploys
   - Docker containers restart

## 📊 Performance Targets

- **Lighthouse Score:** 95+ (Performance, Accessibility, SEO)
- **Core Web Vitals:**
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- **Time to First Byte:** < 200ms
- **Build Time:** < 3 minutes

## 🔒 Security

- Environment variables in Coolify (not in repo)
- No sensitive data in client-side code
- Ghost API key server-side only
- HTTPS enforced
- Security headers via Next.js

## 📱 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## 🆘 Troubleshooting

### Common Issues:
1. **Ghost API 401** - Check API key and URL
2. **Build fails** - Verify Node.js version (18+)
3. **Images not loading** - Check Ghost URL in env vars
4. **Styles broken** - Clear .next folder and rebuild

### Support:
- Coolify docs: https://coolify.io/docs/
- Ghost API docs: https://ghost.org/docs/content-api/
- Next.js docs: https://nextjs.org/docs
