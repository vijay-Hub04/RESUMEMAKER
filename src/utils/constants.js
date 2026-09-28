export const APP_NAME = 'CareerAI';
export const APP_TAGLINE = 'Your Career, Optimized for Success.';
export const APP_SUBTITLE = 'Analyze your resume, improve your ATS score, and discover opportunities that match your skills.';

export const USER_GROWTH_DATA = [
  { date: '21 Sep', users: 15, activeJobs: 820 },
  { date: '22 Sep', users: 22, activeJobs: 910 },
  { date: '23 Sep', users: 28, activeJobs: 990 },
  { date: '24 Sep', users: 31, activeJobs: 1100 },
  { date: '25 Sep', users: 25, activeJobs: 1180 },
  { date: '26 Sep', users: 36, activeJobs: 1250 },
  { date: 'Yesterday', users: 42, activeJobs: 1340 },
  { date: 'Today', users: 49, activeJobs: 1420 },
];

export const PLATFORM_STATS = [
  {
    id: 1,
    title: 'Resumes Analyzed',
    value: '48,500+',
    change: '+14% this week',
    isPositive: true,
    icon: 'FileText',
  },
  {
    id: 2,
    title: 'Average ATS Score Gain',
    value: '+36%',
    change: 'After 1 revision',
    isPositive: true,
    icon: 'TrendingUp',
  },
  {
    id: 3,
    title: 'Interview Call Rate',
    value: '3.4x',
    change: 'Versus unoptimized resumes',
    isPositive: true,
    icon: 'Award',
  },
  {
    id: 4,
    title: 'Curated Open Positions',
    value: '1,420+',
    change: 'Updated today',
    isPositive: true,
    icon: 'Briefcase',
  },
];

export const MOCK_JOBS = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer (React & Next.js)',
    company: 'NovaTech AI',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA (Hybrid)',
    salary: '$140,000 - $175,000',
    experience: '4-6 Years',
    type: 'Full-time',
    postedDate: '1 day ago',
    featured: true,
    description: 'We are seeking an experienced Frontend Engineer with deep expertise in modern React, Tailwind CSS, TypeScript, and state architecture to build generative AI productivity tools.',
    responsibilities: [
      'Architect and build resilient user interfaces using React, Next.js, and Redux Toolkit.',
      'Collaborate with AI researchers to ship interactive LLM streaming components and dashboards.',
      'Optimize Web Vitals, accessibility (a11y), and cross-browser performance standards.',
      'Mentor junior software engineers and champion modern engineering practices.',
    ],
    requirements: [
      'Strong proficiency in modern JavaScript (ES6+), React 18/19, and TypeScript.',
      'Experience with component libraries, Tailwind CSS, and CSS-in-JS architecture.',
      'Hands-on experience with Redux Toolkit or Zustand for scalable client state.',
      'Working familiarity with REST and GraphQL APIs, WebSockets, and performance profiling.',
    ],
    skills: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Redux', 'Next.js', 'REST APIs', 'Performance Tuning'],
    niceToHave: ['Framer Motion', 'WebSockets', 'Jest/Cypress', 'Vite'],
    department: 'Engineering',
    applicantsCount: 34,
  },
  {
    id: 'job-2',
    title: 'Full Stack AI Application Developer',
    company: 'CognitiveLabs',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=100&auto=format&fit=crop&q=60',
    location: 'Remote (US/Canada)',
    salary: '$130,000 - $160,000',
    experience: '3-5 Years',
    type: 'Remote',
    postedDate: '2 days ago',
    featured: true,
    description: 'Join our founding team building customer-facing AI agents. You will work across frontend interactive panels and Node.js microservices handling prompt pipelines.',
    responsibilities: [
      'Develop end-to-end applications integrating OpenAI/Anthropic SDKs with React interfaces.',
      'Design RESTful and event-driven backend services with Express/Fastify and PostgreSQL.',
      'Implement real-time updates and collaborative workspaces for teams.',
      'Ensure high security standards, JWT auth, and rate-limiting infrastructure.',
    ],
    requirements: [
      '3+ years full-stack experience with React and Node.js.',
      'Proficiency in SQL (PostgreSQL) and database modeling.',
      'Familiarity with containerization (Docker) and cloud deployments (AWS/GCP).',
      'Track record building responsive, highly usable user interfaces.',
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'REST APIs', 'Tailwind CSS', 'AWS'],
    niceToHave: ['Python', 'LangChain', 'Redis', 'CI/CD Pipelines'],
    department: 'AI Products',
    applicantsCount: 52,
  },
  {
    id: 'job-3',
    title: 'UI/UX & Product Design Technologist',
    company: 'Aura Studio',
    companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&auto=format&fit=crop&q=60',
    location: 'New York, NY (Hybrid)',
    salary: '$115,000 - $145,000',
    experience: '3+ Years',
    type: 'Hybrid',
    postedDate: '3 days ago',
    featured: false,
    description: 'Bridge design and engineering. You will translate complex Figma design systems into scalable React component libraries with delightful micro-animations.',
    responsibilities: [
      'Maintain and expand our core Design System used across 4 distinct SaaS products.',
      'Build rich, accessible interactive components utilizing Framer Motion and Radix UI.',
      'Conduct design reviews, user testing sessions, and usability audits.',
      'Enforce pixel-perfect fidelity, semantic HTML, and WCAG AA accessibility standards.',
    ],
    requirements: [
      'Portfolio demonstrating strong aesthetic sensibility and front-end coding capabilities.',
      'Proficiency in React, HTML5, CSS3, Tailwind CSS, and Framer Motion.',
      'Deep expertise in Figma, design tokens, and atomic design methodology.',
    ],
    skills: ['Figma', 'React', 'Tailwind CSS', 'Framer Motion', 'Design Systems', 'CSS3', 'Accessibility'],
    niceToHave: ['Storybook', 'User Research', 'SVG Animation'],
    department: 'Product Design',
    applicantsCount: 29,
  },
  {
    id: 'job-4',
    title: 'Cloud DevOps & Platform Engineer',
    company: 'CloudPulse Systems',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=60',
    location: 'Austin, TX (Remote)',
    salary: '$145,000 - $180,000',
    experience: '5+ Years',
    type: 'Remote',
    postedDate: '4 days ago',
    featured: false,
    description: 'Scale our multi-region Kubernetes infrastructure and automate high-throughput CI/CD pipelines for 10M+ daily active users.',
    responsibilities: [
      'Maintain Kubernetes clusters (EKS) using Terraform and GitOps principles.',
      'Build robust monitoring, alerting, and observability using Prometheus, Grafana, and Datadog.',
      'Automate build, test, and release workflows in GitHub Actions.',
      'Implement zero-trust security postures and secret management.',
    ],
    requirements: [
      'Extensive hands-on experience with AWS, Kubernetes, Terraform, and Docker.',
      'Strong scripting ability in Python, Bash, or Go.',
      'Deep understanding of networking, load balancing, DNS, and TLS certificates.',
    ],
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux', 'Python', 'Prometheus'],
    niceToHave: ['ArgoCD', 'Golang', 'Security Hardening'],
    department: 'Infrastructure',
    applicantsCount: 19,
  },
  {
    id: 'job-5',
    title: 'Machine Learning & NLP Engineer',
    company: 'NeuralPath Insights',
    companyLogo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60',
    location: 'Seattle, WA (On-site)',
    salary: '$160,000 - $200,000',
    experience: '4+ Years',
    type: 'Full-time',
    postedDate: '5 days ago',
    featured: true,
    description: 'Develop next-generation retrieval-augmented generation (RAG) and document comprehension models for enterprise HR intelligence.',
    responsibilities: [
      'Fine-tune transformer models and build embeddings retrieval pipelines with vector databases.',
      'Evaluate model latency, hallucination rates, and semantic accuracy.',
      'Collaborate with platform engineers to deploy PyTorch and ONNX models via Triton.',
    ],
    requirements: [
      'Degree in Computer Science, Data Science, or related quantitative field.',
      'Proficiency with Python, PyTorch, Hugging Face Transformers, and Vector DBs (Milvus/Pinecone).',
      'Solid mathematical understanding of attention mechanisms and information retrieval.',
    ],
    skills: ['Python', 'PyTorch', 'NLP', 'Transformers', 'Vector DB', 'RAG', 'Docker', 'FastAPI'],
    niceToHave: ['C++', 'CUDA', 'Distributed Training'],
    department: 'Data & AI',
    applicantsCount: 41,
  },
  {
    id: 'job-6',
    title: 'Associate Frontend Developer (Junior-Mid)',
    company: 'HyperGrowth Web',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31727560fa?w=100&auto=format&fit=crop&q=60',
    location: 'Chicago, IL (Hybrid)',
    salary: '$85,000 - $110,000',
    experience: '1-3 Years',
    type: 'Hybrid',
    postedDate: 'Just now',
    featured: false,
    description: 'Great opportunity for an ambitious developer eager to elevate their React and Tailwind CSS skills within an agile, collaborative product squad.',
    responsibilities: [
      'Build responsive UI screens matching product mockups.',
      'Write clean, modular JavaScript/React components.',
      'Participate in daily standups and sprint planning.',
    ],
    requirements: [
      'Strong foundations in HTML5, CSS3, and JavaScript (ES6+).',
      '1+ year building web applications with React.',
      'Eager to learn modern testing and deployment methodologies.',
    ],
    skills: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Git', 'Tailwind CSS'],
    niceToHave: ['Redux', 'TypeScript', 'REST APIs'],
    department: 'Engineering',
    applicantsCount: 67,
  }
];

export const DEFAULT_MOCK_ATS_RESULT = {
  score: 78,
  status: 'Good Compatibility',
  summary: 'Your resume demonstrates solid technical experience and good structure. By addressing keyword density, adding measurable business metrics, and tweaking section hierarchy, you can easily push your score past 90.',
  formatting: {
    score: 88,
    status: 'Optimal',
    items: [
      { name: 'Standard Section Headings', passed: true, note: 'Clear sections: Experience, Skills, Education found.' },
      { name: 'Machine-Readable Font Selection', passed: true, note: 'Standard clean font detected without corrupt glyphs.' },
      { name: 'Single-Column Clean Layout', passed: true, note: 'Linear ATS-friendly layout parses chronologically.' },
      { name: 'Tables and Nested Columns', passed: false, note: 'Found 1 secondary column that might confuse older ATS parsers.' },
      { name: 'Contact Info Placement', passed: true, note: 'Email, phone, and LinkedIn properly placed in header.' },
    ]
  },
  skillsAnalysis: {
    matchedPercentage: 74,
    topFoundSkills: [
      'React.js', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS', 'Redux Toolkit',
      'REST APIs', 'Git & GitHub', 'Agile / Scrum', 'Responsive Web Design'
    ],
    missingKeywords: [
      'TypeScript', 'Unit Testing (Jest/Vitest)', 'CI/CD Pipelines', 'Docker',
      'Performance Optimization', 'Web Vitals', 'GraphQL'
    ]
  },
  strengths: [
    'Clear chronological progression with specific job titles and dates.',
    'Strong focus on modern frontend frameworks (React, Redux, Tailwind).',
    'Proper inclusion of clickable LinkedIn and GitHub portfolio links.',
    'Concise bullet points with strong active phrasing.'
  ],
  weaknesses: [
    'Few quantified business metrics (e.g., "improved load time by 35%").',
    'Missing cloud and containerization keywords sought by mid-to-senior recruiters.',
    'Summary statement is somewhat generic and could highlight your core niche better.'
  ],
  recommendations: [
    {
      category: 'Impact Metrics',
      tip: 'Incorporate quantifiable outcomes in at least 3 bullet points (e.g., "Increased user engagement by 28%", "Reduced bundle size by 40%").'
    },
    {
      category: 'Keyword Enrichment',
      tip: 'Add TypeScript and testing libraries (Jest, Vitest, React Testing Library) into your Technical Skills section.'
    },
    {
      category: 'Summary Optimization',
      tip: 'Refine your professional summary to immediately highlight your years of experience, core tech stack, and primary value proposition.'
    }
  ]
};
