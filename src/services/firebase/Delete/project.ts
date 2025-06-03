import { db } from "@/services/firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function deleteProject(projectId: string) {
  const projectRef = doc(db, "projects", projectId);
  await deleteDoc(projectRef);
}
