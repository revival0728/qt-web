import type { QuillOptions } from "quill";
import { reciteBibleHandler } from "./recite-bible";

interface CustomQuillOptions extends QuillOptions {
  modules: {
    toolbar: {
      container: HTMLElement | null;
      [opts: string]: unknown,
    },
  },
}

const quillOptions: CustomQuillOptions = {
  modules: {
    toolbar: {
      container: null,
      handlers: {
        reciteBible: reciteBibleHandler,
      },
    },
  },
};

export default quillOptions;