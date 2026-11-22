import { useState } from 'react';
import { Atom, Check, FlaskConical, Pencil, Plus, X } from 'lucide-react';
import type { OngoingResearchTopic, ResearchInterest } from '../types/portfolio';
import { ScientificIcon } from './ScientificIcon';

interface ResearchSectionProps {
  interests: ResearchInterest[];
  ongoing: OngoingResearchTopic[];
  onUpdateOngoing: (updated: OngoingResearchTopic[]) => void;
}

export function ResearchSection({
  interests,
  ongoing,
  onUpdateOngoing
}: ResearchSectionProps) {
  const [selectedInterestId, setSelectedInterestId] = useState<string>(interests[0]?.id || '');
  const [editingTopic, setEditingTopic] = useState<OngoingResearchTopic | null>(null);
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const [bannerError, setBannerError] = useState(false);

  const selectedInterest =
    interests.find((item) => item.id === selectedInterestId) || interests[0];

  const handleSaveTopic = (topic: OngoingResearchTopic) => {
    const exists = ongoing.some((o) => o.id === topic.id);
    if (exists) {
      onUpdateOngoing(ongoing.map((o) => (o.id === topic.id ? topic : o)));
    } else {
      onUpdateOngoing([...ongoing, topic]);
    }
    setEditingTopic(null);
    setIsAddingTopic(false);
  };

  const openAddTopic = () => {
    setEditingTopic({
      id: `or-${Date.now()}`,
      title: '',
      category: 'Interdisciplinary Research',
      status: 'Ongoing Research Topic',
      description: '',
      focusNotes: ''
    });
    setIsAddingTopic(true);
  };

  return (
    <section id="research" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Part 1: Research Interests */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">
              <Atom className="h-4 w-4" />
              <span>Scientific Domains</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Research Interests
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Select any domain card to inspect its core physical principles, computational themes, and areas of inquiry.
            </p>
          </div>
        </div>

        {/* Interactive 12-Card Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {interests.map((interest, idx) => {
            const isSelected = selectedInterest?.id === interest.id;
            return (
              <button
                key={interest.id}
                type="button"
                onClick={() => setSelectedInterestId(interest.id)}
                className={`print-keep group text-left rounded-xl border p-5 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                  isSelected
                    ? 'border-cyan-600 dark:border-cyan-400 bg-cyan-50/50 dark:bg-cyan-950/25'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-xs tabular-nums text-slate-400 dark:text-slate-500">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <ScientificIcon
                    type={interest.icon}
                    className={`h-9 w-9 transition-colors ${
                      isSelected
                        ? 'text-cyan-600 dark:text-cyan-400'
                        : 'text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
                    }`}
                  />
                </div>

                <h3 className="mt-4 font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                  {interest.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {interest.domain}
                </p>
              </button>
            );
          })}
        </div>

        {/* Focused Domain Detail Panel */}
        {selectedInterest && (
          <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 dark:text-cyan-400">
                  <span>{selectedInterest.domain}</span>
                </div>
                <h3 className="mt-1.5 font-display text-xl font-semibold text-slate-900 dark:text-slate-50">
                  {selectedInterest.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {selectedInterest.summary}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Key Concepts:</span>
                  {selectedInterest.keyConcepts.map((concept, i) => (
                    <span key={concept} className="inline-flex items-center gap-2">
                      <span>{concept}</span>
                      {i < selectedInterest.keyConcepts.length - 1 && (
                        <span aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070A11] text-cyan-600 dark:text-cyan-400">
                  <ScientificIcon type={selectedInterest.icon} className="h-14 w-14" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Part 2: Ongoing Research Topics */}
        <div className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">
                <FlaskConical className="h-4 w-4" />
                <span>Active Inquiry</span>
              </div>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                Ongoing Research
              </h2>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
                Current exploratory study topics across electromagnetic antenna architectures, first-principles DFT modeling, photovoltaic materials, hydrogen storage, and superconductivity. Each topic card can be updated as research advances.
              </p>

              <button
                type="button"
                onClick={openAddTopic}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0D1320] px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-cyan-500 transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Research Topic</span>
              </button>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0D1320] aspect-video">
                {!bannerError ? (
                  <img
                    src="/src/assets/images/research_lattice_banner_1795332462302.jpg"
                    alt="Isometric scientific visualization of perovskite lattice and semiconductor traces"
                    referrerPolicy="no-referrer"
                    onError={() => setBannerError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-6 text-center text-xs font-mono text-slate-500">
                    Perovskite Lattice &amp; Semiconductor Architecture
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ongoing.map((topic, index) => (
              <article
                key={topic.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-6"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {String(index + 1).padStart(2, '0')} · {topic.category}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTopic({ ...topic });
                        setIsAddingTopic(false);
                      }}
                      aria-label={`Edit ${topic.title}`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer shrink-0"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <h3 className="mt-2 font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {topic.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {topic.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                  <span className="font-medium text-cyan-700 dark:text-cyan-400">
                    {topic.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTopic({ ...topic });
                      setIsAddingTopic(false);
                    }}
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer"
                  >
                    Update notes
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Inline Ongoing Research Edit Modal */}
      {editingTopic && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-research-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 id="edit-research-title" className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                {isAddingTopic ? 'Add Ongoing Research Topic' : 'Update Ongoing Research Topic'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setEditingTopic(null);
                  setIsAddingTopic(false);
                }}
                aria-label="Close modal"
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!editingTopic.title.trim()) return;
                handleSaveTopic(editingTopic);
              }}
              className="mt-5 space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Research Topic Title
                </label>
                <input
                  type="text"
                  required
                  value={editingTopic.title}
                  onChange={(e) => setEditingTopic({ ...editingTopic, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Field / Category
                  </label>
                  <input
                    type="text"
                    value={editingTopic.category}
                    onChange={(e) => setEditingTopic({ ...editingTopic, category: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Current Status
                  </label>
                  <input
                    type="text"
                    value={editingTopic.status}
                    onChange={(e) => setEditingTopic({ ...editingTopic, status: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Topic Description
                </label>
                <textarea
                  rows={4}
                  value={editingTopic.description}
                  onChange={(e) => setEditingTopic({ ...editingTopic, description: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                {!isAddingTopic && (
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateOngoing(ongoing.filter((o) => o.id !== editingTopic.id));
                      setEditingTopic(null);
                    }}
                    className="mr-auto text-xs font-medium text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                  >
                    Remove Topic
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setEditingTopic(null);
                    setIsAddingTopic(false);
                  }}
                  className="rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-600 dark:bg-cyan-500 px-4 py-2 text-xs font-semibold text-white dark:text-slate-950 hover:bg-cyan-700 dark:hover:bg-cyan-400 cursor-pointer"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
