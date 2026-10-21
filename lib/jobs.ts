export type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  remote: boolean;
  salaryMin: number;
  salaryMax: number;
  stack: string[];
  featured?: boolean;
  posted: string;
  type: string;
  summary: string;
  requirements: string[];
  facts: { size: string; founded: string; funding: string };
};

export const STACKS = ["REACT", "NODE.JS", "PYTHON", "GO", "RUST", "TYPESCRIPT", "AWS", "POSTGRES"];

export const JOBS: Job[] = [
  { id: "JB-0428", title: "Senior Frontend Engineer", company: "Concrete Labs", logo: "CL", location: "Berlin", remote: true, salaryMin: 120, salaryMax: 150, stack: ["REACT", "TYPESCRIPT"], featured: true, posted: "2H AGO", type: "FULL-TIME", summary: "Build the raw interface layer for a design-tool used by 2M people.", requirements: ["5+ yrs shipping React in production", "Deep TypeScript & performance profiling", "Opinionated about design systems"], facts: { size: "48", founded: "2019", funding: "SERIES B" } },
  { id: "JB-0427", title: "Backend Engineer, Payments", company: "Grid Finance", logo: "GF", location: "London", remote: false, salaryMin: 105, salaryMax: 130, stack: ["GO", "POSTGRES", "AWS"], posted: "5H AGO", type: "FULL-TIME", summary: "Own the ledger. Move billions without dropping a cent.", requirements: ["Distributed systems experience", "Go or similar compiled language", "Idempotency is your religion"], facts: { size: "210", founded: "2016", funding: "SERIES D" } },
  { id: "JB-0426", title: "ML Platform Engineer", company: "Slab AI", logo: "SA", location: "Remote", remote: true, salaryMin: 140, salaryMax: 180, stack: ["PYTHON", "AWS"], featured: true, posted: "1D AGO", type: "FULL-TIME", summary: "Train, serve and monitor models at brutal scale.", requirements: ["Python + PyTorch", "Kubernetes / GPU scheduling", "On-call friendly"], facts: { size: "32", founded: "2022", funding: "SEED" } },
  { id: "JB-0425", title: "Full-Stack Developer", company: "Block & Beam", logo: "BB", location: "Cairo", remote: true, salaryMin: 70, salaryMax: 95, stack: ["REACT", "NODE.JS", "POSTGRES"], posted: "1D AGO", type: "CONTRACT", summary: "Ship features end-to-end for a construction marketplace.", requirements: ["React + Node", "SQL modelling", "Product sense"], facts: { size: "15", founded: "2021", funding: "BOOTSTRAPPED" } },
  { id: "JB-0424", title: "Systems Engineer", company: "Ferrous", logo: "FE", location: "Amsterdam", remote: false, salaryMin: 115, salaryMax: 145, stack: ["RUST", "AWS"], posted: "2D AGO", type: "FULL-TIME", summary: "Write the storage engine. Zero garbage collection, zero excuses.", requirements: ["Rust in production", "Linux internals", "Benchmarks over opinions"], facts: { size: "60", founded: "2020", funding: "SERIES A" } },
  { id: "JB-0423", title: "Design Engineer", company: "Monolith", logo: "MO", location: "NYC", remote: true, salaryMin: 130, salaryMax: 160, stack: ["REACT", "TYPESCRIPT"], posted: "3D AGO", type: "FULL-TIME", summary: "Prototype in code. Bridge Figma and production.", requirements: ["Strong CSS/animation chops", "React", "Taste"], facts: { size: "90", founded: "2018", funding: "SERIES C" } },
];

export type AppStatus = "SENT" | "REVIEWING" | "INTERVIEW" | "OFFER" | "REJECTED";
export const APPLICATIONS: { jobId: string; status: AppStatus; date: string }[] = [
  { jobId: "JB-0428", status: "INTERVIEW", date: "2026-10-18" },
  { jobId: "JB-0426", status: "REVIEWING", date: "2026-10-17" },
  { jobId: "JB-0424", status: "OFFER", date: "2026-10-09" },
  { jobId: "JB-0427", status: "SENT", date: "2026-10-20" },
  { jobId: "JB-0425", status: "REJECTED", date: "2026-10-02" },
];

export type Stage = "APPLIED" | "SCREENING" | "TECH ROUND" | "OFFER";
export const STAGES: Stage[] = ["APPLIED", "SCREENING", "TECH ROUND", "OFFER"];
export type Candidate = { id: string; name: string; role: string; match: number; stage: Stage; email: string; exp: string };
export const CANDIDATES: Candidate[] = [
  { id: "C-901", name: "Amira Hassan", role: "Senior Frontend Engineer", match: 94, stage: "TECH ROUND", email: "amira@mail.io", exp: "7 YRS" },
  { id: "C-902", name: "Jonas Weber", role: "Senior Frontend Engineer", match: 88, stage: "SCREENING", email: "jonas@mail.io", exp: "5 YRS" },
  { id: "C-903", name: "Priya Nair", role: "ML Platform Engineer", match: 91, stage: "OFFER", email: "priya@mail.io", exp: "8 YRS" },
  { id: "C-904", name: "Leo Martins", role: "Backend Engineer, Payments", match: 72, stage: "APPLIED", email: "leo@mail.io", exp: "3 YRS" },
  { id: "C-905", name: "Sara Kim", role: "Design Engineer", match: 85, stage: "APPLIED", email: "sara@mail.io", exp: "4 YRS" },
  { id: "C-906", name: "Omar Fathy", role: "Full-Stack Developer", match: 79, stage: "SCREENING", email: "omar@mail.io", exp: "6 YRS" },
  { id: "C-907", name: "Nina Petrova", role: "Systems Engineer", match: 96, stage: "TECH ROUND", email: "nina@mail.io", exp: "9 YRS" },
];

export const salary = (j: { salaryMin: number; salaryMax: number }) => `$${j.salaryMin}K–$${j.salaryMax}K`;
