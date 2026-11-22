import { useState, type ChangeEvent } from 'react';
import { Check, Download, RotateCcw, Upload, X } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';
import { exportPortfolioJSON } from '../utils/storage';

interface PortfolioEditorModalProps {
  data: PortfolioData;
  initialTab?: string;
  onSave: (nextData: PortfolioData) => void;
  onReset: () => void;
  onClose: () => void;
}

export function PortfolioEditorModal({
  data,
  initialTab = 'personal',
  onSave,
  onReset,
  onClose
}: PortfolioEditorModalProps) {
  const [tab, setTab] = useState(initialTab);
  const [draft, setDraft] = useState<PortfolioData>(() =>
    JSON.parse(JSON.stringify(data)) as PortfolioData
  );
  const [importError, setImportError] = useState('');

  const handleImportJson = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as PortfolioData;
      if (!parsed.personal || !parsed.education) {
        setImportError('Invalid portfolio JSON structure.');
        return;
      }
      setDraft(parsed);
      setImportError('');
    } catch {
      setImportError('Failed to parse JSON file.');
    }
    e.target.value = '';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-editor-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm overflow-y-auto"
    >
      <div className="my-8 flex w-full max-w-3xl flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] shadow-2xl max-h-[88vh]">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
          <div>
            <h3 id="portfolio-editor-title" className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
              Portfolio Data Manager
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Changes save locally in your browser and can be exported to JSON for deployment.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close editor"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Editor Tabs */}
        <div className="flex flex-wrap gap-1 border-b border-slate-200 dark:border-slate-800 px-6 py-2.5 bg-slate-50 dark:bg-[#070A11]">
          {[
            { id: 'personal', label: 'Personal & Bio' },
            { id: 'social', label: 'Social & Contact' },
            { id: 'stats', label: 'Key Statistics' },
            { id: 'backup', label: 'Export / Import' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                tab === item.id
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {tab === 'personal' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={draft.personal.name}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personal: { ...draft.personal, name: e.target.value }
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    ORCID Identifier
                  </label>
                  <input
                    type="text"
                    value={draft.personal.orcidId}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personal: { ...draft.personal, orcidId: e.target.value }
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 font-mono text-sm text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Professional Headline
                </label>
                <input
                  type="text"
                  value={draft.personal.headline}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: { ...draft.personal, headline: e.target.value }
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Hero Introduction
                </label>
                <textarea
                  rows={3}
                  value={draft.personal.intro}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: { ...draft.personal, intro: e.target.value }
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Biography Paragraphs (separated by blank line)
                </label>
                <textarea
                  rows={6}
                  value={draft.personal.aboutParagraphs.join('\n\n')}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: {
                        ...draft.personal,
                        aboutParagraphs: e.target.value
                          .split(/\n\s*\n/)
                          .map((p) => p.trim())
                          .filter(Boolean)
                      }
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          )}

          {tab === 'social' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={draft.personal.email}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personal: { ...draft.personal, email: e.target.value }
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={draft.personal.phone}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        personal: { ...draft.personal, phone: e.target.value }
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 font-mono text-sm text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={draft.social.linkedin}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      social: { ...draft.social, linkedin: e.target.value }
                    })
                  }
                  placeholder="https://www.linkedin.com/in/..."
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={draft.social.github}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      social: { ...draft.social, github: e.target.value }
                    })
                  }
                  placeholder="https://github.com/..."
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Google Scholar Profile URL
                </label>
                <input
                  type="url"
                  value={draft.social.googleScholar}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      social: { ...draft.social, googleScholar: e.target.value }
                    })
                  }
                  placeholder="https://scholar.google.com/citations?user=..."
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  ORCID Profile URL
                </label>
                <input
                  type="url"
                  value={draft.social.orcid}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      social: { ...draft.social, orcid: e.target.value }
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Formspree / Web3Forms Endpoint URL (Optional for Static Deployment)
                </label>
                <input
                  type="url"
                  value={draft.personal.contactFormEndpoint}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: {
                        ...draft.personal,
                        contactFormEndpoint: e.target.value
                      }
                    })
                  }
                  placeholder="https://formspree.io/f/your-form-id"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          )}

          {tab === 'stats' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Edit the 4 academic highlight figures displayed below the Hero section.
              </p>
              {draft.stats.map((stat, idx) => (
                <div
                  key={stat.id}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl border border-slate-200 dark:border-slate-800 p-4"
                >
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const next = [...draft.stats];
                        next[idx] = { ...stat, label: e.target.value };
                        setDraft({ ...draft, stats: next });
                      }}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-2.5 py-1.5 text-xs text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Value
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const next = [...draft.stats];
                        next[idx] = { ...stat, value: e.target.value };
                        setDraft({ ...draft, stats: next });
                      }}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-2.5 py-1.5 font-mono text-xs text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Context
                    </label>
                    <input
                      type="text"
                      value={stat.context}
                      onChange={(e) => {
                        const next = [...draft.stats];
                        next[idx] = { ...stat, context: e.target.value };
                        setDraft({ ...draft, stats: next });
                      }}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-2.5 py-1.5 text-xs text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'backup' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-3">
                <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Export Portfolio Configuration
                </h4>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Download a complete JSON snapshot of your edited text, links, projects, and uploaded certificate files to back up or commit to your GitHub Pages / Vercel repository.
                </p>
                <button
                  type="button"
                  onClick={() => exportPortfolioJSON(draft)}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-cyan-500 px-4 py-2 text-xs font-semibold text-white dark:text-slate-950 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export JSON Snapshot</span>
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-3">
                <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Import JSON Snapshot
                </h4>
                <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-cyan-500 cursor-pointer">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Choose JSON File</span>
                  <input
                    type="file"
                    accept="application/json,.json"
                    onChange={handleImportJson}
                    className="hidden"
                  />
                </label>
                {importError && (
                  <p className="text-xs text-rose-500">{importError}</p>
                )}
              </div>

              <div className="rounded-xl border border-rose-500/30 p-5 space-y-3">
                <h4 className="font-display text-sm font-semibold text-rose-600 dark:text-rose-400">
                  Restore Original Defaults
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Clears local browser edits and restores the initial portfolio dataset.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onReset();
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-rose-500/50 px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset to Default Data</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave(draft);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-600 dark:bg-cyan-500 px-5 py-2 text-xs font-semibold text-white dark:text-slate-950 hover:bg-cyan-700 dark:hover:bg-cyan-400 cursor-pointer"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Save &amp; Apply</span>
          </button>
        </div>
      </div>
    </div>
  );
}
