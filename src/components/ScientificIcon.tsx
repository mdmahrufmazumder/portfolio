import type { ResearchIconType } from '../types/portfolio';

interface ScientificIconProps {
  type: ResearchIconType;
  className?: string;
}

export function ScientificIcon({ type, className = 'w-10 h-10' }: ScientificIconProps) {
  switch (type) {
    case 'materials':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <polygon points="24,6 40,15 40,33 24,42 8,33 8,15" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.45" />
          <line x1="24" y1="6" x2="24" y2="24" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.6" />
          <line x1="40" y1="33" x2="24" y2="24" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.6" />
          <line x1="8" y1="33" x2="24" y2="24" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.6" />
          <circle cx="24" cy="6" r="2.5" fill="currentColor" />
          <circle cx="40" cy="15" r="2.5" fill="currentColor" fillOpacity="0.65" />
          <circle cx="8" cy="15" r="2.5" fill="currentColor" fillOpacity="0.65" />
          <circle cx="24" cy="24" r="3.2" fill="currentColor" />
          <circle cx="24" cy="42" r="2.5" fill="currentColor" fillOpacity="0.65" />
        </svg>
      );
    case 'computational':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.4" />
          <path d="M13 18h22M13 24h22M13 30h22M18 13v22M24 13v22M30 13v22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="18" cy="18" r="2.4" fill="currentColor" />
          <circle cx="30" cy="24" r="2.4" fill="currentColor" />
          <circle cx="24" cy="30" r="2.4" fill="currentColor" />
          <path d="M18 18L30 24L24 30" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'semiconductor':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <line x1="8" y1="14" x2="40" y2="14" stroke="currentColor" strokeWidth="1.6" />
          <line x1="8" y1="34" x2="40" y2="34" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 24h24" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.55" />
          <circle cx="18" cy="14" r="2.5" fill="currentColor" />
          <circle cx="30" cy="34" r="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M24 31V17m0 0l-3 3m3-3l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'dft':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <ellipse cx="24" cy="24" rx="17" ry="9" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.45" />
          <ellipse cx="24" cy="24" rx="12" ry="6" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.7" />
          <path d="M8 24c4-9 10-9 16 0s12 9 16 0" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="24" cy="24" r="2.5" fill="currentColor" />
        </svg>
      );
    case 'perovskite':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="10" y="10" width="28" height="28" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.45" />
          <polygon points="24,11 37,24 24,37 11,24" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
          <circle cx="10" cy="10" r="2.2" fill="currentColor" />
          <circle cx="38" cy="10" r="2.2" fill="currentColor" />
          <circle cx="10" cy="38" r="2.2" fill="currentColor" />
          <circle cx="38" cy="38" r="2.2" fill="currentColor" />
          <circle cx="24" cy="24" r="3" fill="currentColor" />
        </svg>
      );
    case 'hydrogen':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <circle cx="18" cy="24" r="7" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="30" cy="24" r="7" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="24" r="2.2" fill="currentColor" />
          <circle cx="30" cy="24" r="2.2" fill="currentColor" />
          <path d="M24 10v5M24 33v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.55" />
        </svg>
      );
    case 'double-halide':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="8" y="14" width="16" height="16" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.5" />
          <rect x="24" y="18" width="16" height="16" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.8" />
          <circle cx="16" cy="22" r="2.6" fill="currentColor" />
          <circle cx="32" cy="26" r="2.6" stroke="currentColor" strokeWidth="1.8" />
          <line x1="18.6" y1="22.8" x2="29.4" y2="25.2" stroke="currentColor" strokeWidth="1.3" strokeDasharray="2 2" />
        </svg>
      );
    case 'superconductivity':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path d="M8 28c6-12 26-12 32 0" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.45" />
          <path d="M8 20c6 12 26 12 32 0" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.45" />
          <circle cx="18" cy="24" r="2.8" fill="currentColor" />
          <circle cx="30" cy="24" r="2.8" fill="currentColor" />
          <path d="M21 24h6" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2 2" />
        </svg>
      );
    case 'vlsi':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="14" y="14" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="19" y="19" width="10" height="10" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
          <path d="M18 8v6M24 8v6M30 8v6M18 34v6M24 34v6M30 34v6M8 18h6M8 24h6M8 30h6M34 18h6M34 24h6M34 30h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case 'photonics':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="8" y="18" width="32" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.45" />
          <path d="M8 24l8-5 8 10 8-10 8 5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <circle cx="40" cy="24" r="2.4" fill="currentColor" />
        </svg>
      );
    case 'quantum':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.55" />
          <ellipse cx="24" cy="24" rx="15" ry="5.5" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.5" />
          <path d="M24 24L33 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="33" cy="13" r="2.3" fill="currentColor" />
        </svg>
      );
    case 'ml':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <circle cx="11" cy="15" r="2.4" fill="currentColor" />
          <circle cx="11" cy="33" r="2.4" fill="currentColor" />
          <circle cx="24" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="24" cy="24" r="2.4" fill="currentColor" />
          <circle cx="24" cy="36" r="2.4" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="37" cy="24" r="2.8" fill="currentColor" />
          <path d="M13 15l9-3M13 15l9 9M13 33l9-9M13 33l9 3M26 12l9 11M26 24h9M26 36l9-11" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.55" />
        </svg>
      );
  }
}
