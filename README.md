# Giang Dao - Personal Website

A personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and GSAP.

**Live site**: [giangdao.vercel.app](https://giangdao.vercel.app)

## Deployment

This project is hosted on [Vercel](https://vercel.com) and connected to the `main` branch. **Merging a PR into `main` automatically triggers a production deployment** — no manual steps required.

### Workflow

1. Develop on the `dev` branch
2. Open a PR from `dev` to `main`
3. Merge the PR
4. Vercel automatically builds and deploys to production

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── my-work/page.tsx    # Journey timeline page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx            # Home / hero section
└── components/
    ├── CustomCursor.tsx     # Custom SVG cursor + trailing star
    ├── JourneyTimeline.tsx  # Scroll-driven milestone timeline
    ├── LoadingScreen.tsx    # Animated intro screen
    ├── Navigation.tsx
    └── ThemeTransition.tsx  # Scroll-driven dark theme transition
```

## License

MIT
