# Alex Morgan — Portfolio

Neon futuristic developer portfolio built with Next.js 14, MDX, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Personalising

All editable content is at the top of `components/PortfolioClient.tsx`:

| Constant      | What to change                              |
|---------------|---------------------------------------------|
| `ME`          | Name, role, bio, email, photo path, socials |
| `EXPERIENCE`  | Timeline cards — role, years, achievement, stack |
| `PROJECTS`    | Title, tags, description, GitHub URL, media |
| `SKILLS`      | Skill names and percentages                 |
| `SERVICES`    | Service cards                               |

## Adding your photo

Drop your photo at `/public/about/photo.jpg`.
The frame, corner accents, and scan-line effect are automatic.

## Adding project media

Drop GIFs and MP4s into `/public/projects/<slug>/`.
See `/public/projects/README.md` for the full file list.

To compress a screen recording:
```bash
ffmpeg -i recording.mov -vcodec h264 -crf 28 output.mp4
# or convert GIF → MP4 (much smaller):
ffmpeg -i animation.gif -movflags faststart -pix_fmt yuv420p output.mp4
```

## Writing blog posts

Create `.mdx` files in `/content/blog/`:

```mdx
---
title: Your Post Title
date: 2025-03-01
tags: [AI, LLM]
---

Your content here...
```

Push to GitHub → Vercel deploys in ~30 seconds.

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```
