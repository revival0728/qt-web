import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef } from "react";

type PropType = {
  readOnly?: boolean,
}

export default function TextEditor({ readOnly }: PropType) {
  const editor = useRef<EditorJS | null>(null);

  useEffect(() => {
    const newEditor = new EditorJS({
      readOnly,
      holder: 'text-editor',
    });

    editor.current = newEditor;

    return () => {
      editor.current?.destroy();
    };
  }, []);

  return (
    <div id="text-editor" />
  )
}