import type { QuillOptions } from "quill";

interface CustomQuillOptions extends QuillOptions {
  modules: {
    toolbar: {
      container: HTMLElement | null;
      handlers: {
        reciteBible: unknown;
        [ops: string]: unknown
      },
      [opts: string]: unknown,
    },
  },
}

const quillOptions: CustomQuillOptions = {
  modules: {
    toolbar: {
      container: null,
      handlers: {
        reciteBible: null,
      },
    },
  },
};

export default quillOptions;