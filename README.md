# Md. Mahruf Mazumder — Academic & Research Portfolio

A responsive, static-deployable academic and engineering portfolio built with React, TypeScript, Tailwind CSS, and Lucide icons.

## Updating Portfolio Information

All default content lives in `src/data/portfolioData.ts`:
- Personal bio, portrait path, email, phone, location, and ORCID (`0009-0007-7896-6672`)
- Social links (`linkedin`, `github`, `googleScholar`, `orcid`)
- Education timeline, Achievements & Awards, Experience, and Leadership
- Research Interests, Ongoing Research topics, Projects, Skills, and Certifications

You can also edit data live inside the website via **Edit Portfolio**, upload your CV photograph and certificate images/PDFs directly in the browser (persisted in IndexedDB), and export a JSON snapshot.

## Configuring the Contact Form

By default, the contact form composes a structured `mailto:` inquiry to `mdmahrufmazumder@gmail.com` so it works reliably on static hosting with zero backend setup.

To enable direct browser submissions without opening an email client:
1. Create a free form endpoint on [Formspree](https://formspree.io/) or [Web3Forms](https://web3forms.com/).
2. Paste your endpoint URL into `contactFormEndpoint` in `src/data/portfolioData.ts` (or in **Edit Portfolio → Social & Contact**).

## Free Deployment (Vercel or GitHub Pages)

### Vercel
1. Push the repository to GitHub.
2. Import the repository on Vercel (Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`).

### GitHub Pages
1. Set `base: './'` in `vite.config.ts` if hosting under a repository subpath (`username.github.io/repo-name/`).
2. Run `npm run build` and publish the `dist/` directory using GitHub Actions or `gh-pages`.
