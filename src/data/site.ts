export const site = {
  name: 'Adetoye Adebayo',
  nameTag: 'Toye',
  tagline:
    "Computer Science, Economics & Entrepreneurship @ Tufts '28 • COO @ Tamam Health",
  funFacts: ['Proud Naija boy!', 'Manchester United 4L', 'Been coding since age 15', 
    'Used to be Pro on Fortnite'],
  loading: {
    title: 'ADETOYE',
    subtitle: 'STUDIOS',
    statuses: [
      'Crafting portfolio…',
      'Building projects…',
      'Mining emerald…',
      'Spawning resume…',
    ],
  },
  version: 'v0.1.0',
  skinUrl: '/skins/minecraft_skin.png',
  logoUrl: '/images/adetoye-logo.png',
  backgroundVideoUrl: '/videos/minecraft_biome_background_v2.mp4',
  sounds: {
    click: '/sounds/minecraft_click.mp3',
    nature: '/sounds/background.mp3',
  },
  contact: {
    email: 'adebayo_adetoye@yahoo.com',
    github: 'https://github.com/ade-toye',
    linkedin: 'https://www.linkedin.com/in/adetoye-adebayo/',
  },
  resumes: {
    swe: '/resume/Toye_Adebayo_SWE_Resume.pdf',
    pm: '/resume/Toye_Adebayo_PM_Resume.pdf',
  },
  // Labels were mixed up in the original CLAUDE.md notes; corrected Phase 12.
  resumeDrive: {
    swe: 'https://drive.google.com/file/d/1Qzv1dxenbyXmLR1NCDdFN-mXhJycxOuY/view?usp=sharing',
    pm: 'https://drive.google.com/file/d/1r5d3dmCbmAjFsB6HSBVoDZGvqKkuY6q_/view?usp=sharing',
  },
  about: {
    bio: "I'm Adetoye Adebayo, a rising junior at Tufts studying Computer Science with minors in Economics and Entrepreneurship. I'm the co-founder and COO of Tamam Health, an offline-first electronic health record platform we're building for South Sudan's public hospital system, and I develop for JumboCode, Tufts' student-run software studio for nonprofits. I've also run a 17,000-observation field study on labor market bias through the Laidlaw Foundation. Originally from Lagos, Nigeria, I care about building technology that actually reaches the people who need it most, especially across healthcare, finance and emerging markets.",
    education: {
      school: 'Tufts University',
      detail: 'B.S. Computer Science, Minors in Economics & Entrepreneurship, Expected May 2028',
    },
    interests:
      'Playing soccer, Traveling, Minecraft, listening to music and hanging out with friends.',
    // Languages from github.com/ade-toye public repositories.
    skills: ['Python', 'JavaScript', 'TypeScript', 'React', 'C++', 'C', 'HTML', 'CSS', 'AWS', 'Git', 'SQL',
      'Pandas', 'NumPy', 'Notion', 'Jira', 'Matplotlib', 'Figma', 'Microsoft Office', 'Stata', 'Cursor', 'Codex', 'Docker', 'Claude Code', 'Kubernetes'
    ],
    photos: [
      { src: '/images/headshot.jpg', caption: "That's me." },
      { src: '/images/about/picture-2.jpg', caption: 'Won 10k at the Tufts New Venture Competition.' },
      { src: '/images/about/picture-3.jpg', caption: 'First time in Paris.' },
      { src: '/images/about/picture-4.jpg', caption: 'Take me back to Turkey.' },
    ],
  },
  achievements: {
    about: { title: 'Getting to know me', description: 'Opened About' },
    experience: { title: 'We getting hired!', description: 'Opened Experience' },
    projects: { title: 'Inventory check', description: 'Opened Projects' },
  },
  experience: [
    {
      org: 'Tamam Health',
      role: 'Co-Founder & COO',
      dates: 'January 2026 – Present',
      location: 'Boston, MA',
      description:
        "Leading operations, fundraising, and product strategy for an offline-first electronic health record platform built for South Sudan's public hospital system. Running investor outreach toward a seed round, coordinating a five-hospital pilot, and working across the Jira/Notion-managed roadmap alongside the engineering team on the React and Python product.",
      tags: ['Jira', 'Notion', 'React', 'Python', 'Docker'],
      accent: '#5aa53e',
    },
    {
      org: 'Coderina EdTech',
      role: 'Teaching Assistant',
      dates: 'May 2026 – August 2026',
      location: 'Lagos, Nigeria',
      description:
        "Teaching Introduction to Python and Data Structures & Algorithms to 40+ students, leading 5 hours of office hours weekly to help them work through core CS concepts one-on-one.",
      tags: ['Python', 'C++', 'Data Structures', 'Algorithms', 'Teaching'],
      accent: '#e2622c',
    },
    {
      org: 'JumboCode',
      role: 'Software Developer',
      dates: 'September 2025 – May 2026',
      location: 'Tufts University, MA',
      description:
        'Built a volunteer training hub for FoodLink, replacing a manual onboarding process with a structured, self-serve platform that got 150 volunteers onboarded in the first week alone. Worked across the full stack, from UI components down to the data layer.',
      tags: ['React', 'CSS', 'TypeScript', 'Git', 'Agile'],
      accent: '#4a8fe0',
    },
    {
      org: 'Laidlaw Research',
      role: 'Research Scholar',
      dates: 'May 2025 – August 2025',
      location: 'Tufts University, MA',
      description:
        'Selected as 1 of 18 Laidlaw Scholars from over 2,000 applicants to run a 17,000-observation field study on labor market bias with Professor Laura Gee, building the data pipeline in Stata and Python and working the results toward a paper aimed at real hiring-policy impact.',
      tags: ['Stata', 'Excel', 'Python', 'Project Management', 'Data Analysis'],
      accent: '#8b5cf6',
    },
  ],
  projects: [
    {
      title: 'Tamam Health',
      icon: '🏥',
      dates: 'January 2026 – Present',
      tags: ['React', 'Python', 'Docker', 'PouchDB', 'Next.js'],
      bullets: [
        "Designed an offline-first electronic health record system for South Sudan's 87 public hospitals, supporting patient records, referrals, disease surveillance, and continuity of care.",
        'Architected the Android tablet, local server, delayed-sync, and cloud storage workflow that keeps care running where internet and power are unreliable.',
        'Placed 2nd overall and won the Health Track at the Tufts New Venture Competition, $10,000 award.',
      ],
      accent: '#5aa53e',
    },
    {
      title: 'HireKapture',
      icon: '📋',
      dates: 'June 2026',
      tags: ['JavaScript', 'Chrome Extension APIs', 'Google Sheets API', 'Excel', 'Python'],
      bullets: [
        'Built a Chrome extension that logs job applications, role, company, link, deadline, and status, directly into a connected Google Sheet.',
        'Replaced manual spreadsheet tracking for a high-volume recruiting pipeline across dozens of applications.',
        'Used it to track over 200+ applications, saving numerous hours of manual data entry.',
      ],
      accent: '#22b8cf',
    },
    {
      title: 'FoodLink (via JumboCode)',
      icon: '🍽️',
      dates: 'September 2025 – May 2026',
      tags: ['React', 'TypeScript', 'Docker', 'OpenAI API'],
      bullets: [
        'Built a volunteer training hub for FoodLink, implementing reusable front-end components from Figma designs across training modules and user flows.',
        'Integrated front-end views with backend REST APIs using Docker and OpenAI services, enabling volunteer progress tracking and cutting onboarding time.',
        "Onboarded 150 volunteers in the platform's first week, standardizing training for 100+ volunteers as part of a 15-person Agile team.",
      ],
      accent: '#4a8fe0',
    },
    {
      title: 'Arith',
      icon: '🗜️',
      dates: 'February 2026',
      tags: ['C'],
      bullets: [
        'Engineered a lossy image compressor in C, achieving roughly 3x size reduction using DCT, color-space transformation, and bitfield quantization.',
        'Built a 64-bit bitfield packing library from scratch with signed/unsigned field manipulation, overflow detection, and checked runtime error handling.',
        'Built independently, covering low-level C, IEEE 754 floating point, and memory management.',
      ],
      accent: '#e2622c',
    },
    {
      title: 'TransitFlow Simulator',
      icon: '🚦',
      dates: 'October 2025',
      tags: ['C++'],
      bullets: [
        'Built a command-line transit simulation engine in C++ using FIFO queues to manage station boarding and track passengers by destination.',
        'Processed train movement commands and generated accurate passenger exit logs for full trip simulation.',
      ],
      accent: '#8b5cf6',
    },
  ],
} as const

export const navItems = [
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'GitHub', href: site.contact.github },
] as const
