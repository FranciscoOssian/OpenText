import { readProject } from "@/services/firebase/Read/readProject";
import { Project } from "@/services/firebase/types";
import EditorJSHTML from "editorjs-html";
import { use } from "react";

const edjsParser = EditorJSHTML();

export default function ViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = readProject(id);

  const blocks =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((project as unknown as Project)?.content as any)?.blocks ?? [];
  const html = edjsParser.parse({ blocks });

  return <div className="ml-4" dangerouslySetInnerHTML={{ __html: html }} />;
}
