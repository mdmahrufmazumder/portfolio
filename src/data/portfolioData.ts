import type { PortfolioData } from '../types/portfolio';

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: 'Md. Mahruf Mazumder',
    headline: 'Aspiring Researcher | EEE Undergraduate | Materials Science Enthusiast',
    intro:
      'I am an ambitious undergraduate with a strong interest in scientific research, emerging technologies, and interdisciplinary innovation. My academic interests span computational materials science, semiconductor technology, quantum computing, and advanced energy materials. I am passionate about exploring scientific challenges and contributing to meaningful research.',
    portraitUrl: '/src/assets/images/hero_researcher_portrait_1795332462169.jpg',
    email: 'mdmahrufmazumder@gmail.com',
    phone: '+8801615787160',
    location: 'Parshuram, Feni, Bangladesh',
    orcidId: '0009-0007-7896-6672',
    contactFormEndpoint: '',
    aboutParagraphs: [
      'As an undergraduate student in the Department of Electrical and Electronic Engineering at Feni University, my academic trajectory is driven by an enduring curiosity about how fundamental physics and materials engineering shape next-generation electronic, photonic, and energy systems.',
      'Beyond core coursework, I actively cultivate formal research methodology—completing foundational training through Elsevier Researcher Academy and Scopus Academy—while building hands-on hardware prototypes and software tools. My goal is to bridge electrical engineering with computational materials science and condensed-matter physics.',
      'Through leadership roles at the Feni University Innovation Hub, EEE Career Forum, YouthMappers at Feni University, and International Youth Change Maker, I work closely with peers to foster collaborative inquiry, student research culture, and community-focused technological initiatives. Long term, I aspire to pursue advanced graduate studies and contribute rigorous, impactful work to the global scientific community.'
    ],
    researchVision:
      'Preparing for graduate research at the intersection of electronic devices, first-principles materials simulation, clean energy conversion, and quantum information hardware.'
  },
  social: {
    linkedin: '',
    github: '',
    googleScholar: '',
    orcid: 'https://orcid.org/0009-0007-7896-6672'
  },
  stats: [
    {
      id: 'stat-gpa',
      label: 'Current Undergraduate GPA',
      value: '3.89',
      context: 'BSc in EEE · Feni University'
    },
    {
      id: 'stat-ielts',
      label: 'IELTS Academic',
      value: '6.5',
      context: 'Overall Band · Nov 2023'
    },
    {
      id: 'stat-interests',
      label: 'Research Focus Areas',
      value: '12',
      context: 'Materials, Quantum & EEE'
    },
    {
      id: 'stat-certs',
      label: 'Completed Certifications',
      value: '9',
      context: 'Elsevier, UNU-IAS, Aspire & Tech'
    }
  ],
  education: [
    {
      id: 'edu-feni',
      institution: 'Feni University',
      degree: 'Bachelor of Science in Electrical and Electronic Engineering (BSc in EEE)',
      period: '2025 – Present',
      expectedGraduation: 'Expected Graduation: 2028',
      gpa: 'Current GPA: 3.89',
      notes: 'Undergraduate focus on circuits, electronics, electromagnetics, and emerging research foundations.'
    },
    {
      id: 'edu-hsc',
      institution: 'Joynal Hazari College',
      degree: 'Higher Secondary Certificate (HSC)',
      period: '2022',
      gpa: 'GPA: 5.00',
      notes: 'Science track with strong grounding in physics, chemistry, and higher mathematics.'
    },
    {
      id: 'edu-ssc',
      institution: 'Parshuram Model Pilot High School',
      degree: 'Secondary School Certificate (SSC)',
      period: '2020',
      gpa: 'GPA: 5.00',
      notes: 'Awarded Government Scholarship for academic merit.'
    }
  ],
  researchInterests: [
    {
      id: 'ri-materials',
      title: 'Materials Science',
      domain: 'Structure–Property Relationships',
      summary: 'Investigating atomic structure, bonding, defects, and macroscopic electronic or optical behavior in engineered solids.',
      keyConcepts: ['Crystallography', 'Band Structure', 'Defect Physics'],
      icon: 'materials'
    },
    {
      id: 'ri-comp-materials',
      title: 'Computational Materials Science',
      domain: 'In-Silico Discovery',
      summary: 'Using quantum-mechanical and atomistic simulation frameworks to predict material stability and functional properties prior to synthesis.',
      keyConcepts: ['First-Principles Modeling', 'Electronic DOS', 'Materials Screening'],
      icon: 'computational'
    },
    {
      id: 'ri-semiconductor',
      title: 'Semiconductor Physics and Materials',
      domain: 'Carrier Transport & Junctions',
      summary: 'Exploring carrier dynamics, bandgap engineering, and novel compound semiconductors for high-efficiency microelectronic devices.',
      keyConcepts: ['Bandgap Tuning', 'Carrier Mobility', 'Heterostructures'],
      icon: 'semiconductor'
    },
    {
      id: 'ri-dft',
      title: 'Density Functional Theory (DFT)',
      domain: 'Quantum Electronic Structure',
      summary: 'Applying Kohn–Sham electronic structure theory to evaluate formation energies, optical absorption spectra, and mechanical tensors.',
      keyConcepts: ['Exchange-Correlation', 'Kohn–Sham Orbitals', 'Lattice Optimization'],
      icon: 'dft'
    },
    {
      id: 'ri-perovskite',
      title: 'Perovskite Solar Cells',
      domain: 'Photovoltaic Energy Conversion',
      summary: 'Studying absorber stability, charge-transport interfaces, and lead-free compositions for next-generation thin-film photovoltaics.',
      keyConcepts: ['ABX₃ Lattice', 'Absorption Coefficient', 'Photovoltaic Efficiency'],
      icon: 'perovskite'
    },
    {
      id: 'ri-hydrogen',
      title: 'Hydrogen Storage Materials',
      domain: 'Clean Energy Vectors',
      summary: 'Examining solid-state hydrides and porous nanostructures capable of reversible, safe, and high-capacity hydrogen uptake.',
      keyConcepts: ['Gravimetric Capacity', 'Desorption Kinetics', 'Metal Hydrides'],
      icon: 'hydrogen'
    },
    {
      id: 'ri-double-halide',
      title: 'Double Halide Perovskites',
      domain: 'Lead-Free Optoelectronics',
      summary: 'Exploring A₂B′B″X₆ quaternary halide crystals offering non-toxic chemical stability and tunable optoelectronic behavior.',
      keyConcepts: ['A₂B′B″X₆ Symmetry', 'Optical Transitions', 'Thermal Stability'],
      icon: 'double-halide'
    },
    {
      id: 'ri-superconductivity',
      title: 'Superconductivity',
      domain: 'Zero-Resistance Quantum Phases',
      summary: 'Exploring electron–phonon coupling, critical temperatures, and superconducting materials relevant to energy and quantum hardware.',
      keyConcepts: ['Cooper Pairing', 'Meissner Effect', 'Critical Temperature'],
      icon: 'superconductivity'
    },
    {
      id: 'ri-vlsi',
      title: 'VLSI Design',
      domain: 'Integrated Circuit Architecture',
      summary: 'Studying CMOS scaling, digital logic synthesis, low-power circuit topologies, and hardware layout considerations.',
      keyConcepts: ['CMOS Logic', 'Low-Power Design', 'Physical Layout'],
      icon: 'vlsi'
    },
    {
      id: 'ri-photonics',
      title: 'Photonics',
      domain: 'Light–Matter Interaction',
      summary: 'Investigating optical waveguides, photonic crystals, and optoelectronic devices bridging light generation and detection.',
      keyConcepts: ['Optical Waveguides', 'Photonic Bandgap', 'Optoelectronics'],
      icon: 'photonics'
    },
    {
      id: 'ri-quantum',
      title: 'Quantum Computing',
      domain: 'Quantum Information Hardware',
      summary: 'Exploring physical qubit modalities, coherence preservation, quantum gates, and the materials challenges of quantum processors.',
      keyConcepts: ['Superconducting Qubits', 'Decoherence', 'Quantum Gates'],
      icon: 'quantum'
    },
    {
      id: 'ri-ml',
      title: 'Machine Learning',
      domain: 'Data-Driven Scientific Discovery',
      summary: 'Integrating statistical learning and surrogate models with materials datasets and engineering signal analysis.',
      keyConcepts: ['Property Prediction', 'Pattern Recognition', 'Scientific AI'],
      icon: 'ml'
    }
  ],
  ongoingResearch: [
    {
      id: 'or-symbiotic-meta',
      title: 'Symbiotic Meta Antenna',
      category: 'RF & Metamaterial Electromagnetics',
      status: 'Ongoing Research Topic',
      description:
        'Exploratory study on metamaterial-inspired antenna architectures designed for adaptive electromagnetic radiation characteristics and compact wireless integration.',
      focusNotes: 'Topic details, simulation parameters, and future findings can be updated directly as progress advances.'
    },
    {
      id: 'or-microstrip-patch',
      title: 'Microstrip Patch Antenna',
      category: 'Planar RF & Microwave Engineering',
      status: 'Ongoing Research Topic',
      description:
        'Investigation of planar microstrip patch geometries, substrate permittivity trade-offs, and impedance-matching techniques for wireless communication bands.',
      focusNotes: 'Editable workspace entry for tracking substrate selection and return-loss studies.'
    },
    {
      id: 'or-dft',
      title: 'Density Functional Theory (DFT)',
      category: 'Computational Electronic Structure',
      status: 'Ongoing Research Topic',
      description:
        'Foundational computational study applying Density Functional Theory frameworks to examine structural, electronic, and optical properties of functional crystals.',
      focusNotes: 'Editable entry prepared for future computational benchmark documentation.'
    },
    {
      id: 'or-perovskite',
      title: 'Perovskite Solar Cells',
      category: 'Photovoltaics & Optoelectronics',
      status: 'Ongoing Research Topic',
      description:
        'Ongoing literature and theoretical exploration of perovskite absorber materials, band alignment, and environmentally resilient photovoltaic architectures.',
      focusNotes: 'Editable record for tracking absorber candidates and device-layer literature reviews.'
    },
    {
      id: 'or-hydrogen',
      title: 'Hydrogen Storage',
      category: 'Clean Energy Materials',
      status: 'Ongoing Research Topic',
      description:
        'Study of solid-state hydrogen storage media, thermodynamic binding behavior, and lightweight material candidates for sustainable energy systems.',
      focusNotes: 'Editable topic card for logging candidate compounds and capacity benchmarks.'
    },
    {
      id: 'or-double-halide',
      title: 'Double Halide Materials',
      category: 'Lead-Free Semiconductor Crystals',
      status: 'Ongoing Research Topic',
      description:
        'Exploration of lead-free double halide perovskite compounds with tailored electronic bandgaps and enhanced environmental stability.',
      focusNotes: 'Editable topic card ready for structural and optoelectronic study updates.'
    },
    {
      id: 'or-superconductivity',
      title: 'Superconductivity',
      category: 'Quantum & Condensed-Matter Physics',
      status: 'Ongoing Research Topic',
      description:
        'Ongoing study of superconducting phase behavior, critical phenomena, and material systems relevant to lossless transport and quantum technologies.',
      focusNotes: 'Editable topic card ready for theoretical notes and review milestones.'
    }
  ],
  projects: [
    {
      id: 'proj-mediscan',
      title: 'MediScan Mobile App',
      classification: 'Beta Version · Healthcare Application',
      description:
        'A healthcare application designed to scan and provide basic medical information through a simple and user-friendly interface.',
      technologies: ['Mobile Interface Design', 'Optical Scan Workflow', 'Medical Information Access'],
      imageUrl: '/src/assets/images/project_mediscan_app_1795332463293.jpg',
      githubUrl: '',
      demoUrl: '',
      highlights: [
        'Clean, accessible scan-first interface tailored for quick everyday medical lookup.',
        'Focused on clarity and low-friction user interaction during Beta iteration.'
      ]
    },
    {
      id: 'proj-lfr',
      title: 'Line Follower Robot',
      classification: 'Academic Project · Embedded Systems & Robotics',
      description:
        'Developed an autonomous line-following robot integrating real-time optical reflectance sensing and dual-channel motor control, demonstrating practical hardware integration and embedded control.',
      technologies: ['Arduino Nano', 'QTR-8RC Sensor Array', 'TB6612FNG Motor Driver', 'Embedded C/C++'],
      imageUrl: '/src/assets/images/project_line_follower_1795332464372.jpg',
      githubUrl: '',
      demoUrl: '',
      highlights: [
        'Arduino Nano microcontroller processing multi-channel QTR-8RC infrared reflectance readings.',
        'TB6612FNG dual H-bridge driver delivering responsive differential wheel speed control.'
      ]
    }
  ],
  leadership: [
    {
      id: 'lead-fuihub',
      organization: 'Feni University Innovation Hub',
      role: 'Organizing Secretary – Innovation & Research',
      period: 'June 2026 – Present',
      focus: 'Research culture building, innovation program organization, and student team coordination.'
    },
    {
      id: 'lead-eeecf',
      organization: 'EEE Career Forum',
      role: 'Joint Organising Secretary',
      period: 'July 2026 – Present',
      focus: 'Organizing engineering career seminars, technical skill workshops, and alumni-student networking.'
    },
    {
      id: 'lead-youthmappers',
      organization: 'YouthMappers at Feni University',
      role: 'Assistant Organizing Secretary',
      period: 'October 2026 – Present',
      focus: 'Coordinating open geospatial mapping drives, volunteer collaboration, and community data contributions.'
    },
    {
      id: 'lead-iycm',
      organization: 'International Youth Change Maker',
      role: 'Campus Ambassador',
      period: 'January 2026 – Present',
      focus: 'Campus outreach, ethical youth leadership advocacy, and cross-institutional engagement.'
    }
  ],
  skills: [
    {
      id: 'skill-digital',
      name: 'Digital and Technical Skills',
      defaultOpen: true,
      skills: [
        'Prompt Engineering',
        'AI App Building',
        'Microsoft PowerPoint',
        'Microsoft Word',
        'Microsoft Excel'
      ]
    },
    {
      id: 'skill-programming',
      name: 'Programming',
      defaultOpen: false,
      emptyNotice: 'Expandable category — add confirmed programming languages as coursework and projects progress.',
      skills: ['Embedded Arduino C/C++ (Academic Robotics Project)']
    },
    {
      id: 'skill-research-tools',
      name: 'Research and Computational Tools',
      defaultOpen: false,
      emptyNotice: 'Expandable category — add computational modeling, literature search, and simulation environments.',
      skills: ['Scopus Literature Search (Elsevier Training)', 'Evidence-Based Research Methodology']
    },
    {
      id: 'skill-engineering-sw',
      name: 'Engineering Software',
      defaultOpen: false,
      emptyNotice: 'Expandable category — ready to add CAD, circuit simulation, or electromagnetic solvers as confirmed.',
      skills: []
    },
    {
      id: 'skill-hardware',
      name: 'Technical Skills',
      defaultOpen: false,
      emptyNotice: 'Confirmed hardware integration skills from academic robotics work.',
      skills: [
        'Arduino Nano Integration',
        'QTR-8RC IR Sensor Array Calibration',
        'TB6612FNG Motor Driver Wiring'
      ]
    }
  ],
  achievements: [
    {
      id: 'ach-ssc',
      title: 'Government Scholarship – Secondary School Certificate (SSC)',
      level: 'National Academic Merit Scholarship',
      year: '2020',
      description: 'Awarded a Government Merit Scholarship in recognition of academic performance in the 2020 SSC examinations.'
    },
    {
      id: 'ach-jsc',
      title: 'Government Scholarship – Junior School Certificate (JSC)',
      level: 'National Academic Merit Scholarship',
      year: '2017',
      description: 'Awarded a Government Merit Scholarship in recognition of academic excellence in the 2017 JSC examinations.'
    }
  ],
  certificates: [
    {
      id: 'cert-elsevier-scopus',
      title: 'Scopus Academy – Basic Search',
      issuer: 'Elsevier – Scopus Academy',
      issuerGroup: 'Elsevier',
      category: 'research',
      featuredElsevier: true,
      completedDate: 'June 25, 2026',
      description:
        'Structured academic training in systematic literature querying, citation tracking, and scholarly database navigation on Scopus.'
    },
    {
      id: 'cert-elsevier-ebr',
      title: 'How to Conduct Evidence-Based Research',
      issuer: 'Elsevier – Researcher Academy',
      issuerGroup: 'Elsevier',
      category: 'research',
      featuredElsevier: true,
      completedDate: 'June 25, 2026',
      presentedBy: 'Klara Brunnnhuber and Hans Lund',
      description:
        'Research methodology training focused on formulating rigorous research questions and synthesizing reproducible scientific evidence.'
    },
    {
      id: 'cert-elsevier-gaps',
      title: 'How to Identify Research Gaps',
      issuer: 'Elsevier – Researcher Academy',
      issuerGroup: 'Elsevier',
      category: 'research',
      featuredElsevier: true,
      completedDate: 'April 28, 2026',
      presentedBy: 'Anthony Newman',
      description:
        'Academic training on critically evaluating existing literature to pinpoint meaningful, under-explored scientific questions.'
    },
    {
      id: 'cert-aspire',
      title: 'Aspire Leaders Program',
      issuer: 'Aspire Institute (Affiliated with Harvard University)',
      issuerGroup: 'Aspire Institute',
      category: 'leadership',
      completedDate: 'Selected Participant',
      description:
        'Selected participant in a global leadership development program focused on ethical leadership, social impact, and community engagement.'
    },
    {
      id: 'cert-unu-netzero',
      title: 'Net Zero 101: What, Why and How',
      issuer: 'United Nations University – Institute for the Advanced Study of Sustainability (UNU-IAS)',
      issuerGroup: 'UNU-IAS',
      category: 'leadership',
      completedDate: 'May 8, 2026',
      signedBy: 'Shinobu Yamaguchi',
      description:
        'Sustainability and decarbonization curriculum examining scientific, policy, and technological pathways toward net-zero systems.'
    },
    {
      id: 'cert-hp-life',
      title: 'Effective Leadership',
      issuer: 'HP LIFE, HP Foundation',
      issuerGroup: 'HP LIFE',
      category: 'leadership',
      completedDate: 'July 27, 2025',
      description:
        'Training in team communication, strategic decision-making, and collaborative leadership practices.'
    },
    {
      id: 'cert-feni-ai-cyber',
      title: 'AI and Cybersecurity: Foundations and Frontlines',
      issuer: 'Feni University, Department of Electrical and Electronic Engineering',
      issuerGroup: 'Feni University',
      category: 'technical',
      completedDate: 'October 25, 2025',
      description:
        'Departmental technical seminar exploring foundational intersections between artificial intelligence and modern cybersecurity.'
    },
    {
      id: 'cert-google-cloud-ai',
      title: 'Innovating with Google Cloud AI',
      issuer: 'Google Cloud, Simplilearn, SkillUp',
      issuerGroup: 'Google Cloud / Simplilearn',
      category: 'technical',
      completedDate: 'July 4, 2025',
      description:
        'Foundational introduction to applied machine learning workflows and cloud AI capabilities.'
    },
    {
      id: 'cert-ms-copilot',
      title: 'Introduction to Prompt Engineering with GitHub Copilot',
      issuer: 'Microsoft, Simplilearn, SkillUp',
      issuerGroup: 'Microsoft / Simplilearn',
      category: 'technical',
      completedDate: 'July 4, 2025',
      description:
        'Practical training in structured prompt formulation and AI-assisted technical development workflows.'
    }
  ],
  languages: [
    {
      id: 'lang-en',
      language: 'English',
      proficiency: 'Academic & Research Proficiency',
      certification: 'IELTS Academic — Overall Band: 6.5',
      date: 'November 2023'
    },
    {
      id: 'lang-bn',
      language: 'Bengali',
      proficiency: 'Native Language'
    }
  ]
};
