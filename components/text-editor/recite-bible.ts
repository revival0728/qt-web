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

export const getReciteBibleHandler = (Quill: typeof import('quill').default, local: Localize) => function(this: Toolbar) {
  const quill = this.quill;
  const value = prompt(local.message.enterVerseRange);
  if(value === null) return;
  const range = quill.getSelection(true);
  quill.insertEmbed(range.index, 'reciteBible', {
    src: value,
    version: local.preferences.version,
  }, Quill.sources.USER);
  quill.setSelection(range.index + 1, Quill.sources.SILENT);
}
