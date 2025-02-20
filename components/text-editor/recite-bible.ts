import { Localize } from "@/lib/type";
import { BlockEmbed } from "quill/blots/block";
import Toolbar from "quill/modules/toolbar";

export class ReciteBible extends BlockEmbed {
  static blotName = 'reciteBible';
  static tagName = 'recite-bible';

  static create({ src, version }: { src: string, version: string }) {
    const node = super.create() as Element;
    node.setAttribute('src', src);
    node.setAttribute('version', version);
    node.setAttribute('title', "");
    return node;
  }
  static value(node: Element) {
    return {
      src: node.getAttribute('src'),
      version: node.getAttribute('version'),
    };
  }
}

type Quill = typeof import('quill').default;
export const getReciteBibleHandler = (Quill: Quill, local: Localize) => function(this: Toolbar) {
  const quill = this.quill;
  const range = quill.getSelection(true);
  console.log(document.getSelection());
  // TODO: Uncomment this before pushing to production
  // const value = prompt(local.message.enterVerseRange);
  const value = "Prv=1:1";
  if(value === null) return;
  console.log(range);
  quill.insertEmbed(range.index, 'reciteBible', {
    src: value,
    version: local.preferences.version,
  }, Quill.sources.USER);
  quill.setSelection(range.index + 1, Quill.sources.SILENT);
}
