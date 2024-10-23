import { create } from 'zustand';
import db from '../lib/db';

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
  stories: db.query('SELECT * FROM stories'),
  currentStory: null,
  addStory: (story) => {
    const newStory = {
      ...story,
      id: Math.random().toString(36).slice(2),
      createdAt: new Date().toISOString(),
    };
    db.insert('stories', newStory);
    set((state) => ({
      stories: [...state.stories, newStory],
    }));
  },
  setCurrentStory: (story) => {
    if (story) {
      const fetchedStory = db.query('SELECT * FROM stories WHERE id = ?', [story.id]);
      set({ currentStory: fetchedStory[0] });
    } else {
      set({ currentStory: null });
    }
  },
  updateStory: (id, updates) => {
    db.update('stories', updates, { id });
    set((state) => ({
      stories: state.stories.map((story) =>
        story.id === id ? { ...story, ...updates } : story
      ),
    }));
  },
}));
