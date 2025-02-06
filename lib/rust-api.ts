import JSZip from "jszip";

const { text_proc_to_json, json_slice_by_book } = await import('qt-rust');

const textProcToJson = async (version: string, file: File) => {
  if(file.type !== 'text/plain') return null;
  const text = await file.text();
  const json = text_proc_to_json(version, text);
  const res = new File([json], 'full.json', {
    type: "application/json",
  });
  return res;
};

const jsonSliceByBook = async (file: File, fullJson?: boolean) => {
  if(file.type !== 'application/json') return null;
  const json = await file.text();
  const data = json_slice_by_book(json);
  const zip = new JSZip();
  if(fullJson !== undefined) {
    if(fullJson)
      zip.file('full.json', file);
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

export { textProcToJson, jsonSliceByBook };
