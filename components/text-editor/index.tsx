import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import type { Localize } from "@/lib/type";
import quillOptions from "@/components/text-editor/quill-options";
import Quill, { type Op } from "quill";
import { useEffect, useRef, useState } from "react";
import SaveIcon from "@/lib/icon/save";
import SyncIcon from "@/lib/icon/sync";
import storage from "@/lib/storage";
import { createToolbarUI } from "./toolbar-ui";
import { ReciteBible, getReciteBibleHandler } from "./recite-bible";

type PropType = {
  local: Localize,
  readOnly?: boolean,
  defaultContent?: Op[] | Promise<Op[]>,
}

// TODO: Write docs for user
// BUG: The toolbar handler run twice and document.getSelect().anchorNode is null
// BUG: Overwriting ReciteBible formats
export default function TextEditor({ local, readOnly, defaultContent }: PropType) {
  const [editorReady, setEditorReady] = useState<boolean>(false);
  const [autoSaveUI, setAutoSaveUI] = useState<boolean>(false);
  const autoSave = useRef<boolean>(false);
  const editor = useRef<Quill | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getNoteName = () => { return `${(new Date()).toLocaleDateString()}-note`; };

  useEffect(() => {
    const container = containerRef.current;
    (async () => {
      if(container === null) return;
      const toolbar = createToolbarUI();
      quillOptions.modules.toolbar.container = toolbar;
      container.appendChild(toolbar);
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div')
      );
      if(editorContainer === null) return;
      const Quill = (await import('quill')).default;
      quillOptions.modules.toolbar.handlers.reciteBible = getReciteBibleHandler(Quill, local);
      Quill.register('formats/reciteBible', ReciteBible);
      const quill = new Quill(editorContainer, {
        ...quillOptions,
        readOnly,
        theme: 'snow',
      });

      quill.on('text-change', async (delta, oldContent) => {
        if(autoSave.current) {
          const curContent = oldContent.compose(delta);
          await storage.userNotes.setItem(getNoteName(), curContent.ops);
        }
      });

      // Hide toolbar
      if(readOnly) {
        const toolbar = container.getElementsByClassName('ql-toolbar')[0];
        if(toolbar !== undefined) {
          toolbar.classList.add('hidden');
          toolbar.classList.remove('ql-toolbar');
        }
      }

      // Set defaultContent or load local saved note
      const Delta = Quill.import('delta');
      const delta = new Delta();
      if(defaultContent !== undefined) {
        delta.ops = defaultContent instanceof Promise ? await defaultContent : defaultContent;
      } else {
        const localContent = await storage.userNotes.getItem(getNoteName()) as Op[] | null;
        if(localContent !== null)
          delta.ops = localContent;
      }
      quill.setContents(delta);

      editor.current = quill;
      setEditorReady(true);
    })();

    return () => {
      editor.current = null;
      if(container) {
        container.innerHTML = "";
      }
    }
  }, [editor, local, readOnly, defaultContent]);

  const save = async () => {
    if(editor.current === null) {
      alert('Edtiro init error.');
      return;
    }
    const delta = editor.current.getContents();
    const noteName = getNoteName();
    await storage.userNotes.setItem(noteName, delta.ops);
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
    <div>
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
      <div ref={containerRef}></div>
    </div>
  )
}