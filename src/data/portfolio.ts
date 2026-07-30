export interface Project {
  slug: string;
  title: string;
  category: string;
  categories: string[];
  client: string;
  industry?: string;
  year: string;
  status: 'Completed' | 'In Progress' | 'Coming Soon';
  services: string[];
  deliverables: string[];
  summary: string;
  description: string;
  overview: {
    challenge: string;
    objective: string;
    strategy: string;
    process: string;
    solution: string;
  };
  results?: string[];
  liveUrl?: string;
  thumbnail: string;
  gallery: {
    title: string;
    imageUrl: string;
    caption: string;
  }[];
}

export const projects: Project[] = [
  {
    slug: 'srndplus',
    title: 'Numawiz Studio',
    category: 'Website Design & Development',
    categories: ['Website Design & Development'],
    client: 'Numawiz Studio',
    industry: 'Creative Technology',
    year: '2025',
    status: 'Completed',
    description: 'A modern, responsive website designed to showcase a creative studio with a clean user interface, engaging user experience, and a professional online presence.',
    services: [
      'Website Design',
      'Frontend Development',
      'UI/UX Design',
      'Brand Experience',
      'Performance Optimisation',
    ],
    deliverables: [
      'Discovery Research',
      'UX Architecture',
      'High-Fidelity Design',
      'Development Build',
      'Content Migration',
      'Performance Tuning',
    ],
    summary:
      'A premium digital platform built for a creative studio to showcase work, attract collaborators, and deliver a refined browsing experience.',
    overview: {
      challenge:
        'The studio needed a more expressive digital presence that could match the quality of its creative work while remaining fast and easy to maintain.',
      objective:
        'Design and build a modern, animated portfolio experience with clear navigation, strong brand expression, and excellent performance.',
      strategy:
        'Structured the site around show, not tell, using motion sparingly, imagery prominently, and a restrained dark palette to keep focus on the work.',
      process:
        'Started with content audits and UX flows, then progressed through visual direction, component design, and a phased build with performance review.',
      solution:
        'A polished, responsive website with animated transitions, optimized media handling, and a clear case-study layout for project storytelling.',
    },
    results: [
      'Stronger brand presence online',
      'Clearer project storytelling',
      'Improved content discoverability',
      'Smooth cross-device experience',
    ],
    liveUrl: 'https://numawizstudios.netlify.app',
    thumbnail: '/images/agency_hero_real_1783876064400.jpg',
    gallery: [
      {
        title: 'Homepage Preview',
        imageUrl: '/images/agency_hero_real_1783876064400.jpg',
        caption:
          'Clean, modern homepage layout with smooth navigation and engaging visuals.',
      },
    ],
  },
  {
    slug: 'royal-aristocrat',
    title: 'Femlush & Luxury',
    category: 'Website Design & Development',
    categories: ['Website Design & Development'],
    client: 'Femlush & Luxury',
    industry: 'Fashion eCommerce',
    year: '2025',
    status: 'Completed',
    description: 'A premium fashion eCommerce website showcasing an exclusive collection of luxury Ankara fabrics, handcrafted Adire, and carefully curated accessories for the modern aristocrat.',
    services: [
      'Website Design',
      'Frontend Development',
      'Responsive Design',
      'UI/UX Design',
      'Product Showcase',
      'Performance Optimisation',
    ],
    deliverables: [
      'UX Design',
      'UI Design',
      'Frontend Development',
      'Responsive Build',
      'Performance Optimisation',
    ],
    summary:
      'An elegant fashion eCommerce platform combining luxury visual design, intuitive navigation, and a seamless shopping experience.',
    overview: {
      challenge:
        'Create an online storefront that feels as premium as the products while remaining intuitive for shoppers across devices.',
      objective:
        'Deliver a luxury eCommerce experience with refined imagery, smooth motion, and a clear purchase flow.',
      strategy:
        'Focused on restrained elegance, product-first imagery, and minimal chrome to keep attention on collections.',
      process:
        'Mapped shopping journeys, defined visual language, and built responsive layouts with performance guardrails.',
      solution:
        'A polished storefront with product showcases, smooth transitions, and a consistent premium feel.',
    },
    results: [
      'Premium shopping experience launched',
      'Strong mobile conversion flow',
      'Smooth cross-device interaction',
    ],
    liveUrl: 'https://effervescent-madeleine-b41fcd.netlify.app/',
    thumbnail: '/images/marcverse_featured_showcase.jpg',
    gallery: [
      {
        title: 'Homepage Preview',
        imageUrl: '/images/marcverse_featured_showcase.jpg',
        caption:
          'Elegant product showcase with premium UI, smooth transitions, and modern shopping experience.',
      },
    ],
  },
  {
    slug: 'aju-engineering',
    title: 'Oju Engineering Solution',
    category: 'Brand Identity',
    categories: ['Brand Identity'],
    client: 'Oju Engineering Solution',
    industry: 'Engineering Services',
    year: '2025',
    status: 'Completed',
    description: 'A credible, technically confident brand identity for an engineering practice, built to reinforce precision and trust.',
    services: [
      'Logo Design',
      'Brand Identity',
      'Stationery Design',
      'Company Profile',
    ],
    deliverables: [
      'Logo Design',
      'Brand Guidelines',
      'Business Card',
      'Letterhead',
      'Company Profile',
    ],
    summary:
      'A credible, technically confident brand identity for an engineering practice, built to reinforce precision and trust.',
    overview: {
      challenge:
        'Communicate technical expertise and operational reliability through a modern, cohesive visual identity.',
      objective:
        'Design an identity that feels professional, modern, and trustworthy across both digital and print formats.',
      strategy:
        'Emphasized structure and clarity, using geometric cues, restrained colour, and clean typography.',
      process:
        'Conducted discovery, explored mark concepts, refined lockups, and produced stationery and collateral.',
      solution:
        'A complete brand package including logo, stationery, and a corporate profile that unifies touchpoints.',
    },
    results: [
      'Increased brand recognition',
      'Unified visual identity',
      'Professional print collateral',
    ],
    thumbnail: '/images/Logo 1.png',
    gallery: [
      {
        title: 'Logo Mockup',
        imageUrl: '/images/Logo 1.png',
        caption:
          'Designed a memorable identity that reflects professionalism and industry focus.',
      },
      {
        title: 'Brand Identity',
        imageUrl: '/images/Brand Identity 1.png',
        caption:
          'A complete stationery and corporate branding system for consistent visual communication.',
      },
      {
        title: 'Letterhead',
        imageUrl: '/images/Letterhead 1.png',
        caption:
          'Minimal corporate letterhead designed to reinforce the company visual identity.',
      },
      {
        title: 'Company Profile',
        imageUrl: '/images/Company profile 1.png',
        caption:
          'Professional profile showcasing services, expertise, and corporate capabilities.',
      },
    ],
  },
  {
    slug: 'suna-atlantic-fire',
    title: 'Suna Atlantic Fire Identity',
    category: 'Brand Identity',
    categories: ['Brand Identity'],
    client: 'Suna Atlantic Fire Limited',
    industry: 'Safety and Compliance',
    year: '2025',
    status: 'Completed',
    description: 'A premium corporate identity system crafted to communicate trust, compliance, and operational excellence.',
    services: [
      'Logo Design',
      'Brand Identity',
      'Stationery Design',
      'Company Profile',
    ],
    deliverables: [
      'Logo Design',
      'Brand Assets',
      'Business Card',
      'Letterhead',
      'Company Profile',
    ],
    summary:
      'A premium corporate identity system crafted to communicate trust, compliance, and operational excellence.',
    overview: {
      challenge:
        'Create a visual identity that conveys safety, authority, and operational excellence for a compliance-focused business.',
      objective:
        'Deliver a brand system that supports trust and strengthens client communication.',
      strategy:
        'Used structured layouts, a restrained colour system, and professional typography to project reliability.',
      process:
        'Explored mark directions, refined brand architecture, and produced collatateral aligned with corporate standards.',
      solution:
        'A polished identity package with consistent print and digital brand assets.',
    },
    results: [
      'Stronger client trust',
      'Unified brand presence',
      'Consistent operational branding',
    ],
    thumbnail: '/images/Mock up logo.png',
    gallery: [
      {
        title: 'Logo Mockup',
        imageUrl: '/images/Mock up logo.png',
        caption:
          'Developed a bold identity that communicates reliability, protection, and technical competence.',
      },
      {
        title: 'Brand Identity',
        imageUrl: '/images/Brand Identity 2.png',
        caption:
          'Built a complete visual language with consistent branding across print and corporate materials.',
      },
      {
        title: 'Letterhead',
        imageUrl: '/images/Letterhead 2.png',
        caption:
          'Crafted a tidy, high-trust letterhead system that reinforces the company professional presence.',
      },
      {
        title: 'Company Profile',
        imageUrl: '/images/Company Profile 2.png',
        caption:
          'Produced a polished company profile that highlights services, certifications, and capabilities.',
      },
    ],
  },
];

export const categories = ['All', 'Website Design & Development', 'Brand Identity'] as const;
export type Category = (typeof categories)[number];

export const brandServiceKeywords = [
  'Logo Design',
  'Brand Identity',
  'Business Cards',
  'Letterheads',
  'Brand Guidelines',
  'Corporate Identity',
  'Visual Identity Systems',
] as const;

export const isBrandProject = (project: Project) =>
  brandServiceKeywords.some((keyword) => project.services.includes(keyword));

export const isWebsiteProject = (project: Project) =>
  project.category === 'Website Design & Development';

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug) ?? null;

export const getRelatedProjects = (slug: string, limit = 3) =>
  projects.filter((project) => project.slug !== slug).slice(0, limit);
