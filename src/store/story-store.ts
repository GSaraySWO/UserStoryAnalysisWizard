import { create } from 'zustand';

interface TestCase {
  id: string;
  description: string;
  steps: string[];
  expectedResult: string;
}

interface UserStory {
  id: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: string;
  testCases: TestCase[];
  document?: string;
}

interface StoryState {
  stories: UserStory[];
  currentStory: UserStory | null;
  addStory: (story: Omit<UserStory, 'id' | 'createdAt'>) => void;
  setCurrentStory: (story: UserStory | null) => void;
  updateStory: (id: string, updates: Partial<UserStory>) => void;
}

export const useStoryStore = create<StoryState>((set) => ({
  stories: [],
  currentStory: null,
  addStory: (story) =>
    set((state) => ({
      stories: [
        ...state.stories,
        {
          ...story,
          id: Math.random().toString(36).slice(2),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  setCurrentStory: (story) => set({ currentStory: story }),
  updateStory: (id, updates) =>
    set((state) => ({
      stories: state.stories.map((story) =>
        story.id === id ? { ...story, ...updates } : story
      ),
    })),
}));