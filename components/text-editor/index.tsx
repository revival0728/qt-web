import type { Localize } from "@/lib/type";
import quillOptions from "@/lib/quill-options";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import SaveIcon from "@/lib/icon/save";
import SyncIcon from "@/lib/icon/sync";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

type PropType = {
  local: Localize,
  readOnly?: boolean,
}

//TODO: Add Bible recite
export default function TextEditor({ local, readOnly }: PropType) {
  const [editorReady, setEditorReady] = useState<boolean>(false);
  const [autoSaveUI, setAutoSaveUI] = useState<boolean>(false);
  const autoSave = useRef<boolean>(false);
  const editor = useRef<Quill | null>(null);

  const getNoteName = () => { return `${(new Date()).toLocaleDateString()}-note`; };

  useEffect(() => {
    (async () => {
      const Quill = (await import('quill')).default;
      const quill = new Quill('#text-editor', {
        ...quillOptions,
        readOnly,
        theme: 'snow',
      });
      
      quill.on('text-change', (delta, oldContent) => {
        if(autoSave.current) {
          const curContent = oldContent.compose(delta);
          const noteName = `${(new Date()).toLocaleDateString()}-note`;
          localStorage.setItem(noteName, JSON.stringify(curContent.ops));
        }
      });

      // Load local saved note
      const localContent = localStorage.getItem(getNoteName());
      if(localContent !== null) {
        const Delta = Quill.import('delta');
        const delta = new Delta();
        delta.ops = JSON.parse(localContent);
        quill.setContents(delta);
      }

      // Hide toolbar
      if(readOnly) {
        const toolbar = document.getElementsByClassName('ql-toolbar')[0];
        toolbar.classList.add('hidden');
        toolbar.classList.remove('ql-toolbar');
      }

      editor.current = quill;
      setEditorReady(true);
    })();

    return () => {
      editor.current = null;
    }
  }, [readOnly]);

  const save = () => {
    if(editor.current === null) {
      alert('Edtiro init error.');
      return;
    }
    const delta = editor.current.getContents();
    const noteName = getNoteName();
    localStorage.setItem(noteName, JSON.stringify(delta.ops));
    alert(local.message.saved);
  };
  const configAutoSave = () => {
    if(editor.current === null) {
      alert('Edtiro init error.');
      return;
    }
    setAutoSaveUI(!autoSaveUI);
    autoSave.current = !autoSave.current;
  }

  return (
    <>
      { editorReady ? 
        <></> : 
        <p>{local.catpions.waitForLoading}</p> 
      }
      {
        readOnly ? <></> :
        <div className="flex">
          <button type="button" aria-label="save" onClick={save}><SaveIcon colorFill="#484747" /></button>
          <button type="button" aria-label="auto" onClick={configAutoSave}><SyncIcon colorFill={autoSaveUI ? "#3163D8" : "#484747"} /></button>
        </div>
      }
      <div id="text-editor" />
    </>
  )
}