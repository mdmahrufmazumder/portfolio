import { Award, GraduationCap } from 'lucide-react';
import type { AchievementItem, EducationItem } from '../types/portfolio';

interface EducationSectionProps {
  education: EducationItem[];
  achievements: AchievementItem[];
}

export function EducationSection({ education, achievements }: EducationSectionProps) {
  return (
    <section id="education" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Education Timeline */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">
              <GraduationCap className="h-4 w-4" />
              <span>Academic Background</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Education
            </h2>

            <div className="mt-8 relative pl-6 border-l border-slate-300 dark:border-slate-800 space-y-8">
              {education.map((item, idx) => (
                <div key={item.id} className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 ${
                      idx === 0
                        ? 'border-cyan-500 bg-cyan-500/20'
                        : 'border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-[#070A11]'
                    }`}
                  />

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {item.institution}
                      </h3>
                      <span className="font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400">
                        {item.period}
                      </span>
                    </div>

                    <p className="mt-1.5 text-sm sm:text-base font-medium text-slate-700 dark:text-slate-200">
                      {item.degree}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-mono tabular-nums text-cyan-700 dark:text-cyan-400">
                      <span>{item.gpa}</span>
                      {item.expectedGraduation && (
                        <>
                          <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                          <span className="text-slate-600 dark:text-slate-300">{item.expectedGraduation}</span>
                        </>
                      )}
                    </div>

                    {item.notes && (
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Awards Timeline */}
          <div id="achievements" className="lg:col-span-5">
            <div className="flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">
              <Award className="h-4 w-4" />
              <span>Honors &amp; Distinctions</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Achievements &amp; Awards
            </h2>

            <div className="mt-8 relative pl-6 border-l border-slate-300 dark:border-slate-800 space-y-6">
              {achievements.map((ach) => (
                <div key={ach.id} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-blue-500 bg-blue-500/20"
                  />

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-6">
                    <div className="flex items-baseline justify-between gap-3 text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                      <span>{ach.level}</span>
                      <span className="font-semibold text-cyan-700 dark:text-cyan-400">{ach.year}</span>
                    </div>

                    <h3 className="mt-2 font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                      {ach.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
