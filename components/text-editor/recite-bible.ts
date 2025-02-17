import { BlockEmbed } from "quill/blots/block";
import Toolbar from "quill/modules/toolbar";

export class ReciteBible extends BlockEmbed {
  static blotName = 'reciteBible';
  static tagName = 'recite-bible';

  static create(prop: { src: string } | string) {
    const src = typeof prop === 'string' ? prop : prop.src;
    const node = super.create() as Element;
    node.setAttribute('src', src);
    node.setAttribute('title', "");
    node.setAttribute('version', "");
    return node;
  }
  // static formats(node: Element) {
  //   const format: { src?: string } = {};
  //   const src = node.getAttribute('src');
  //   if(src !== null)
  //     format.src = src;
  //   return format;
  // }
  static value(node: Element) {
    return node.getAttribute('src');
  }
  // format(name: string, value: string) {
  //   if(name === 'src') {
  //     if(value) {
  //       this.domNode.setAttribute(name, value);
  //     } else {
  //       this.domNode.setAttribute(name, value);
  //     }
  //   } else {
  //     super.format(name, value);
  //   }
  // }
}

export const reciteBibleHandler = (Quill: typeof import('quill').default) => function(this: Toolbar) {
  const quill = this.quill;
  const value = prompt('enter range: ');
  const range = quill.getSelection(true);
  // quill.insertText(range.index, '\n', Quill.sources.USER);
  quill.insertEmbed(range.index, 'reciteBible', {
    src: value,
  }, Quill.sources.USER);
  quill.setSelection(range.index + 1, Quill.sources.SILENT);
}
