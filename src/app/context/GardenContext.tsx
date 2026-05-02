import { createContext, useContext, useState, ReactNode } from "react";

export interface Plant {
  id: string;
  name: string;
  species: string;
  image: string;
  wateringFrequency: number; // days
  lastWatered: string; // ISO date
  sunlight: "full" | "partial" | "shade";
  location: string;
  notes: string;
}

export interface Task {
  id: string;
  plantId: string;
  plantName: string;
  type: "water" | "fertilize" | "prune" | "repot";
  dueDate: string; // ISO date
  completed: boolean;
}

export interface JournalEntry {
  id: string;
  date: string; // ISO date
  plantId?: string;
  plantName?: string;
  title: string;
  content: string;
  images?: string[];
}

interface GardenContextType {
  plants: Plant[];
  tasks: Task[];
  journalEntries: JournalEntry[];
  addPlant: (plant: Omit<Plant, "id">) => void;
  updatePlant: (id: string, plant: Partial<Plant>) => void;
  deletePlant: (id: string) => void;
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addJournalEntry: (entry: Omit<JournalEntry, "id">) => void;
  updateJournalEntry: (id: string, entry: Partial<JournalEntry>) => void;
  deleteJournalEntry: (id: string) => void;
}

const GardenContext = createContext<GardenContextType | undefined>(undefined);

const initialPlants: Plant[] = [
  {
    id: "1",
    name: "Sunny",
    species: "Succulent (Echeveria)",
    image: "https://images.unsplash.com/photo-1649531373919-a52c80fba1e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBzdWNjdWxlbnQlMjBwbGFudHxlbnwxfHx8fDE3NzY0MzAxNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    wateringFrequency: 14,
    lastWatered: "2026-04-10T00:00:00.000Z",
    sunlight: "full",
    location: "Living room windowsill",
    notes: "Loves bright light. Don't overwater!",
  },
  {
    id: "2",
    name: "Cherry",
    species: "Tomato Plant",
    image: "https://images.unsplash.com/photo-1609668102365-3f0d13db6188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBwbGFudCUyMGdhcmRlbnxlbnwxfHx8fDE3NzYzNTcxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    wateringFrequency: 2,
    lastWatered: "2026-04-16T00:00:00.000Z",
    sunlight: "full",
    location: "Backyard garden",
    notes: "Starting to flower! Need to add stakes soon.",
  },
  {
    id: "3",
    name: "Basil",
    species: "Sweet Basil",
    image: "https://images.unsplash.com/photo-1632431455870-65dd9cf75e0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNpbCUyMGhlcmIlMjBwbGFudHxlbnwxfHx8fDE3NzYzNDIwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    wateringFrequency: 1,
    lastWatered: "2026-04-17T00:00:00.000Z",
    sunlight: "partial",
    location: "Kitchen counter",
    notes: "Perfect for cooking! Pinch off flowers to encourage leaf growth.",
  },
  {
    id: "4",
    name: "Monty",
    species: "Monstera Deliciosa",
    image: "https://images.unsplash.com/photo-1634803534299-56378af8fa70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMGhvdXNlcGxhbnR8ZW58MXx8fHwxNzc2NDMwMTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    wateringFrequency: 7,
    lastWatered: "2026-04-12T00:00:00.000Z",
    sunlight: "partial",
    location: "Corner of bedroom",
    notes: "Growing new leaves! Might need a bigger pot soon.",
  },
  {
    id: "5",
    name: "Lavender",
    species: "English Lavender",
    image: "https://images.unsplash.com/photo-1774176546101-0ff6a783eee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMHBsYW50JTIwZ2FyZGVufGVufDF8fHx8MTc3NjQzMDE0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    wateringFrequency: 3,
    lastWatered: "2026-04-15T00:00:00.000Z",
    sunlight: "full",
    location: "Front porch",
    notes: "Smells amazing! Attracts bees and butterflies.",
  },
  {
    id: "6",
    name: "Snake",
    species: "Snake Plant",
    image: "https://images.unsplash.com/photo-1668426231244-1827c29ef8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFrZSUyMHBsYW50JTIwaW5kb29yfGVufDF8fHx8MTc3NjM0MTE2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    wateringFrequency: 21,
    lastWatered: "2026-04-05T00:00:00.000Z",
    sunlight: "shade",
    location: "Bathroom",
    notes: "Super low maintenance. Great air purifier!",
  },
];

const initialTasks: Task[] = [
  {
    id: "1",
    plantId: "2",
    plantName: "Cherry",
    type: "water",
    dueDate: "2026-04-18T00:00:00.000Z",
    completed: false,
  },
  {
    id: "2",
    plantId: "3",
    plantName: "Basil",
    type: "water",
    dueDate: "2026-04-18T00:00:00.000Z",
    completed: false,
  },
  {
    id: "3",
    plantId: "4",
    plantName: "Monty",
    type: "water",
    dueDate: "2026-04-19T00:00:00.000Z",
    completed: false,
  },
  {
    id: "4",
    plantId: "2",
    plantName: "Cherry",
    type: "fertilize",
    dueDate: "2026-04-20T00:00:00.000Z",
    completed: false,
  },
];

const initialJournalEntries: JournalEntry[] = [
  {
    id: "1",
    date: "2026-04-15T00:00:00.000Z",
    plantId: "2",
    plantName: "Cherry",
    title: "First flowers appearing!",
    content: "So excited to see the first yellow flowers on my tomato plant. Can't wait for the tomatoes to start forming.",
  },
  {
    id: "2",
    date: "2026-04-10T00:00:00.000Z",
    plantId: "4",
    plantName: "Monty",
    title: "New leaf unfurling",
    content: "The new Monstera leaf is finally opening up. It's got beautiful fenestrations (holes) forming. This one is going to be huge!",
  },
  {
    id: "3",
    date: "2026-04-05T00:00:00.000Z",
    title: "Garden reorganization",
    content: "Spent the afternoon reorganizing my plant collection. Moved some plants to better light conditions and cleaned all the leaves.",
  },
];

export function GardenProvider({ children }: { children: ReactNode }) {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(initialJournalEntries);

  const addPlant = (plant: Omit<Plant, "id">) => {
    const newPlant = { ...plant, id: Date.now().toString() };
    setPlants([...plants, newPlant]);
  };

  const updatePlant = (id: string, updates: Partial<Plant>) => {
    setPlants(plants.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deletePlant = (id: string) => {
    setPlants(plants.filter((p) => p.id !== id));
    setTasks(tasks.filter((t) => t.plantId !== id));
  };

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: Date.now().toString() };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const addJournalEntry = (entry: Omit<JournalEntry, "id">) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    setJournalEntries([newEntry, ...journalEntries]);
  };

  const updateJournalEntry = (id: string, updates: Partial<JournalEntry>) => {
    setJournalEntries(journalEntries.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries(journalEntries.filter((e) => e.id !== id));
  };

  return (
    <GardenContext.Provider
      value={{
        plants,
        tasks,
        journalEntries,
        addPlant,
        updatePlant,
        deletePlant,
        addTask,
        updateTask,
        deleteTask,
        addJournalEntry,
        updateJournalEntry,
        deleteJournalEntry,
      }}
    >
      {children}
    </GardenContext.Provider>
  );
}

export function useGarden() {
  const context = useContext(GardenContext);
  if (!context) {
    throw new Error("useGarden must be used within GardenProvider");
  }
  return context;
}
