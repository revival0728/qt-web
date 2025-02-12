import { QuillOptions } from "quill";

const toolbarOptions = [
  [{ 'header': 1 }, { 'header': 2 }, { 'header': 3}],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }, { 'align': [] }],
  ['clean'],
  ['link', 'image', 'video'],
];

const quillOptions: QuillOptions = {
  modules: {
    toolbar: toolbarOptions,
  },
};

export default quillOptions;