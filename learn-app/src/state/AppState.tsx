"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type TabId = "home" | "learn" | "create" | "tree" | "more";

/** localStorage key for persisted Knowledge Tree progress. */
const SAVED_STORAGE_KEY = "enchiridion:savedToTree";

export interface LessonDraft {
  id: string;
  sourceType: string;
  title: string;
  summary: string;
  steps: string[];
}

interface AppStateValue {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;

  /** Topic id selected from Home → opened in Learn. */
  activeTopicId: string;
  openLesson: (topicId: string) => void;

  /** Lessons saved to the Knowledge Tree (topic ids). */
  savedToTree: string[];
  saveToTree: (topicId: string) => void;
  isSaved: (topicId: string) => boolean;

  /** Most recent generated draft from the Create flow. */
  drafts: LessonDraft[];
  addDraft: (draft: LessonDraft) => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [activeTopicId, setActiveTopicId] = useState<string>("spinosaurus");
  const [savedToTree, setSavedToTree] = useState<string[]>([]);
  const [drafts, setDrafts] = useState<LessonDraft[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted progress after mount (avoids SSR/hydration mismatch).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setSavedToTree(parsed);
      }
    } catch {
      // ignore unavailable/corrupt storage
    }
    setHydrated(true);
  }, []);

  // Persist on change (but not before the initial load has run).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedToTree));
    } catch {
      // ignore unavailable storage
    }
  }, [savedToTree, hydrated]);

  const openLesson = useCallback((topicId: string) => {
    setActiveTopicId(topicId);
    setActiveTab("learn");
  }, []);

  const saveToTree = useCallback((topicId: string) => {
    setSavedToTree((prev) =>
      prev.includes(topicId) ? prev : [...prev, topicId]
    );
  }, []);

  const isSaved = useCallback(
    (topicId: string) => savedToTree.includes(topicId),
    [savedToTree]
  );

  const addDraft = useCallback((draft: LessonDraft) => {
    setDrafts((prev) => [draft, ...prev]);
  }, []);

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      activeTopicId,
      openLesson,
      savedToTree,
      saveToTree,
      isSaved,
      drafts,
      addDraft,
    }),
    [
      activeTab,
      activeTopicId,
      openLesson,
      savedToTree,
      saveToTree,
      isSaved,
      drafts,
      addDraft,
    ]
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return ctx;
}
