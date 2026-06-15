/**
 * Enchiridion lesson data model.
 *
 * One lesson today (Spinosaurus), but the shape is built to scale: a `Lesson`
 * is fully self-describing — steps, evidence, citations, viewer controls, and
 * the knowledge-tree nodes it unlocks all travel together. The Learn tab reads
 * this and nothing else.
 *
 * Citations are PLACEHOLDERS for now (see `placeholder` flag). They are
 * already shaped like real references, so swapping in verified bibliographic
 * data later is a field-for-field replacement.
 */

// ---------------------------------------------------------------------------
// Shared enums
// ---------------------------------------------------------------------------

/** Confidence buckets evidence is grouped into. */
export type EvidenceConfidence = "known" | "inferred" | "debated";

/** Viewer rail controls a lesson can surface. */
export type ControlId =
  | "labels"
  | "layers"
  | "compare"
  | "timeline"
  | "scale"
  | "animate";

export type KnowledgeNodeStatus = "learned" | "current" | "locked";

// ---------------------------------------------------------------------------
// Sub-shapes
// ---------------------------------------------------------------------------

/** A 3D annotation surfaced on the model when Labels is on. */
export interface Hotspot {
  label: string;
  position: [number, number, number];
}

export interface LessonStep {
  id: string;
  title: string;
  body: string;
  /** Optional control this step nudges the learner to try. */
  highlightControl?: ControlId;
  /** Optional annotations tied to this step. */
  hotspots?: Hotspot[];
}

export interface EvidenceClaim {
  id: string;
  confidence: EvidenceConfidence;
  claim: string;
  /** Links into `Lesson.citations` so every claim is traceable. */
  citationIds: string[];
}

export interface Citation {
  id: string;
  authors: string;
  year: number;
  title: string;
  /** Journal, publisher, or venue. */
  source: string;
  url?: string;
  /** True while this is a stand-in; replace with a verified reference. */
  placeholder: boolean;
}

export interface LessonControl {
  id: ControlId;
  label: string;
  description: string;
  defaultOn: boolean;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  detail: string;
  status: KnowledgeNodeStatus;
  /** Flips to "learned" once the lesson is saved to the tree. */
  unlocksOnSave?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  scientificName: string;
  category: string;
  subtitle: string;
  summary: string;
  modelUrl: string;
  lessonSteps: LessonStep[];
  evidenceClaims: EvidenceClaim[];
  citations: Citation[];
  controls: LessonControl[];
  knowledgeNodes: KnowledgeNode[];
}

// ---------------------------------------------------------------------------
// Display helpers (ordered groups for grouped rendering)
// ---------------------------------------------------------------------------

export const EVIDENCE_GROUPS: {
  id: EvidenceConfidence;
  label: string;
  blurb: string;
}[] = [
  { id: "known", label: "Known", blurb: "Directly supported by fossil material." },
  { id: "inferred", label: "Inferred", blurb: "Reasoned from anatomy and comparison." },
  { id: "debated", label: "Debated", blurb: "Actively argued in the literature." },
];

// ---------------------------------------------------------------------------
// Lessons
// ---------------------------------------------------------------------------

export const SPINOSAURUS_LESSON: Lesson = {
  id: "spinosaurus",
  title: "Spinosaurus",
  scientificName: "Spinosaurus aegyptiacus",
  category: "Theropoda · Spinosauridae",
  subtitle: "Anatomy of a river predator",
  summary:
    "The largest known predatory dinosaur and the first non-avian theropod adapted for an aquatic life. Work through the body plan, then inspect the evidence behind a reconstruction that has changed dramatically for over a century.",
  modelUrl: "/models/spinosaurus.glb",

  lessonSteps: [
    {
      id: "silhouette",
      title: "Start with the silhouette",
      body: "Orbit the specimen and read the overall shape: a long, low-slung torso, surprisingly short hindlimbs, an elongate neck and snout, and a tall sail running down the back. This profile is unlike any other large theropod.",
      highlightControl: "animate",
    },
    {
      id: "skull",
      title: "Inspect the skull",
      body: "The narrow, elongate skull carries conical, unserrated teeth and a rosette of enlarged tips — a fish-catching morphology shared with crocodilians. Pressure-sensing pits at the snout tip hint at hunting prey it could feel but not see.",
      highlightControl: "labels",
      hotspots: [
        { label: "Conical teeth", position: [1.9, 0.2, 0] },
        { label: "Narrow snout", position: [1.5, 0.35, 0] },
      ],
    },
    {
      id: "sail",
      title: "Understand the sail",
      body: "Neural spines up to ~1.6 m tall form a sail over the back. Its purpose is still argued — display, thermoregulation, or fat storage — with species recognition currently the favored explanation.",
      highlightControl: "labels",
      hotspots: [{ label: "Neural spines", position: [-0.3, 1.6, 0] }],
    },
    {
      id: "compare",
      title: "Compare reconstructions",
      body: "Spinosaurus has been rebuilt again and again: upright and bipedal in 1915, short-legged and quadrupedal by 2014, a tail-propelled swimmer by 2020. Compare versions to see how new fossils reshaped the animal.",
      highlightControl: "compare",
    },
    {
      id: "evidence",
      title: "Review the evidence",
      body: "Sort what we actually know from what is inferred or still debated. Every claim below is tagged by confidence and linked to a reference, so you can judge the strength of each line of evidence yourself.",
      highlightControl: "layers",
    },
    {
      id: "save",
      title: "Save to Knowledge Tree",
      body: "Add Spinosaurus to your personal Knowledge Tree to lock in what you've learned and unlock the adjacent branches: aquatic adaptations and the open question of paleoart uncertainty.",
    },
  ],

  evidenceClaims: [
    // Known — fossil-supported
    {
      id: "k-snout",
      confidence: "known",
      claim:
        "An elongate, narrow snout with conical, unserrated teeth, preserved in cranial material.",
      citationIds: ["dalsasso2005", "ibrahim2014"],
    },
    {
      id: "k-sail",
      confidence: "known",
      claim: "Greatly elongated dorsal neural spines forming a tall sail.",
      citationIds: ["stromer1915", "ibrahim2014"],
    },
    {
      id: "k-bones",
      confidence: "known",
      claim:
        "Dense, compact limb bones with reduced medullary cavities, consistent with a denser skeleton.",
      citationIds: ["fabbri2022"],
    },
    // Inferred — reasoned from anatomy
    {
      id: "i-diet",
      confidence: "inferred",
      claim: "A primarily piscivorous (fish-eating) diet.",
      citationIds: ["dalsasso2005", "ibrahim2014"],
    },
    {
      id: "i-tail",
      confidence: "inferred",
      claim:
        "A tall, flexible tail that could generate thrust for swimming in water.",
      citationIds: ["ibrahim2020"],
    },
    {
      id: "i-semiaquatic",
      confidence: "inferred",
      claim: "A semiaquatic lifestyle centered on river systems.",
      citationIds: ["ibrahim2014", "ibrahim2020"],
    },
    // Debated — actively argued
    {
      id: "d-swimmer",
      confidence: "debated",
      claim:
        "Whether it actively pursued prey underwater or fished mostly from the shoreline.",
      citationIds: ["sereno2022", "ibrahim2020"],
    },
    {
      id: "d-proportions",
      confidence: "debated",
      claim: "Exact limb proportions and posture (bipedal vs. quadrupedal).",
      citationIds: ["sereno2022", "ibrahim2014"],
    },
    {
      id: "d-sail-function",
      confidence: "debated",
      claim: "The primary function of the sail (display vs. thermoregulation).",
      citationIds: ["bailey1997"],
    },
  ],

  // Placeholder references — accurate in shape, verify before publishing.
  citations: [
    {
      id: "stromer1915",
      authors: "Stromer, E.",
      year: 1915,
      title: "Ergebnisse der Forschungsreisen … Das Original des Theropoden Spinosaurus aegyptiacus",
      source: "Abhandlungen der Bayerischen Akademie der Wissenschaften",
      placeholder: true,
    },
    {
      id: "dalsasso2005",
      authors: "Dal Sasso, C. et al.",
      year: 2005,
      title: "New information on the skull of the enigmatic theropod Spinosaurus",
      source: "Journal of Vertebrate Paleontology 25(4)",
      placeholder: true,
    },
    {
      id: "ibrahim2014",
      authors: "Ibrahim, N. et al.",
      year: 2014,
      title: "Semiaquatic adaptations in a giant predatory dinosaur",
      source: "Science 345(6204): 1613–1616",
      placeholder: true,
    },
    {
      id: "ibrahim2020",
      authors: "Ibrahim, N. et al.",
      year: 2020,
      title: "Tail-propelled aquatic locomotion in a theropod dinosaur",
      source: "Nature 581: 67–70",
      placeholder: true,
    },
    {
      id: "fabbri2022",
      authors: "Fabbri, M. et al.",
      year: 2022,
      title: "Subaqueous foraging among carnivorous dinosaurs",
      source: "Nature 603: 852–857",
      placeholder: true,
    },
    {
      id: "sereno2022",
      authors: "Sereno, P. C. et al.",
      year: 2022,
      title: "Spinosaurus is not an aquatic dinosaur",
      source: "eLife 11: e80092",
      placeholder: true,
    },
    {
      id: "bailey1997",
      authors: "Bailey, J. B.",
      year: 1997,
      title: "Neural spine elongation in dinosaurs: sailbacks or buffalo-backs?",
      source: "Journal of Paleontology 71(6)",
      placeholder: true,
    },
  ],

  controls: [
    { id: "labels", label: "Labels", description: "Toggle anatomical annotations on the model.", defaultOn: false },
    { id: "layers", label: "Layers", description: "Switch to an x-ray / wireframe view of the specimen.", defaultOn: false },
    { id: "compare", label: "Compare", description: "Place two reconstructions side by side.", defaultOn: false },
    { id: "timeline", label: "Timeline", description: "Scrub between reconstructions, 1915 → 2026.", defaultOn: false },
    { id: "scale", label: "Scale", description: "Show a human-height scale reference.", defaultOn: false },
    { id: "animate", label: "Animate", description: "Auto-rotate the specimen.", defaultOn: true },
  ],

  knowledgeNodes: [
    {
      id: "spinosauridae",
      label: "Spinosauridae",
      detail: "Long-snouted, fish-eating theropods.",
      status: "current",
    },
    {
      id: "spinosaurus",
      label: "Spinosaurus",
      detail: "The river predator at the heart of this lesson.",
      status: "locked",
      unlocksOnSave: true,
    },
    {
      id: "aquatic-adaptations",
      label: "Aquatic Adaptations",
      detail: "Dense bones, paddle tail, retracted nostrils.",
      status: "locked",
      unlocksOnSave: true,
    },
    {
      id: "paleoart-uncertainty",
      label: "Paleoart Uncertainty",
      detail: "Why reconstructions keep changing.",
      status: "locked",
      unlocksOnSave: true,
    },
  ],
};

export const LESSONS: Lesson[] = [SPINOSAURUS_LESSON];

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.id === id);
}
