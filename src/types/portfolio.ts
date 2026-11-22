export type ResearchIconType =
  | 'materials'
  | 'computational'
  | 'semiconductor'
  | 'dft'
  | 'perovskite'
  | 'hydrogen'
  | 'double-halide'
  | 'superconductivity'
  | 'vlsi'
  | 'photonics'
  | 'quantum'
  | 'ml';

export type CertificateCategory =
  | 'research'
  | 'leadership'
  | 'technical';

export interface SocialLinks {
  linkedin: string;
  github: string;
  googleScholar: string;
  orcid: string;
}

export interface PersonalInfo {
  name: string;
  headline: string;
  intro: string;
  portraitUrl: string;
  email: string;
  phone: string;
  location: string;
  orcidId: string;
  contactFormEndpoint: string;
  aboutParagraphs: string[];
  researchVision: string;
}

export interface EditableStat {
  id: string;
  label: string;
  value: string;
  context: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  expectedGraduation?: string;
  gpa: string;
  notes?: string;
}

export interface ResearchInterest {
  id: string;
  title: string;
  domain: string;
  summary: string;
  keyConcepts: string[];
  icon: ResearchIconType;
}

export interface OngoingResearchTopic {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  focusNotes: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  classification: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  highlights?: string[];
}

export interface LeadershipItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  focus: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  defaultOpen: boolean;
  emptyNotice?: string;
  skills: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  level: string;
  year: string;
  description: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issuerGroup: string;
  category: CertificateCategory;
  featuredElsevier?: boolean;
  completedDate: string;
  presentedBy?: string;
  signedBy?: string;
  description?: string;
  verificationUrl?: string;
  imageUrl?: string;
  fileType?: 'image' | 'pdf';
  fileName?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: string;
  certification?: string;
  date?: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  social: SocialLinks;
  stats: EditableStat[];
  education: EducationItem[];
  researchInterests: ResearchInterest[];
  ongoingResearch: OngoingResearchTopic[];
  projects: ProjectItem[];
  leadership: LeadershipItem[];
  skills: SkillCategory[];
  achievements: AchievementItem[];
  certificates: CertificateItem[];
  languages: LanguageItem[];
}
