import { db } from "@/services/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function createProject(userId: string) {
  const projectsRef = collection(db, "projects");
  const payload = {
    owner: userId,
    title: "Novo Projeto",
    content: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const docRef = await addDoc(projectsRef, payload);
  return docRef.id;
}
