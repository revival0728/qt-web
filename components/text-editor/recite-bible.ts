import { BlockEmbed } from "quill/blots/block";
import Toolbar from "quill/modules/toolbar";

//TODO: Fix and finished recite-bible parchment
export class ReciteBible extends BlockEmbed {
  static blotName = 'reciteBible';
  static tagName = 'recite-bible';

  static create(src: string) {
    const node = super.create() as Element;
    node.setAttribute('src', src);
    return node;
  }
  static formats(node: Element) {
    const format: { src?: string } = {};
    const src = node.getAttribute('src');
    if(src !== null)
      format.src = src;
    return format;
  }
  static value(node: Element) {
    return node.getAttribute('src');
  }
  format(name: string, value: string) {
    if(name === 'src') {
      if(value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.setAttribute(name, value);
      }
    } else {
      super.format(name, value);
    }
  }
}

export const reciteBibleHandler = function(this: Toolbar) {
  const value = prompt('enter range: ')
  this.quill.format('reciteBible', value);
}
