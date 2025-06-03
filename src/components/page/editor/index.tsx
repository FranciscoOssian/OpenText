"use client";

import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData, ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import CodeTool from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import Warning from "@editorjs/warning";
import Marker from "@editorjs/marker";
import LinkTool from "@editorjs/link";
import Checklist from "@editorjs/checklist";
import Underline from "@editorjs/underline";
import Tooltip from "editorjs-tooltip";
import Annotation from "editorjs-annotation";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";

import { Project, User } from "@/services/firebase/types";
import { updateProject } from "@/services/firebase/Update/project";

export default function EditorPage({
  project,
}: {
  user: User;
  project: Project;
}) {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        data: project.content as unknown as OutputData,
        autofocus: true,
        tools: {
          header: {
            class: Header as unknown as ToolConstructable,
            tunes: ["anyTuneName"],
          },
          paragraph: {
            class: Paragraph as unknown as ToolConstructable,
            inlineToolbar: false,
            tunes: ["anyTuneName"],
          },
          list: {
            class: List as unknown as ToolConstructable,
            inlineToolbar: true,
          },
          anyTuneName: {
            class: AlignmentTuneTool,
            config: {
              default: "left",
              blocks: {
                header: "center",
                list: "right",
              },
            },
          },
          annotation: Annotation,
          underline: Underline,
          quote: Quote,
          code: CodeTool,
          delimiter: Delimiter,
          table: Table,
          embed: Embed,
          warning: Warning,
          marker: Marker,
          tooltip: {
            class: Tooltip,
            config: {
              location: "left",
              underline: true,
              placeholder: "Enter a tooltip",
              highlightColor: "#FFEFD5",
              backgroundColor: "#154360",
              textColor: "#FDFEFE",
              holder: "editorId",
            },
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/fetch-url", // Endpoint que retorna metadados de uma URL
            },
          },
          checklist: Checklist,
        },
        onReady: () => {
          editorRef.current = editor;
        },
      });
    }

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [project]);

  const save = async () => {
    if (!editorRef.current) return null;
    return await editorRef.current.save();
  };

  const onHandleSave = async () => {
    const json = await save();
    console.log("ddddd", json, project);
    if (!json) return;

    updateProject(project.id, { content: json });
  };

  return (
    <div className="w-[100svw] h-[100svh] flex justify-center items-center">
      <div className="bg-green-600 rounded-2xl size-fit p-3 py-1 fixed fixeb top-0 right-0">
        <button onClick={() => onHandleSave()}>Salvar</button>
      </div>
      <div id="editorjs" className="border rounded w-[70vw] h-screen" />
    </div>
  );
}
