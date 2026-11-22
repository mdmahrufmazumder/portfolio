import { useState } from 'react';
import { ChevronDown, Layers, Plus, Users, X } from 'lucide-react';
import type { LeadershipItem, SkillCategory } from '../types/portfolio';

interface ExperienceSkillsSectionProps {
  leadership: LeadershipItem[];
  skills: SkillCategory[];
  onUpdateSkills: (skills: SkillCategory[]) => void;
}

export function ExperienceSkillsSection({
  leadership,
  skills,
  onUpdateSkills
}: ExperienceSkillsSectionProps) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    skills.forEach((cat) => {
      initial[cat.id] = cat.defaultOpen;
    });
    return initial;
  });

  const [newSkillDrafts, setNewSkillDrafts] = useState<Record<string, string>>({});

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddSkill = (catId: string) => {
    const draft = (newSkillDrafts[catId] || '').trim();
    if (!draft) return;
    onUpdateSkills(
      skills.map((cat) =>
        cat.id === catId && !cat.skills.includes(draft)
          ? { ...cat, skills: [...cat.skills, draft] }
          : cat
      )
    );
    setNewSkillDrafts((prev) => ({ ...prev, [catId]: '' }));
  };

  const handleRemoveSkill = (catId: string, skillName: string) => {
    onUpdateSkills(
      skills.map((cat) =>
        cat.id === catId
          ? { ...cat, skills: cat.skills.filter((s) => s !== skillName) }
          : cat
      )
    );
  };

  return (
    <section id="leadership" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Part 1: Leadership & Extracurricular Activities */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">
            <Users className="h-4 w-4" />
            <span>Teamwork &amp; Community Impact</span>
          </div>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Leadership &amp; Extracurricular Activities
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {leadership.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400">
                    {item.period}
                  </p>
                  <h3 className="mt-2 font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                    {item.organization}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-cyan-700 dark:text-cyan-400">
                    {item.role}
                  </p>
                </div>
                <p className="mt-3 pt-3 border-t border-slate-200/70 dark:border-slate-800/70 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.focus}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Part 2: Skills (Expandable Categories, No Fake Proficiency Bars) */}
        <div id="skills" className="pt-4">
          <div className="flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">
            <Layers className="h-4 w-4" />
            <span>Capabilities &amp; Tooling</span>
          </div>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Skills
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Confirmed digital, technical, and research competencies organized by domain. Expand any category to inspect or update entries.
          </p>

          <div className="mt-8 space-y-3">
            {skills.map((category) => {
              const isOpen = Boolean(openCategories[category.id]);
              return (
                <div
                  key={category.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    aria-expanded={isOpen}
                    className="print-keep flex w-full items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                        {category.name}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400">
                        {category.skills.length} {category.skills.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-500 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-200/80 dark:border-slate-800/80 px-6 py-5 space-y-4">
                      {category.skills.length > 0 ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                          {category.skills.map((skill) => (
                            <li
                              key={skill}
                              className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070A11] px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-200"
                            >
                              <span>{skill}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(category.id, skill)}
                                aria-label={`Remove ${skill}`}
                                className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {category.emptyNotice || 'No entries added yet.'}
                        </p>
                      )}

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddSkill(category.id);
                        }}
                        className="flex flex-wrap items-center gap-2 pt-2"
                      >
                        <input
                          type="text"
                          value={newSkillDrafts[category.id] || ''}
                          onChange={(e) =>
                            setNewSkillDrafts((prev) => ({
                              ...prev,
                              [category.id]: e.target.value
                            }))
                          }
                          placeholder={`Add skill to ${category.name}...`}
                          className="flex-1 min-w-[200px] max-w-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-1.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-cyan-500 transition-colors cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add</span>
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
