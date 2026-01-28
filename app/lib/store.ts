// app/lib/store.ts

export type Application = {
  name: string;
  email: string;
  role: string;
  message: string;
  time: string;
};

export const applications: Application[] = [];
// In-memory store for applications