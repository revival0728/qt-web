"use client"

import { saveAs } from "file-saver";
import DevToolSection from "@/components/dev/tool-section";
import LocalForm from "@/components/dev/local-form";
import { useEffect, useState } from "react";
import JSZip from "jszip";

export default function Dev() {
  const [textProcToJson, setTextProcToJson] = useState<((version: string, file: File) => Promise<File | null | undefined>) | null>(null);
  const [jsonSliceByBook, setJsonSliceByBook] = useState<((file: File, fullJson: boolean) => Promise<Blob | null | undefined>) | null>(null);

  useEffect(() => {
    (async () => {
      const { text_proc_to_json, json_slice_by_book } = await import('qt-rust');

      const func1 = async (version: string, file: File) => {
        if(file === undefined || file === null) return;
        if(file.type !== 'text/plain') return null;
        const text = await file.text();
        const json = text_proc_to_json(version, text);
        const res = new File([json], 'full.json', {
          type: "application/json",
        });
        return res;
      };

      const func2 = async (file: File, fullJson?: boolean) => {
        if(file === undefined || file === null) return;
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

      setTextProcToJson(func1);
      setJsonSliceByBook(func2);
    })();
  }, [setTextProcToJson, setJsonSliceByBook]);

  const saveTextToFull = async (formData: FormData) => {
    const txt = formData.get("txt");
    const version = formData.get("version");
    if(txt === null || typeof txt === 'string') {
      alert("Please input .txt file");
      return;
    }
    if(version === null || version instanceof File) {
      alert("Please input Bible version");
      return;
    }
    if(textProcToJson === null || jsonSliceByBook === null) {
      alert('Wait for fetching web function');
      return;
    }
    const resJson = await textProcToJson(version, txt);
    if(resJson === null || resJson === undefined) {
      alert("File format error.");
      return;
    }
    const zipFolder = await jsonSliceByBook(resJson, true);
    if(zipFolder === null || zipFolder === undefined) {
      alert("File format error.");
      return;
    }
    saveAs(zipFolder, `QTB-${version}.zip`);
  };
  const saveJsonToFull = async (formData: FormData) => {
    const json = formData.get("json");
    if(json === null || typeof json === 'string') {
      alert("Please input .json file");
      return;
    }
    const version = JSON.parse(await json.text()).version;
    if(textProcToJson === null || jsonSliceByBook === null) {
      alert('Wait for fetching web function');
      return;
    }
    const zipFolder = await jsonSliceByBook(json, true);
    if(zipFolder === null || zipFolder === undefined) {
      alert("File format error.");
      return;
    }
    saveAs(zipFolder, `QTB-${version}.zip`);
  };

  return (
    <div className="dev-tools m-2">
      <h1 className="text-5xl mb-10">Development & Contribution</h1>
      <DevToolSection>
        <h2>From text file to full data</h2>
        <LocalForm reqDatas={[
          {
            inputName: "version",
            inputType: "text",
            inputCaption: "version"
          }, {
            inputName: "txt",
            inputType: "file",
            inputCaption: "input file"
          }]} 
          formName="From text file to full data"
          buttonCatpion="Run"
          action={saveTextToFull}
        />
      </DevToolSection>
      <DevToolSection>
        <h2>From full json to full data</h2>
        <LocalForm reqDatas={[
          {
            inputName: "json",
            inputType: "file",
            inputCaption: "input file"
          }]} 
          formName="From full json to full data"
          buttonCatpion="Run"
          action={saveJsonToFull}
        />
      </DevToolSection>
    </div>
  )
}