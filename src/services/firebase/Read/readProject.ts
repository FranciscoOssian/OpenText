import { db } from "@/services/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function readProject(projectId: string) {
  const projectRef = doc(db, "projects", projectId);
  const snapshot = await getDoc(projectRef);

  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    return { error: true };
  }
}
