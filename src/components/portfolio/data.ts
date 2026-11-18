export const profile = {
  name: "Vedant Biradar",
  firstName: "Vedant",
  lastName: "Biradar",
  role: "Associate Software Engineer",
  company: "Technomold IT Solutions Pvt Limited",
  companyShort: "Technomold IT Solutions",
  location: "Hyderabad, Telangana, India",
  email: "biradarvedant00@gmail.com",
  phone: "+91 95153 36075",
  phoneHref: "tel:+919515336075",
  linkedin: "https://linkedin.com/in/vedant-biradar-483a60334",
  github: "https://github.com/VedantBiradar22",
  resume: "/Vedant_Biradar_Resume.pdf",
  heroWords: ["intelligent", "reliable", "data-driven", "scalable"],
};

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export const stats = [
  { value: 8.0, decimals: 1, suffix: "", label: "CGPA · B.Tech CSE (AI & ML)" },
  { value: 93.85, decimals: 2, suffix: "%", label: "CNN classification accuracy" },
  { value: 22000, decimals: 0, suffix: "+", label: "Images in largest dataset" },
  { value: 0.879, decimals: 3, suffix: "", label: "ROC-AUC on cancer detection" },
];

export type TimelineItem = {
  title: string;
  org: string;
  period: string;
  current?: boolean;
  kind: "work" | "intern" | "edu";
  points: string[];
  tags?: string[];
  link?: { href: string; label: string };
};

export const timeline: TimelineItem[] = [
  {
    title: "Associate Software Engineer",
    org: "Technomold IT Solutions Pvt Limited",
    period: "2026 — Present",
    current: true,
    kind: "work",
    points: [
      "Building, testing and shipping production software as part of the engineering team.",
      "Working across the development lifecycle in an Agile setup — from requirements to deployment.",
      "Bringing an AI/ML mindset to engineering problems and picking up new stacks quickly.",
    ],
    tags: ["Software Engineering", "Agile", "Python", "SQL"],
  },
  {
    title: "AI Intern",
    org: "AICTE · Empower AI — TechSaksham",
    period: "Nov 2024",
    kind: "intern",
    points: [
      "Completed a 1-month AI internship on ML, NLP and Computer Vision tasks across structured and image datasets.",
      "Built a CNN classifier that sorts plastic waste into Organic and Recyclable, delivering a working prototype on time.",
    ],
    tags: ["Python", "TensorFlow", "Google Colab"],
    link: {
      href: "https://techsaksham.org/verify-aicte-certificate/TSPIN24_607721",
      label: "Verify certificate",
    },
  },
  {
    title: "B.Tech — Computer Science & Engineering (AI & ML)",
    org: "Vignan Institute of Technology and Science, Hyderabad",
    period: "2022 — 2026",
    kind: "edu",
    points: ["CGPA 8.0 / 10 · Machine learning, deep learning, databases and core CS."],
  },
  {
    title: "Pre-University Education",
    org: "Narayana Junior College, Hyderabad",
    period: "2020 — 2022",
    kind: "edu",
    points: ["CGPA 9.3 / 10."],
  },
];

export type Project = {
  index: string;
  title: string;
  subtitle: string;
  year: string;
  summary: string;
  points: string[];
  metrics: { value: string; label: string }[];
  tags: string[];
  github: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Deep Smart Scan",
    subtitle: "Prostate cancer detection from MRI volumes",
    year: "2026",
    summary:
      "An end-to-end deep learning system that reads full MRI scans and tells a clinician — in real time — whether a case looks cancerous, with a confidence score they can check.",
    points: [
      "Led a 4-member team building on 203 patient MRI volumes.",
      "ResNet50 extracts per-slice features; a BiLSTM reads the slices in sequence.",
      "Benchmarked ResNet50, ResNet50V2 and DenseNet121 — ResNet50 won on accuracy and F1.",
      "Deployed as a Streamlit web app: upload a scan, get a diagnostic prediction.",
    ],
    metrics: [
      { value: "0.879", label: "ROC-AUC" },
      { value: "203", label: "MRI volumes" },
      { value: "3", label: "Models benchmarked" },
    ],
    tags: ["Python", "TensorFlow", "ResNet50", "BiLSTM", "Streamlit"],
    github: "https://github.com/VedantBiradar22/Major-Project",
  },
  {
    index: "02",
    title: "Plastic Waste Classification",
    subtitle: "CNN for smarter waste sorting",
    year: "2025",
    summary:
      "A convolutional neural network that sorts waste photos into Organic and Recyclable — a small step toward automated, cleaner recycling.",
    points: [
      "Trained a 3-block CNN on 22,000+ images.",
      "Rotation, zoom and flip augmentation to fight overfitting on a highly varied dataset.",
      "Evaluated with confusion matrix and per-class reports.",
    ],
    metrics: [
      { value: "93.85%", label: "Accuracy" },
      { value: "22K+", label: "Images" },
      { value: "2", label: "Classes" },
    ],
    tags: ["Python", "TensorFlow", "Keras", "OpenCV", "Kaggle"],
    github: "https://github.com/VedantBiradar22/-CNN-Plastic-Waste-Classification",
  },
];

export const skillGroups = [
  { title: "Programming", icon: "code", items: ["Python", "Java", "SQL"] },
  {
    title: "AI & Machine Learning",
    icon: "brain",
    items: ["TensorFlow", "Keras", "Computer Vision", "NLP", "Deep Learning"],
  },
  {
    title: "Deployment & Tools",
    icon: "wrench",
    items: ["Streamlit", "GitHub", "Google Colab", "VS Code", "OpenCV"],
  },
  {
    title: "Core Competencies",
    icon: "layers",
    items: ["End-to-End ML Pipelines", "Model Evaluation", "Agile Teamwork"],
  },
  {
    title: "Soft Skills",
    icon: "sparkles",
    items: ["Adaptability", "Communication", "Continuous Learning", "Problem Solving"],
  },
] as const;

export const marquee = [
  "Python",
  "TensorFlow",
  "Keras",
  "OpenCV",
  "ResNet50",
  "BiLSTM",
  "Java",
  "SQL",
  "Streamlit",
  "NLP",
  "Computer Vision",
  "GitHub",
];

export const hackathons = [
  {
    name: "HackAttack",
    meta: "24 hours",
    text: "Delivered a full-stack solution by wiring an ML backend into a no-code Adalo UI, producing live predictions.",
  },
  {
    name: "GenAIversity",
    meta: "24 hours",
    text: "Built and demoed an AI education platform that uses Generative AI to personalise learning pathways.",
  },
  {
    name: "VHack",
    meta: "24 hours · team of 4",
    text: "Ideated, developed and pitched a functional tech solution from scratch within a day.",
  },
];

export const certifications = [
  {
    name: "Machine Learning with Python",
    issuer: "IBM",
    href: "https://www.coursera.org/learn/machine-learning-with-python",
  },
  {
    name: "SQL and Relational Databases 101",
    issuer: "Cognitive Class",
    href: "https://www.cognitiveclass.ai/courses/sql-and-relational-databases-101",
  },
  { name: "Google AI Essentials", issuer: "Coursera", href: "https://ai.google/education" },
  {
    name: "What is Generative AI",
    issuer: "LinkedIn Learning",
    href: "https://www.linkedin.com/learning/what-is-generative-ai",
  },
];
