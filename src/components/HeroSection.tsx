import { useState, useRef, type ChangeEvent } from 'react';
import {
  ArrowRight,
  BookOpen,
  Camera,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  Moon,
  SlidersHorizontal,
  Sun
} from 'lucide-react';
import { motion } from 'motion/react';
import type { EditableStat, PersonalInfo, SocialLinks } from '../types/portfolio';
import { readFileAsDataUrl } from '../utils/storage';

interface HeroSectionProps {
  personal: PersonalInfo;
  social: SocialLinks;
  stats: EditableStat[];
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onDownloadCv: () => void;
  onPreviewCv: () => void;
  onOpenEditor: (tab?: string) => void;
  onUpdatePortrait: (newUrl: string) => void;
}

export function HeroSection({
  personal,
  social,
  stats,
  theme,
  onToggleTheme,
  onDownloadCv,
  onPreviewCv,
  onOpenEditor,
  onUpdatePortrait
}: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePortraitChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setImgError(false);
      onUpdatePortrait(dataUrl);
    } catch {
      // Ignore unreadable file
    }
    e.target.value = '';
  };

  const socialItems = [
    {
      label: 'ORCID',
      sublabel: personal.orcidId,
      href: social.orcid,
      icon: BookOpen
    },
    {
      label: 'LinkedIn',
      sublabel: social.linkedin ? 'Profile' : 'Add link',
      href: social.linkedin,
      icon: Linkedin
    },
    {
      label: 'GitHub',
      sublabel: social.github ? 'Repositories' : 'Add link',
      href: social.github,
      icon: Github
    },
    {
      label: 'Google Scholar',
      sublabel: social.googleScholar ? 'Publications' : 'Add link',
      href: social.googleScholar,
      icon: BookOpen
    }
  ];

  return (
    <section id="home" className="relative pt-8 pb-16 sm:pt-12 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero Workspace Toolbar (Theme Toggle, CV Preview, Portfolio Editor) */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <span>Feni University</span>
            <span aria-hidden="true">·</span>
            <span>BSc in Electrical &amp; Electronic Engineering</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline font-mono tabular-nums">ORCID {personal.orcidId}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-cyan-500/60 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-blue-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onPreviewCv}
              className="inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-cyan-500/60 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileText className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>View CV</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenEditor('personal')}
              className="inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-cyan-500/60 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Edit Portfolio</span>
            </button>
          </div>
        </div>

        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Typographic Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              <p className="text-sm font-medium text-cyan-700 dark:text-cyan-400 tracking-wide">
                Academic &amp; Engineering Portfolio
              </p>

              <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.12]">
                {personal.name}
              </h1>

              <p className="mt-4 text-base sm:text-lg font-medium text-slate-700 dark:text-slate-200">
                {personal.headline}
              </p>

              <p className="mt-6 max-w-2xl text-[15px] sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {personal.intro}
              </p>

              {/* Primary & Secondary Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onDownloadCv}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-cyan-600 dark:bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white dark:text-slate-950 hover:bg-cyan-700 dark:hover:bg-cyan-400 transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </button>

                <a
                  href="#research"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0D1320] px-5 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-100 hover:border-cyan-500 dark:hover:border-cyan-400 transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <span>Explore Research</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact Me</span>
                </a>
              </div>
            </div>

            {/* Social & Academic Identifiers */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {socialItems.map((item) => {
                  const Icon = item.icon;
                  if (item.href) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="font-medium">{item.label}</span>
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                          {item.label === 'ORCID' ? item.sublabel : ''}
                        </span>
                      </a>
                    );
                  }
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => onOpenEditor('social')}
                      className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                      title={`Set your ${item.label} URL in Portfolio Editor`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">(Add URL)</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative h-full min-h-[360px] max-h-[520px] w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0D1320]">
              {!imgError && personal.portraitUrl ? (
                <img
                  src={personal.portraitUrl}
                  alt={`Portrait of ${personal.name}`}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 font-display text-2xl font-bold text-slate-700 dark:text-slate-200">
                    MM
                  </div>
                  <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-200">
                    {personal.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Upload your CV portrait photograph
                  </p>
                </div>
              )}

              {/* Bottom caption scrim + quick portrait upload control */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-5">
                <div className="text-white">
                  <p className="text-xs font-mono text-cyan-300">Parshuram, Feni, Bangladesh</p>
                  <p className="mt-0.5 text-sm font-medium text-slate-100">
                    Dept. of EEE · Feni University
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePortraitChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 border border-slate-600/80 px-3 py-1.5 text-xs font-medium text-slate-100 backdrop-blur-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  title="Replace with your CV photograph"
                >
                  <Camera className="h-3.5 w-3.5" />
                  <span>Replace Photo</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Factual Academic Summary Strip */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-slate-200 dark:border-slate-800 pt-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#0D1320] p-5"
            >
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <p className="mt-2 font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-slate-900 dark:text-slate-50">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                {stat.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
