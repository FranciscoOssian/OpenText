"use client";

import HomePage from "@/components/page/dashboard";
import { auth } from "@/services/firebase/firebase";
import { useProjects } from "@/services/firebase/Hooks/useProjects";
import { useUser } from "@/services/firebase/Hooks/useUser";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function DashBoard() {
  const user = useUser();
  const projects = useProjects(user.user.uid);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user.user.uid) {
    return (
      <div
        className="w-screen h-screen flex justify-center items-center"
        onClick={handleLogin}
      >
        <button>Entrar com Google</button>
      </div>
    );
  }

  return (
    <>
      <HomePage user={user.user} projects={projects.projects} />
    </>
  );
}
