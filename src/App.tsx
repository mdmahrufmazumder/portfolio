import { useEffect, useState } from 'react';
import { DEFAULT_PORTFOLIO_DATA } from './data/portfolioData';
import type { PortfolioData } from './types/portfolio';
import {
  loadPortfolioData,
  resetPortfolioData,
  savePortfolioData
} from './utils/storage';
import { downloadPortfolioCvPdf } from './utils/cvGenerator';
import { ScientificCanvas } from './components/ScientificCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { ResearchSection } from './components/ResearchSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSkillsSection } from './components/ExperienceSkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { PortfolioEditorModal } from './components/PortfolioEditorModal';
import { CvPreviewModal } from './components/CvPreviewModal';

export default function App() {
  const [data, setData] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState('personal');
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadPortfolioData().then((loaded) => {
      if (mounted) {
        setData(loaded);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const updateAndPersist = (nextData: PortfolioData) => {
    setData(nextData);
    void savePortfolioData(nextData);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('mahruf_theme', nextTheme);
    } catch {
      // Ignore storage errors
    }
  };

  const handleOpenEditor = (tab = 'personal') => {
    setEditorTab(tab);
    setEditorOpen(true);
  };

  const handleReset = async () => {
    const defaults = await resetPortfolioData();
    setData(defaults);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-[#070A11] dark:text-slate-100 transition-colors duration-200">
      <ScientificCanvas theme={theme} />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar onDownloadCv={() => downloadPortfolioCvPdf(data)} />

        <main className="flex-1">
          <HeroSection
            personal={data.personal}
            social={data.social}
            stats={data.stats}
            theme={theme}
            onToggleTheme={toggleTheme}
            onDownloadCv={() => downloadPortfolioCvPdf(data)}
            onPreviewCv={() => setCvPreviewOpen(true)}
            onOpenEditor={handleOpenEditor}
            onUpdatePortrait={(portraitUrl) =>
              updateAndPersist({
                ...data,
                personal: { ...data.personal, portraitUrl }
              })
            }
          />

          <AboutSection
            personal={data.personal}
            languages={data.languages}
            onOpenEditor={handleOpenEditor}
          />

          <EducationSection
            education={data.education}
            achievements={data.achievements}
          />

          <ResearchSection
            interests={data.researchInterests}
            ongoing={data.ongoingResearch}
            onUpdateOngoing={(ongoingResearch) =>
              updateAndPersist({ ...data, ongoingResearch })
            }
          />

          <ProjectsSection
            projects={data.projects}
            onUpdateProjects={(projects) => updateAndPersist({ ...data, projects })}
          />

          <ExperienceSkillsSection
            leadership={data.leadership}
            skills={data.skills}
            onUpdateSkills={(skills) => updateAndPersist({ ...data, skills })}
          />

          <CertificationsSection
            certificates={data.certificates}
            onUpdateCertificates={(certificates) =>
              updateAndPersist({ ...data, certificates })
            }
          />

          <ContactSection
            personal={data.personal}
            social={data.social}
            onOpenEditor={handleOpenEditor}
          />
        </main>

        <Footer personal={data.personal} social={data.social} />
        <BackToTop />
      </div>

      {editorOpen && (
        <PortfolioEditorModal
          data={data}
          initialTab={editorTab}
          onSave={updateAndPersist}
          onReset={() => void handleReset()}
          onClose={() => setEditorOpen(false)}
        />
      )}

      {cvPreviewOpen && (
        <CvPreviewModal
          data={data}
          onDownloadPdf={() => downloadPortfolioCvPdf(data)}
          onClose={() => setCvPreviewOpen(false)}
        />
      )}
    </div>
  );
}
