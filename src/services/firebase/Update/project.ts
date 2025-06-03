import { db } from "@/services/firebase/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export async function updateProject(
  projectId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
) {
  const projectRef = doc(db, "projects", projectId);
  await updateDoc(projectRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}
