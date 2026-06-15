export interface TreeNode {
  id: string;
  label: string;
  detail: string;
  /** Unlocked from the very start. */
  defaultUnlocked?: boolean;
  /** Unlocks once the Spinosaurus lesson is saved. */
  unlocksOnSave?: boolean;
  /** Tapping this (when unlocked) opens the given lesson in the Learn tab. */
  opensLessonId?: string;
}

/**
 * Linear taxonomy map for the demo:
 * Prehistoric Life → Dinosaurs → Theropods → Spinosauridae → Spinosaurus
 *   → Aquatic Adaptations → Paleoart Uncertainty
 *
 * Default: the first three are unlocked. Saving the Spinosaurus lesson unlocks
 * Spinosauridae + Spinosaurus. The last two remain locked (future lessons).
 */
export const TREE_NODES: TreeNode[] = [
  {
    id: "prehistoric-life",
    label: "Prehistoric Life",
    detail: "The deep-time story of life on Earth.",
    defaultUnlocked: true,
  },
  {
    id: "dinosaurs",
    label: "Dinosaurs",
    detail: "Clade Dinosauria — Mesozoic archosaurs.",
    defaultUnlocked: true,
  },
  {
    id: "theropods",
    label: "Theropods",
    detail: "Bipedal, mostly carnivorous dinosaurs.",
    defaultUnlocked: true,
  },
  {
    id: "spinosauridae",
    label: "Spinosauridae",
    detail: "Long-snouted, fish-eating theropods.",
    unlocksOnSave: true,
  },
  {
    id: "spinosaurus",
    label: "Spinosaurus",
    detail: "The river predator at the heart of this lesson.",
    unlocksOnSave: true,
    opensLessonId: "spinosaurus",
  },
  {
    id: "aquatic-adaptations",
    label: "Aquatic Adaptations",
    detail: "Dense bones, paddle tail, retracted nostrils.",
  },
  {
    id: "paleoart-uncertainty",
    label: "Paleoart Uncertainty",
    detail: "Why reconstructions keep changing.",
  },
];

/** Whether a node is unlocked given the Spinosaurus-saved state. */
export function isNodeUnlocked(node: TreeNode, spinosaurusSaved: boolean): boolean {
  return Boolean(node.defaultUnlocked || (node.unlocksOnSave && spinosaurusSaved));
}
