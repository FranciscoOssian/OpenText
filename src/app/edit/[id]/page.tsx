"use client";

import EditorPage from "@/components/page/editor";
import { useProject } from "@/services/firebase/Hooks/useProject";
import { useUser } from "@/services/firebase/Hooks/useUser";
import { use } from "react";

export default function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const user = useUser();
  const project = useProject(id);

  if (!user.user.uid) {
    return <>Loading</>;
  }

  return (
    <>
      <EditorPage user={user.user} project={{ ...project.project, id }} />
    </>
  );
}
