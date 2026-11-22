import type { PersonalInfo, SocialLinks } from '../types/portfolio';

interface FooterProps {
  personal: PersonalInfo;
  social: SocialLinks;
}

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#projects' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' }
];

export function Footer({ personal, social }: FooterProps) {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-[#06090F]/80 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
              {personal.name}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {personal.headline} · {personal.location}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 dark:border-slate-800/80 pt-6 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono">
            {social.orcid && (
              <a
                href={social.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                ORCID: {personal.orcidId}
              </a>
            )}
            <a
              href={`mailto:${personal.email}`}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {personal.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
