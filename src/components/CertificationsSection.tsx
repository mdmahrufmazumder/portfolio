import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import {
  Award,
  Check,
  Download,
  ExternalLink,
  FileText,
  Maximize2,
  Minimize2,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import type { CertificateCategory, CertificateItem } from '../types/portfolio';
import { readFileAsDataUrl } from '../utils/storage';

interface CertificationsSectionProps {
  certificates: CertificateItem[];
  onUpdateCertificates: (certificates: CertificateItem[]) => void;
}

const CATEGORY_TABS: { id: 'all' | CertificateCategory; label: string }[] = [
  { id: 'all', label: 'All Certificates' },
  { id: 'research', label: 'Research Training' },
  { id: 'leadership', label: 'Leadership & Academic' },
  { id: 'technical', label: 'Technical & Professional' }
];

function CertificatePlatePreview({
  cert,
  compact = false
}: {
  cert: CertificateItem;
  compact?: boolean;
}) {
  if (cert.imageUrl && cert.fileType !== 'pdf') {
    return (
      <img
        src={cert.imageUrl}
        alt={`${cert.title} certificate from ${cert.issuer}`}
        referrerPolicy="no-referrer"
        className="h-full w-full object-contain"
      />
    );
  }

  if (cert.imageUrl && cert.fileType === 'pdf') {
    if (compact) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center p-5 text-center bg-slate-50 dark:bg-[#070A11]">
          <FileText className="h-9 w-9 text-cyan-600 dark:text-cyan-400" />
          <p className="mt-2.5 text-xs font-medium text-slate-800 dark:text-slate-100 line-clamp-2">
            {cert.fileName || `${cert.title}.pdf`}
          </p>
          <p className="mt-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            PDF Certificate Attached · Click to View
          </p>
        </div>
      );
    }
    return (
      <iframe
        src={cert.imageUrl}
        title={cert.title}
        className="h-[68vh] w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white"
      />
    );
  }

  // Honest, authentic Institutional Record Plate when no scan image/PDF has been uploaded yet
  return (
    <div
      className={`flex h-full w-full flex-col justify-between bg-slate-50 dark:bg-[#090E19] text-left ${
        compact ? 'p-5' : 'p-8 sm:p-12 max-w-3xl mx-auto rounded-xl border border-slate-200 dark:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
          {cert.issuerGroup}
        </p>
        <span className="font-mono text-[11px] tabular-nums text-slate-500 dark:text-slate-400">
          {cert.completedDate}
        </span>
      </div>

      <div className="my-auto py-3">
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Certificate Record
        </p>
        <h4
          className={`mt-1 font-display font-semibold text-slate-900 dark:text-slate-50 ${
            compact ? 'text-sm sm:text-base line-clamp-2' : 'text-xl sm:text-2xl'
          }`}
        >
          {cert.title}
        </h4>
        <p className={`mt-1.5 text-slate-600 dark:text-slate-300 ${compact ? 'text-xs line-clamp-2' : 'text-sm'}`}>
          {cert.issuer}
        </p>
        {cert.presentedBy && (
          <p className={`mt-2 text-slate-500 dark:text-slate-400 ${compact ? 'text-[11px]' : 'text-xs'}`}>
            Presented by: {cert.presentedBy}
          </p>
        )}
        {cert.signedBy && (
          <p className={`mt-2 text-slate-500 dark:text-slate-400 ${compact ? 'text-[11px]' : 'text-xs'}`}>
            Signed by: {cert.signedBy}
          </p>
        )}
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 pt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>Md. Mahruf Mazumder</span>
        <span>Upload image/PDF to preview scan</span>
      </div>
    </div>
  );
}

export function CertificationsSection({
  certificates,
  onUpdateCertificates
}: CertificationsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | CertificateCategory>('all');
  const [selectedIssuer, setSelectedIssuer] = useState<string>('all');
  const [viewingCert, setViewingCert] = useState<CertificateItem | null>(null);
  const [editingCert, setEditingCert] = useState<CertificateItem | null>(null);
  const [isNewCert, setIsNewCert] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement | null>(null);

  const issuerGroups = Array.from(new Set(certificates.map((c) => c.issuerGroup)));

  const filteredCertificates = certificates.filter((c) => {
    const matchCategory = activeCategory === 'all' || c.category === activeCategory;
    const matchIssuer = selectedIssuer === 'all' || c.issuerGroup === selectedIssuer;
    return matchCategory && matchIssuer;
  });

  const elsevierCerts = filteredCertificates.filter((c) => c.featuredElsevier);
  const otherCerts = filteredCertificates.filter((c) => !c.featuredElsevier);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setViewingCert(null);
        setEditingCert(null);
      }
    };
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement && viewerRef.current) {
        await viewerRef.current.requestFullscreen();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      // Fallback if fullscreen API restricted in iframe
      setIsFullscreen((prev) => !prev);
    }
  };

  const handleAttachFileToCert = async (certId: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const updated = certificates.map((c) =>
        c.id === certId
          ? {
              ...c,
              imageUrl: dataUrl,
              fileType: (isPdf ? 'pdf' : 'image') as 'pdf' | 'image',
              fileName: file.name
            }
          : c
      );
      onUpdateCertificates(updated);
      if (viewingCert && viewingCert.id === certId) {
        const refreshed = updated.find((c) => c.id === certId) || null;
        setViewingCert(refreshed);
      }
    } catch {
      // Ignore read errors
    }
    e.target.value = '';
  };

  const handleEditFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingCert) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      setEditingCert({
        ...editingCert,
        imageUrl: dataUrl,
        fileType: isPdf ? 'pdf' : 'image',
        fileName: file.name
      });
    } catch {
      // Ignore
    }
    e.target.value = '';
  };

  const openAddCertificate = () => {
    setEditingCert({
      id: `cert-${Date.now()}`,
      title: '',
      issuer: '',
      issuerGroup: '',
      category: 'research',
      completedDate: '',
      description: ''
    });
    setIsNewCert(true);
  };

  const saveCertificateForm = () => {
    if (!editingCert || !editingCert.title.trim() || !editingCert.issuer.trim()) return;
    const normalized: CertificateItem = {
      ...editingCert,
      issuerGroup: editingCert.issuerGroup.trim() || editingCert.issuer.trim()
    };
    if (isNewCert) {
      onUpdateCertificates([normalized, ...certificates]);
    } else {
      onUpdateCertificates(
        certificates.map((c) => (c.id === normalized.id ? normalized : c))
      );
      if (viewingCert?.id === normalized.id) {
        setViewingCert(normalized);
      }
    }
    setEditingCert(null);
  };

  const renderCertificateCard = (cert: CertificateItem, highlighted = false) => (
    <article
      key={cert.id}
      className={`flex flex-col overflow-hidden rounded-2xl border bg-white dark:bg-[#0D1320] transition-colors ${
        highlighted
          ? 'border-cyan-500/40 dark:border-cyan-500/40'
          : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      {/* Clickable Certificate Preview Area */}
      <button
        type="button"
        onClick={() => {
          setZoom(1);
          setViewingCert(cert);
        }}
        className="print-keep group relative aspect-[4/3] w-full overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#070A11] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
      >
        <CertificatePlatePreview cert={cert} compact />
        <div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/15">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-900/85 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Maximize2 className="h-3 w-3" />
            <span>Inspect</span>
          </span>
        </div>
      </button>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex items-start justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>{cert.issuerGroup}</span>
            <span className="tabular-nums shrink-0">{cert.completedDate}</span>
          </div>

          <h3 className="mt-2 font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
            {cert.title}
          </h3>

          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {cert.issuer}
          </p>

          {(cert.presentedBy || cert.signedBy) && (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {cert.presentedBy
                ? `Presented by: ${cert.presentedBy}`
                : `Signed by: ${cert.signedBy}`}
            </p>
          )}

          {cert.description && (
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {cert.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setViewingCert(cert);
              }}
              className="text-xs font-medium text-cyan-700 dark:text-cyan-400 hover:underline cursor-pointer"
            >
              Open Viewer
            </button>

            <label className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer">
              <Upload className="h-3 w-3" />
              <span>{cert.imageUrl ? 'Replace File' : 'Upload Image/PDF'}</span>
              <input
                type="file"
                accept="image/*,.pdf,application/pdf"
                onChange={(e) => handleAttachFileToCert(cert.id, e)}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingCert({ ...cert });
              setIsNewCert(false);
            }}
            aria-label={`Edit ${cert.title}`}
            className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
          >
            <Pencil className="h-3.5 w-3.5" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </article>
  );

  return (
    <section id="certifications" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">
              <Award className="h-4 w-4" />
              <span>Academic &amp; Professional Credentials</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Certifications &amp; Professional Development
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Verified training in systematic literature research, leadership development, sustainability, and AI engineering. Click any certificate to inspect fullscreen or upload your certificate file.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddCertificate}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-cyan-600 dark:bg-cyan-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white dark:text-slate-950 hover:bg-cyan-700 dark:hover:bg-cyan-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Certificate</span>
          </button>
        </div>

        {/* Filter Bar: Segmented Category Tabs + Issuer Select */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter certificates by category"
            className="flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0D1320] p-1"
          >
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === tab.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="issuer-filter" className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Organization:
            </label>
            <select
              id="issuer-filter"
              value={selectedIssuer}
              onChange={(e) => setSelectedIssuer(e.target.value)}
              className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0D1320] px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
            >
              <option value="all">All Issuing Organizations</option>
              {issuerGroups.map((issuer) => (
                <option key={issuer} value={issuer}>
                  {issuer}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Special Featured Group: Research Training – Elsevier */}
        {elsevierCerts.length > 0 && (
          <div className="mt-10 rounded-2xl border border-cyan-500/30 bg-cyan-500/[0.03] dark:bg-cyan-500/[0.04] p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                  Featured Academic Methodology Credentials
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-slate-900 dark:text-slate-50">
                  Research Training – Elsevier
                </h3>
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                {elsevierCerts.length} {elsevierCerts.length === 1 ? 'Certificate' : 'Certificates'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {elsevierCerts.map((cert) => renderCertificateCard(cert, true))}
            </div>
          </div>
        )}

        {/* Remaining Filtered Certificates */}
        {otherCerts.length > 0 && (
          <div className="mt-10">
            <div className="mb-5 flex items-baseline justify-between">
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                Leadership, Sustainability &amp; Technical Development
              </h3>
              <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                {otherCerts.length} {otherCerts.length === 1 ? 'Certificate' : 'Certificates'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCerts.map((cert) => renderCertificateCard(cert, false))}
            </div>
          </div>
        )}

        {filteredCertificates.length === 0 && (
          <div className="mt-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-10 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              No certificates match the current filter selection.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSelectedIssuer('all');
              }}
              className="mt-3 text-xs font-medium text-cyan-700 dark:text-cyan-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Lightbox & Fullscreen Document Viewer Modal */}
      {viewingCert && (
        <div
          ref={viewerRef}
          role="dialog"
          aria-modal="true"
          aria-label={viewingCert.title}
          className={`fixed inset-0 z-50 flex flex-col bg-slate-950/92 backdrop-blur-md ${
            isFullscreen ? 'p-4 sm:p-6' : 'p-4 sm:p-8'
          }`}
        >
          {/* Viewer Top Controls */}
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 border-b border-slate-800 pb-4 text-slate-100">
            <div className="min-w-0">
              <p className="font-mono text-xs text-cyan-400 truncate">
                {viewingCert.issuer} · {viewingCert.completedDate}
              </p>
              <h3 className="font-display text-base sm:text-lg font-semibold truncate">
                {viewingCert.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {viewingCert.fileType !== 'pdf' && viewingCert.imageUrl && (
                <>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.max(0.75, +(z - 0.25).toFixed(2)))}
                    aria-label="Zoom out"
                    className="rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-200 hover:border-cyan-500 cursor-pointer"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="font-mono text-xs tabular-nums w-12 text-center text-slate-300">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.min(2.25, +(z + 0.25).toFixed(2)))}
                    aria-label="Zoom in"
                    className="rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-200 hover:border-cyan-500 cursor-pointer"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </>
              )}

              {viewingCert.imageUrl && (
                <a
                  href={viewingCert.imageUrl}
                  download={
                    viewingCert.fileName ||
                    `${viewingCert.title.replace(/[^a-zA-Z0-9]+/g, '_')}.${
                      viewingCert.fileType === 'pdf' ? 'pdf' : 'png'
                    }`
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 hover:border-cyan-500"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              )}

              <label className="no-print inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 hover:border-cyan-500 cursor-pointer">
                <Upload className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  {viewingCert.imageUrl ? 'Replace File' : 'Upload Scan/PDF'}
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf,application/pdf"
                  onChange={(e) => handleAttachFileToCert(viewingCert.id, e)}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 hover:border-cyan-500 cursor-pointer"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (document.fullscreenElement) {
                    document.exitFullscreen().catch(() => {});
                  }
                  setViewingCert(null);
                }}
                aria-label="Close certificate viewer"
                className="rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-200 hover:border-rose-500 hover:text-rose-400 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Viewer Main Canvas */}
          <div className="mx-auto my-auto flex w-full max-w-6xl flex-1 items-center justify-center overflow-auto py-6">
            <div
              style={
                viewingCert.fileType !== 'pdf' && viewingCert.imageUrl
                  ? { transform: `scale(${zoom})`, transformOrigin: 'center center' }
                  : undefined
              }
              className="w-full max-h-full transition-transform duration-150 flex items-center justify-center"
            >
              {viewingCert.imageUrl && viewingCert.fileType !== 'pdf' ? (
                <img
                  src={viewingCert.imageUrl}
                  alt={viewingCert.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[74vh] w-auto max-w-full rounded-lg border border-slate-800 object-contain shadow-2xl"
                />
              ) : (
                <div className="w-full">
                  <CertificatePlatePreview cert={viewingCert} />
                </div>
              )}
            </div>
          </div>

          {/* Viewer Footer Metadata */}
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-4 text-xs text-slate-300">
            <div className="space-y-1">
              {viewingCert.description && <p>{viewingCert.description}</p>}
              {(viewingCert.presentedBy || viewingCert.signedBy) && (
                <p className="text-slate-400">
                  {viewingCert.presentedBy
                    ? `Presented by: ${viewingCert.presentedBy}`
                    : `Signed by: ${viewingCert.signedBy}`}
                </p>
              )}
            </div>

            {viewingCert.verificationUrl && (
              <a
                href={viewingCert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/50 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/10"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Verify Credential</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Certificate Modal */}
      {editingCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto"
        >
          <div className="my-8 w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1320] p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 id="cert-modal-title" className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                {isNewCert ? 'Add Certificate' : 'Edit Certificate Details'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingCert(null)}
                aria-label="Close modal"
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveCertificateForm();
              }}
              className="mt-5 space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Course / Certificate Title
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Issuing Organization (Full)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCert.issuer}
                    onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Organization Filter Group
                  </label>
                  <input
                    type="text"
                    value={editingCert.issuerGroup}
                    onChange={(e) => setEditingCert({ ...editingCert, issuerGroup: e.target.value })}
                    placeholder="e.g. Elsevier, IEEE, MITx"
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={editingCert.category}
                    onChange={(e) =>
                      setEditingCert({
                        ...editingCert,
                        category: e.target.value as CertificateCategory
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="research">Research Training</option>
                    <option value="leadership">Leadership &amp; Academic</option>
                    <option value="technical">Technical &amp; Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Completion Date
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCert.completedDate}
                    onChange={(e) =>
                      setEditingCert({ ...editingCert, completedDate: e.target.value })
                    }
                    placeholder="e.g. June 25, 2026"
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Presented / Signed By (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingCert.presentedBy || editingCert.signedBy || ''}
                    onChange={(e) =>
                      setEditingCert({
                        ...editingCert,
                        presentedBy: e.target.value,
                        signedBy: undefined
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Official Verification URL (Only if real)
                  </label>
                  <input
                    type="url"
                    value={editingCert.verificationUrl || ''}
                    onChange={(e) =>
                      setEditingCert({ ...editingCert, verificationUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={editingCert.description || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#070A11] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Certificate File (Image or PDF)
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-cyan-500 cursor-pointer">
                    <Upload className="h-4 w-4" />
                    <span>Upload PNG / JPG / PDF</span>
                    <input
                      type="file"
                      accept="image/*,.pdf,application/pdf"
                      onChange={handleEditFileUpload}
                      className="hidden"
                    />
                  </label>
                  {editingCert.imageUrl && (
                    <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                      {editingCert.fileName || 'File attached'}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                {!isNewCert && (
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateCertificates(
                        certificates.filter((c) => c.id !== editingCert.id)
                      );
                      setEditingCert(null);
                    }}
                    className="mr-auto inline-flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Remove Certificate</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-600 dark:bg-cyan-500 px-4 py-2 text-xs font-semibold text-white dark:text-slate-950 hover:bg-cyan-700 dark:hover:bg-cyan-400 cursor-pointer"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Save Certificate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
