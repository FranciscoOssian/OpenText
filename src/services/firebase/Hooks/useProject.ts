import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "@/services/firebase/firebase";
import { Project } from "../types";

export function useProject(projectId: string | null) {
  const projectDocRef = projectId ? doc(db, "projects", projectId) : null;
  const [projectData, loading, error] = useDocumentData(projectDocRef);

  return {
    project: projectData as Project,
    loading,
    error,
  };
}
