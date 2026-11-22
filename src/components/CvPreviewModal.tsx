import { Download, Printer, X } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';

interface CvPreviewModalProps {
  data: PortfolioData;
  onDownloadPdf: () => void;
  onClose: () => void;
}

export function CvPreviewModal({ data, onDownloadPdf, onClose }: CvPreviewModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-preview-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm overflow-y-auto"
    >
      <div className="my-6 flex w-full max-w-4xl flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] shadow-2xl max-h-[90vh]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
          <h3 id="cv-preview-title" className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
            Academic Curriculum Vitae — Preview
          </h3>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-cyan-500 cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={onDownloadPdf}
              className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-600 dark:bg-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-white dark:text-slate-950 hover:bg-cyan-700 dark:hover:bg-cyan-400 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close CV preview"
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet */}
        <div className="flex-1 overflow-y-auto bg-slate-100 dark:bg-[#070A11] p-4 sm:p-8">
          <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 sm:p-10 text-slate-900 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-5">
              <h1 className="font-display text-2xl font-bold text-slate-950">
                {data.personal.name}
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {data.personal.headline}
              </p>
              <p className="mt-2 font-mono text-xs text-slate-600">
                {data.personal.email} · {data.personal.phone} · {data.personal.location} · ORCID: {data.personal.orcidId}
              </p>
            </div>

            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-800 border-b border-slate-200 pb-1">
                Research Profile
              </h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-700">
                {data.personal.intro}
              </p>
            </div>

            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-800 border-b border-slate-200 pb-1">
                Education
              </h2>
              <div className="mt-2.5 space-y-2.5 text-xs sm:text-sm">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex flex-wrap justify-between gap-2">
                    <div>
                      <p className="font-semibold text-slate-900">{edu.institution}</p>
                      <p className="text-slate-700">
                        {edu.degree}
                        {edu.expectedGraduation ? ` (${edu.expectedGraduation})` : ''}
                      </p>
                    </div>
                    <div className="text-right font-mono text-xs text-slate-600 tabular-nums">
                      <p>{edu.period}</p>
                      <p>{edu.gpa}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-800 border-b border-slate-200 pb-1">
                Research Interests &amp; Ongoing Topics
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-700">
                <span className="font-semibold">Interests:</span>{' '}
                {data.researchInterests.map((r) => r.title).join(', ')}.
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-700">
                <span className="font-semibold">Ongoing Research:</span>{' '}
                {data.ongoingResearch.map((o) => o.title).join(', ')}.
              </p>
            </div>

            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-800 border-b border-slate-200 pb-1">
                Leadership &amp; Extracurricular Activities
              </h2>
              <div className="mt-2.5 space-y-2 text-xs sm:text-sm">
                {data.leadership.map((item) => (
                  <div key={item.id} className="flex flex-wrap justify-between gap-2">
                    <p className="text-slate-800">
                      <span className="font-semibold">{item.role}</span> — {item.organization}
                    </p>
                    <span className="font-mono text-xs text-slate-600 tabular-nums">{item.period}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-800 border-b border-slate-200 pb-1">
                Certifications &amp; Language Proficiency
              </h2>
              <ul className="mt-2 space-y-1 text-xs text-slate-700">
                {data.certificates.map((cert) => (
                  <li key={cert.id}>
                    • <span className="font-medium">{cert.title}</span> — {cert.issuer} ({cert.completedDate})
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-xs text-slate-700">
                <span className="font-semibold">Languages:</span> English (IELTS Academic Overall Band 6.5, November 2023) · Bengali (Native)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
