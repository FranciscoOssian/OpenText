import { readProject } from "@/services/firebase/Read/readProject";
import EditorJSHTML from "editorjs-html";

const edjsParser = EditorJSHTML();

export default async function ViewPage({ params }: { params: { id: string } }) {
  const project = await readProject(params.id);

  const blocks = project.content?.blocks ?? [];
  const html = edjsParser.parse({ blocks });

  return <div className="ml-4" dangerouslySetInnerHTML={{ __html: html }} />;
}
