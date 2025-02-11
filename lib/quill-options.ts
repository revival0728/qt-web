import { QuillOptions } from "quill";

const toolbarOptions = [
  [{ 'header': 1 }, { 'header': 2 }, { 'header': 3}],               // custom button values
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],        // toggled buttons
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'align': [] }],
  ['clean'],                                         // remove formatting button
  ['link', 'image', 'video'],
];

const quillOptions: QuillOptions = {
  modules: {
    toolbar: toolbarOptions,
  },
};

export default quillOptions;