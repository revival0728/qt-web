import type { Localize } from "@/lib/type";
import quillOptions from "@/lib/quill-options";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

type PropType = {
  local: Localize,
  readOnly?: boolean,
}

export default function TextEditor({ local, readOnly }: PropType) {
  const [editorReady, setEditorReady] = useState<boolean>(false);
  const editor = useRef<Quill | null>(null);

  useEffect(() => {
    (async () => {
      const Quill = (await import('quill')).default;
      const quill = new Quill('#text-editor', {
        ...quillOptions,
        readOnly,
        theme: 'snow',
      });

      editor.current = quill;
      setEditorReady(true);
    })();

    return () => {
      editor.current = null;
    }
  }, [readOnly])

  return (
    <>
      { editorReady ? <></> : <p>{local.catpions.waitForLoading}</p>}
      <div id="text-editor" />
    </>
  )
}