import type { Localize } from "@/lib/type";
import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef, useState } from "react";

type PropType = {
  local: Localize,
  readOnly?: boolean,
}

export default function TextEditor({ local, readOnly }: PropType) {
  const [editorReady, setEditorReady] = useState<boolean>(false);
  const editor = useRef<EditorJS | null>(null);

  useEffect(() => {
    (async () => {
      const EditorJS = (await import('@editorjs/editorjs')).default;
      const EditorjsConfig = await (await import('@/lib/editorjs-config')).default();
      const newEditor = new EditorJS({
        ...EditorjsConfig,
        readOnly,
        holder: 'text-editor',
      });
      await newEditor.isReady;
      setEditorReady(true);

      editor.current = newEditor;
    })();

    return () => {
      editor.current?.destroy();
    };
  }, [readOnly, setEditorReady]);

  return (
    <div id="text-editor">
      { editorReady ? <></> : <p>{local.catpions.waitForLoading}</p> }
    </div>
  )
}