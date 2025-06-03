import { collection, query, where, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/services/firebase/firebase";
import { Project } from "../types";

export function useProjects(userId: string | null) {
  const projectsQuery = userId
    ? query(
        collection(db, "projects"),
        where("owner", "==", userId),
        orderBy("createdAt", "desc")
      )
    : null;

  const [projectsSnapshot, loading, error] = useCollectionData(projectsQuery);

  return {
    projects: (projectsSnapshot || []) as Project[],
    loading,
    error,
  };
}
