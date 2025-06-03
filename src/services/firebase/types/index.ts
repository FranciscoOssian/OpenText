import { User as FirebaseUser } from "firebase/auth";

export type User = FirebaseUser & {
  projects: Project[];
};

export type Project = {
  id: string;
  owner: string;
  title: string;
  content: unknown;
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt: { seconds: number; nanoseconds: number };
};
