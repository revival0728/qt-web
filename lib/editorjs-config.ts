import type { EditorConfig } from '@editorjs/editorjs';

export default async function getEditorjsConfig() {
  const List = (await import('@editorjs/list')).default;
  const Header = (await import('@editorjs/header')).default;

  //TODO: fix typescript
  const config: EditorConfig = {
    tools: {
      list: {
        class: List,
        inlineToolbar: true,
        config: {
          defaultStyle: 'unordered',
        },
      },
      header: {
        class: Header,
        config: {
          levels: [1, 2, 3],
          defaultLevel: 2,
        }
      },
    },
  };
  return config;
};