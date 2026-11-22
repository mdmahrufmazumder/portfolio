import { useMemo } from 'react';
import { Clock, Globe2, SlidersHorizontal } from 'lucide-react';
import type { LanguageItem, PersonalInfo } from '../types/portfolio';

interface AboutSectionProps {
  personal: PersonalInfo;
  languages: LanguageItem[];
  onOpenEditor: (tab?: string) => void;
}

const WORDS_PER_MINUTE = 200;

function calculateReadingTime(sections: string[]): { wordCount: number; readingMinutes: number } {
  const combinedText = sections.join(' ').trim();
  const wordCount = combinedText ? combinedText.split(/\s+/).filter(Boolean).length : 0;
  const readingMinutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return { wordCount, readingMinutes };
}

export function AboutSection({ personal, languages, onOpenEditor }: AboutSectionProps) {
  const { wordCount, readingMinutes } = useMemo(
    () => calculateReadingTime([...personal.aboutParagraphs, personal.researchVision]),
    [personal.aboutParagraphs, personal.researchVision]
  );

  return (
    <section id="about" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-cyan-700 dark:text-cyan-400">
              Academic Biography
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Bridging Electrical Engineering, Materials Science, and Scientific Inquiry
            </h2>
            <div
              aria-label={`Estimated reading time: ${readingMinutes} minute${readingMinutes === 1 ? '' : 's'}`}
              className="mt-3 inline-flex items-center gap-2 font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400"
            >
              <Clock className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
              <span>{readingMinutes} min read</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span>{wordCount} words</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenEditor('personal')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Edit Biography</span>
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Main Biography Prose */}
          <div className="lg:col-span-7 space-y-5 text-[15px] sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {personal.aboutParagraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                Long-Term Research Aspiration
              </p>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-100">
                {personal.researchVision}
              </p>
            </div>
          </div>

          {/* Structured Profile & Language Proficiency */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-6">
              <h3 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                Core Academic Pillars
              </h3>
              <dl className="mt-4 divide-y divide-slate-200/80 dark:divide-slate-800/80 text-sm">
                <div className="py-3">
                  <dt className="font-medium text-slate-900 dark:text-slate-100">
                    Scientific Curiosity &amp; Methodology
                  </dt>
                  <dd className="mt-1 text-slate-600 dark:text-slate-400">
                    Trained in systematic literature search (Scopus) and evidence-based research gap analysis through Elsevier Researcher Academy.
                  </dd>
                </div>
                <div className="py-3">
                  <dt className="font-medium text-slate-900 dark:text-slate-100">
                    Interdisciplinary Convergence
                  </dt>
                  <dd className="mt-1 text-slate-600 dark:text-slate-400">
                    Connecting EEE hardware foundations with Density Functional Theory, photovoltaics, quantum hardware, and clean energy storage.
                  </dd>
                </div>
                <div className="pt-3">
                  <dt className="font-medium text-slate-900 dark:text-slate-100">
                    Collaborative Student Leadership
                  </dt>
                  <dd className="mt-1 text-slate-600 dark:text-slate-400">
                    Serving across university innovation, career, geospatial mapping, and youth change-maker organizations.
                  </dd>
                </div>
              </dl>
            </div>

            {/* Language Proficiency */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-6">
              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <h3 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                  Language Proficiency
                </h3>
              </div>

              <div className="mt-4 divide-y divide-slate-200/80 dark:divide-slate-800/80">
                {languages.map((lang) => (
                  <div key={lang.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {lang.language}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {lang.date || lang.proficiency}
                      </span>
                    </div>
                    {lang.certification ? (
                      <p className="mt-1 text-sm text-cyan-700 dark:text-cyan-400 font-medium">
                        {lang.certification}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {lang.proficiency}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
