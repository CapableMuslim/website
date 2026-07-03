# The Inner Fire - Project Documentation

## Project Overview

The Inner Fire is a modern, high-performance website built with Astro, React, and TailwindCSS. It features a content-focused design with 10 main pillars covering health, mindset, social skills, fitness, and more.

## Tech Stack

- **Framework**: Astro 5.0.0 (Static Site Generator)
- **UI Library**: React 18.3.1
- **Styling**: TailwindCSS 3.4.15
- **Animation**: Framer Motion 11.18.2
- **Search**: Fuse.js 7.1.0
- **Icons**: Lucide React 0.460.0

## Project Structure

```
website/
├── src/
│   ├── components/        # React components
│   │   ├── FAQ.tsx
│   │   ├── Navigation.tsx
│   │   └── Search.tsx
│   ├── content/          # Markdown content
│   │   ├── config.ts     # Content schema
│   │   └── posts/        # Blog posts (Markdown)
│   ├── data/             # Static data
│   │   └── pillars.ts    # Pillar structure
│   ├── layouts/          # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/            # Routes
│   │   ├── index.astro   # Homepage
│   │   ├── about.astro
│   │   ├── bookshelf.astro
│   │   ├── contact.astro
│   │   ├── faq.astro
│   │   ├── privacy-policy.astro
│   │   ├── search.json.js
│   │   ├── pillars/
│   │   │   └── [pillar]/
│   │   │       ├── index.astro
│   │   │       └── [subpillar].astro
│   │   └── posts/
│   │       └── [...slug].astro
│   └── styles/
│       └── global.css
├── public/               # Static assets
│   ├── favicon.ico
│   ├── favicon.svg
│   └── logo.png
├── Static Pages/         # Build output directory
├── astro.config.mjs
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## The 10 Pillars

1. **HEALTH** - Nutrition, Longevity, Sleep, Hormones, Mindfulness
2. **MINDSET** - Identity, Stoicism, Masculinity, Self Development, Discipline
3. **SOCIAL** - Social Skills, Friendship, Family, Dating, Fatherhood
4. **FITNESS** - Strength, Endurance, Martial Arts, Recovery
5. **SKILLS** - How To, Know How, Outdoor
6. **STYLE** - Clothing, Accessories, Fragrances, Hair, Facial Hair, Grooming
7. **TECHNOLOGY** - AI, Applied Technology, Tools, Devices, Cyber Literacy
8. **CULTURE** - Entertainment, Food & Drink, Games & Tricks, Hobbies, Reading
9. **FINANCE** - Career, Income, Investing, Wealth
10. **BOOKSHELF** - Must Read, Reviews

## How to Add New Posts

### 1. Create a Markdown File

Create a new `.md` file in `src/content/posts/` with this frontmatter:

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
pubDate: "2026-02-09"
heroImage: "https://images.unsplash.com/photo-xxxxx?auto=format&fit=crop&w=800&q=80"
pillar: "HEALTH"
subpillar: "NUTRITION"
---

# Your Post Title

Your content here...
```

### 2. Frontmatter Fields

- **title** (required): Post title
- **description** (optional): Brief description for SEO and previews
- **pubDate** (optional): Publication date
- **heroImage** (optional): Header image URL
- **pillar** (required): Must match one of the 10 pillars
- **subpillar** (required): Must match a subpillar of the chosen pillar

### 3. Auto-Discovery

Posts are **automatically discovered** and displayed on:
- Homepage (latest posts section)
- Pillar pages (grouped by pillar)
- Subpillar pages (filtered by subpillar)
- Search results

No manual configuration needed!

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Features

### ✅ Automatic Content Discovery
- Posts are automatically discovered from `src/content/posts/`
- No manual configuration required
- Dynamic routing for pillars and subpillars

### ✅ Fully Responsive
- Mobile-first design
- Optimized for all screen sizes
- Touch-friendly navigation

### ✅ SEO Optimized
- Clean URLs
- Meta tags
- Sitemap generation
- Fast page loads

### ✅ Search Functionality
- Full-text search across all content
- Powered by Fuse.js
- Instant results

### ✅ Modern Design
- Dark theme with premium aesthetics
- Smooth animations
- Professional typography
- High contrast for readability

## Post Page Design

The post page features:
- Full-width hero image with text overlay
- Clean content container with rounded corners
- White text on dark background for maximum readability
- Large, prominent headings (H2 in red, H1/H3 in white)
- Custom CSS for typography and spacing
- Back to home navigation

## Placeholder Posts

Currently includes 10 placeholder posts (one per pillar):
1. Nutrition Fundamentals (HEALTH)
2. Forging Unbreakable Identity (MINDSET)
3. Building Authentic Social Connections (SOCIAL)
4. Strength Training Essentials (FITNESS)
5. Essential Skills Every Man Should Master (SKILLS)
6. Modern Man's Guide to Personal Style (STYLE)
7. Leveraging AI for Peak Performance (TECHNOLOGY)
8. Curating Quality Entertainment (CULTURE)
9. Building Wealth Foundations (FINANCE)
10. Essential Books Every Man Should Read (BOOKSHELF)

## Content Guidelines

### Writing Style
- Authoritative "we" tone
- Professional, confident English
- High information density
- Actionable insights

### Structure
- 5 main sections
- Clear headings (H2 for sections)
- Actionable steps at the end
- 1-2 references per section

### Formatting
- Use **bold** for key concepts
- Include external images via URLs
- Keep paragraphs concise
- Use bullet points sparingly

## Next Steps

1. **Delete placeholder posts** when ready to add real content
2. **Create high-quality posts** following the guidelines
3. **Add images** to the `public/` folder or use external URLs
4. **Build and deploy** to your hosting platform

## Support

For issues or questions, refer to:
- Astro docs: https://docs.astro.build
- React docs: https://react.dev
- TailwindCSS docs: https://tailwindcss.com

---

**Built with ❤️ for The Inner Fire**

