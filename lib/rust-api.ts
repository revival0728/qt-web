import Rust from "@/qt-rust/opt-pkg/qt_rust";
import JSZip from "jszip";

const text_proc_to_json = async (version: string, file: File) => {
  if(file.type !== 'txt') return null;
  const text = await file.text();
  const json = Rust.text_proc_to_json(version, text);
  const res = new File([json], 'full.json', {
    type: "text/plain",
  });
  return res;
};

const json_slice_by_book = async (file: File, fullJson?: File) => {
  if(file.type !== 'json') return null;
  const json = await file.text();
  const data = Rust.json_slice_by_book(json);
  const zip = new JSZip();
  if(fullJson !== undefined) {
    zip.file('full.json', await fullJson.text());
  }
  for(let i = 0; i < data.length; i += 2) {
    const bookId = data[i];
    const content = data[i + 1];
    zip.file(`${bookId}.json`, content);
  }
  const blobData = await zip.generateAsync({ type: 'blob' });
  const res = new Blob([blobData]);
  return res;
};
