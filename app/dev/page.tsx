"use client"

import { saveAs } from "file-saver";
import DevToolSection from "@/components/dev/tool-section";
import LocalForm from "@/components/dev/local-form";
import { useEffect, useState } from "react";
import { textProcToJson, jsonSliceByBook } from "@/lib/rust-api-wrapper";

export default function Dev() {
  const [qtRust, setQtRust] = useState<typeof import('qt-rust') | null>(null);

  useEffect(() => {
    (async () => {
      const wasmModule = await import('qt-rust');
      setQtRust(wasmModule);
    })();
  }, [setQtRust]);

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
    const resJson = await textProcToJson(qtRust, version, txt);
    if(resJson === null || resJson === undefined) {
      alert("File format error.");
      return;
    }
    const zipFolder = await jsonSliceByBook(qtRust, resJson, true);
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
    const zipFolder = await jsonSliceByBook(qtRust, json, true);
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