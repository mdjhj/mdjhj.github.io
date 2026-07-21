// ---------------------------------------------------------------------------
// Single source of truth for your identity, links, nav, and all section data.
// Edit this file to update the header, footer, home page, background page,
// and life page. Fields marked TODO are placeholders — fill them in.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// LAYOUT VARIANT — which home layout the root (/) serves.
//   "standard"     → top navbar + centered reading column (the original)
//   "experimental" → right sidebar nav + split-screen hero + bento grid
// The experimental variant is always previewable at /experimental.
// ---------------------------------------------------------------------------
export const layoutVariant = "experimental" as "standard" | "experimental";

export const site = {
  // --- Identity -----------------------------------------------------------
  name: "Md. Jahidul Hasan Jahid",
  // Short form used in the header brand (rendered as `jahid.hasan`).
  brand: ["jahid", "hasan"],
  role: "Lecturer, Department of Computer Science",
  affiliation: "East Delta University, Bangladesh",
  location: "Chattogram, Bangladesh",
  incoming: "Prospective PhD student & Graduate Research Assistant",

  // Availability pill shown in the hero. Set to "" to hide.
  availability: "Open to research collaboration & PhD opportunities",

  // One-liner shown in the hero and as the meta description.
  tagline:
    "AI researcher working on reliable, data-efficient, and scalable models for real-world NLP, LLM, and vision applications.",

  // --- Short bio (About section). Edit freely. ----------------------------
  bio: [
    "I am a Computer Science lecturer at East Delta University in Bangladesh and a prospective PhD student.",
    "My research spans NLP, large language models, and deep learning for computer vision and medical imaging, with a particular focus on reliability, data efficiency, and practical applicability, especially in low-resource and class-imbalanced settings.",
    //"Recently, I have worked on LLM-driven tasks for low-resource languages, and I am developing ideas at the intersection of retrieval-augmented generation and reinforcement learning for trustworthy, evidence-grounded systems.",
    "I am increasingly drawn to scalability and efficiency in AI, including how parallel and high-performance computing can support large-scale models.",
  ],

  // --- Links (leave "" to hide the item) ----------------------------------
  links: {
    email: "jahidhasan.acad@gmail.com",
    scholar: "https://scholar.google.com/citations?hl=en&user=KqifRRIAAAAJ&view_op=list_works",
    orcid: "https://orcid.org/0009-0003-8740-5384",
    github: "https://github.com/mdjhj",
    linkedin: "https://www.linkedin.com/in/jahidulxhasan/",
    cv: "/cv.pdf", // place your CV at public/cv.pdf
  },

  // --- Navigation ---------------------------------------------------------
  nav: [
    { label: "About", href: "/" },
    { label: "Research", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "Background", href: "/background" },
    { label: "Reading", href: "/reading" },
    { label: "Life", href: "/life" },
    { label: "CV", href: "/cv.pdf", external: true },
  ],
} as const;

// ---------------------------------------------------------------------------
// News / updates shown on the home page (newest first).
// Keep this to recent items only (roughly the last 12–18 months) — prune old
// entries as you add new ones. Dates verified against Crossref records.
// ---------------------------------------------------------------------------
export const news = [
  {
    date: "Apr 2026",
    text: "Our paper on classification and detection of dental diseases in OPG X-rays was presented at IEEE QPAIN 2026 in Chattogram.",
  },
  {
    date: "Apr 2026",
    text: "Presented our paper on interpretable hybrid feature-fusion for five-class chest X-ray classification at ECCT 2026.",
  },
  {
    date: "Dec 2025",
    text: "Presented our work on diabetic retinopathy grading with SMOTE-based class balancing at ICCIT 2025, Cox's Bazar.",
  },
];

// ---------------------------------------------------------------------------
// Research interest tags shown on Home + Research pages.
// The icon name maps to src/components/Icon.astro.
// ---------------------------------------------------------------------------
export const researchInterests = [
  { label: "Natural Language Processing", icon: "message" },
  { label: "Large Language Models", icon: "sparkles" },
  { label: "Computer Vision", icon: "eye" },
  { label: "Medical Imaging", icon: "activity" },
  { label: "Model Reliability", icon: "shield" },
  { label: "Scalability & Efficiency", icon: "layers" },
];

// ---------------------------------------------------------------------------
// Education + test scores (newest first). The FIRST entry also appears as the
// education card on the home page; all entries show on the Background page's
// Education tab.
// ---------------------------------------------------------------------------
export const education = [
  {
    school: "Chittagong University of Engineering & Technology",
    degree: "B.Sc. in Computer Science and Engineering",
    period: "Feb 2017 - Aug 2022",
    location: "Chattogram, Bangladesh",
    // Compact one-liner used on the home page card.
    summary: "CGPA 3.74 / 4.00",
    details: [
      "Thesis: Automated Tag Recommendation System for Question-Answering Sites - supervised by Dr. Muhammad Ibrahim Khan.",
      "CGPA 3.74 / 4.00.",
    ],
  },
  // Uncomment and fill in to add college / high school:
  // {
  //   school: "TODO: college name",
  //   degree: "Higher Secondary Certificate (HSC)",
  //   period: "2014 - 2016",
  //   location: "Chattogram, Bangladesh",
  //   summary: "GPA 5.00 / 5.00",
  //   details: ["TODO: group/board, results, or activities."],
  // },
  // {
  //   school: "TODO: school name",
  //   degree: "Secondary School Certificate (SSC)",
  //   period: "TODO",
  //   location: "Chattogram, Bangladesh",
  //   summary: "GPA 5.00 / 5.00",
  //   details: [],
  // },
];

export const testScores = [
  {
    name: "IELTS Academic",
    score: "8.0",
    detail: "Listening 9.0 · Reading 9.0 · Writing 7.5 · Speaking 6.5",
    date: "Jun 2026",
  },
  {
    name: "GRE General Test",
    score: "320",
    detail: "Quantitative 168 · Verbal 152 · Analytical Writing 4.0",
    date: "Dec 2025",
  },
];

// ---------------------------------------------------------------------------
// Experience (newest first) — THE single array for work history.
//   • Home page card: role / org / period of the FIRST entry.
//   • Background page → Teaching tab: every entry, with courses + highlights.
// ---------------------------------------------------------------------------
export const experience = [
  {
    org: "East Delta University",
    role: "Lecturer",
    period: "May 2023 - Present",
    location: "Chattogram, Bangladesh",
    courses: ["Data Structures", "Algorithms", "Compiler Design", "Operating Systems"],
    highlights: [
      "Supervising undergraduate thesis groups in deep learning for disease diagnosis, multimodal learning, object detection, and natural language processing.",
      "Mentoring student teams in data structures, compiler design, operating systems, and web development projects.",
    ],
  },
  {
    org: "Port City International University",
    role: "Lecturer",
    period: "Sep 2022 - May 2023",
    location: "Chattogram, Bangladesh",
    courses: ["Pattern Recognition", "Theory of Computing", "Computer Graphics", "Discrete Mathematics"],
    highlights: ["Mentored student teams on web development and image-processing projects."],
  },
];

// ---------------------------------------------------------------------------
// Skills. Shown on the home page.
// ---------------------------------------------------------------------------
export const skills = [
  { group: "Languages", items: ["Python", "C++", "Java"] },
  { group: "ML & Data Science", items: ["PyTorch", "TensorFlow", "scikit-learn", "NumPy", "Pandas", "Matplotlib"] },
  { group: "Web", items: ["React.js", "Vue.js", "Node.js", "HTML5", "CSS3", "Bootstrap 5"] },
  { group: "Databases & Tools", items: ["MongoDB", "MySQL", "Git", "GitHub"] },
];

// ---------------------------------------------------------------------------
// Life page — quotes / inspirations, and captions for the photo gallery.
// Drop photos into src/assets/gallery/ and they appear automatically;
// add a caption here keyed by filename (optional).
// ---------------------------------------------------------------------------
export const quotes = [
  {
    text: "Indeed, with hardship comes ease.",
    source: "Qur'an 94:6",
  },
  {
    text: "The best of people are those who are most beneficial to people.",
    source: "Prophet Muhammad ﷺ - al-Mu'jam al-Awsat",
  },
  {
    text: "Seeking knowledge is an obligation upon every Muslim.",
    source: "Prophet Muhammad ﷺ - Sunan Ibn Majah",
  },
];

export const galleryCaptions: Record<string, string> = {
  "01-Nepal_12.jpg": "Annapurna range, Nepal'2024",
  "04-Sajek.jpg": "Clouds over Sajek Valley, Bangladesh'2017",
  "03-Dhaka.jpg": "Dhaka cityscape, Bangladesh'2022",
  "02-St. Martin.jpg":" St. Martin's Island, Bangladesh'2017",
};
