# Personal Website

A minimal and clean personal website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✨ Minimal and modern design
- 📱 Fully responsive
- ⚡ Fast and optimized with Next.js 14
- 🎨 Styled with Tailwind CSS
- 📝 Blog section
- 📬 Contact form
- 🔍 SEO friendly

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Update Your Information

1. **Personal Details**: Edit `src/app/page.tsx` to update your name, tagline, and about section
3. **Contact Info**: Update `src/app/contact/page.tsx` with your email and social links
4. **Navigation**: Change the site title in `src/components/Navigation.tsx`
5. **Metadata**: Update SEO info in `src/app/layout.tsx`

### Styling

The project uses Tailwind CSS. You can customize the theme in `tailwind.config.ts`:

- Colors
- Fonts
- Spacing
- Breakpoints

### Adding Blog Posts

Currently, blog posts are hardcoded in `src/app/blog/page.tsx`. To add real blog functionality, you can:

- Use MDX for markdown blog posts
- Integrate a CMS like Contentful or Sanity
- Create a `/blog/[slug]` dynamic route for individual posts

## Project Structure

```
personal-web/
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Navigation.tsx
│       └── Footer.tsx
├── public/
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

You can also deploy to:
- Netlify
- AWS Amplify
- Digital Ocean
- Any platform supporting Node.js

## Building for Production

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this template for your own website!
