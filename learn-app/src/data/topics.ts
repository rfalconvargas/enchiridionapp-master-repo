export type TopicStatus = "active" | "coming-soon";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

/** Browse/filter categories shown as chips on the Home feed. */
export const BROWSE_CATEGORIES = [
  { id: "prehistoric-life", label: "Prehistoric Life" },
  { id: "anatomy", label: "Anatomy" },
  { id: "space", label: "Space" },
  { id: "machines", label: "Machines" },
  { id: "artifacts", label: "Artifacts" },
] as const;

export type CategoryId = (typeof BROWSE_CATEGORIES)[number]["id"];

export function categoryLabel(id: CategoryId): string {
  return BROWSE_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export interface Topic {
  id: string;
  commonName: string;
  scientificName: string;
  clade: string;
  /** Browse category — matches a chip in BROWSE_CATEGORIES. */
  category: CategoryId;
  /** One-line hook shown on the card. */
  hook: string;
  difficulty: Difficulty;
  /** Estimated lesson length in minutes. */
  estimatedMinutes: number;
  formation: string;
  age: string;
  blurb: string;
  status: TopicStatus;
  /** Tailwind gradient classes for the featured card backdrop. */
  gradient: string;
  stats: { label: string; value: string }[];
}

export const TOPICS: Topic[] = [
  {
    id: "spinosaurus",
    commonName: "Spinosaurus",
    scientificName: "Spinosaurus aegyptiacus",
    clade: "Spinosauridae",
    category: "prehistoric-life",
    hook: "The river monster that rewrote the rules.",
    difficulty: "Beginner",
    estimatedMinutes: 12,
    formation: "Kem Kem Group, Morocco",
    age: "99–93 Ma · Cenomanian",
    blurb:
      "The largest known predatory dinosaur — and the first non-avian theropod adapted for an aquatic life. A century of reconstructions, one interactive model.",
    status: "active",
    gradient: "from-ds-primary/30 via-ds-secondary/15 to-transparent",
    stats: [
      { label: "Length", value: "~15 m" },
      { label: "Mass", value: "~7.4 t" },
      { label: "Reconstructions", value: "5" },
    ],
  },
  {
    id: "trex",
    commonName: "Tyrannosaurus rex",
    scientificName: "Tyrannosaurus rex",
    clade: "Tyrannosauridae",
    category: "prehistoric-life",
    hook: "The tyrant lizard king.",
    difficulty: "Intermediate",
    estimatedMinutes: 15,
    formation: "Hell Creek Formation, USA",
    age: "68–66 Ma · Maastrichtian",
    blurb:
      "Apex predator of the latest Cretaceous of North America. Bone-crushing bite, binocular vision, and a body built for the hunt.",
    status: "coming-soon",
    gradient: "from-[#ffc857]/30 via-[#ff7a59]/15 to-transparent",
    stats: [
      { label: "Length", value: "~12 m" },
      { label: "Bite force", value: "~35 kN" },
      { label: "Reconstructions", value: "—" },
    ],
  },
  {
    id: "trilobite",
    commonName: "Trilobite",
    scientificName: "Class Trilobita",
    clade: "Arthropoda",
    category: "prehistoric-life",
    hook: "270 million years of armored seas.",
    difficulty: "Beginner",
    estimatedMinutes: 8,
    formation: "Global · Paleozoic seas",
    age: "521–252 Ma",
    blurb:
      "One of the most successful animal groups in Earth's history. Compound calcite eyes, segmented exoskeletons, and over 20,000 species.",
    status: "coming-soon",
    gradient: "from-[#5bcbc4]/30 via-[#b7ea8c]/18 to-transparent",
    stats: [
      { label: "Species", value: "20,000+" },
      { label: "Eyes", value: "Calcite" },
      { label: "Reconstructions", value: "—" },
    ],
  },
];
