"use client"

import defaultLocal from "@/localize/zh-TW.json";

import ContentCard from "@/components/content-card";
import TextEditor from "@/components/text-editor";
import storage from "@/lib/storage";
import { Localize } from "@/lib/type";
import { useEffect, useState } from "react"
import { Op } from "quill";

export default function NotesClient() {
  const [noteNames, setNoteNames] = useState<string[] | null>(null);
  const [noteDates, setNoteDates] = useState<{[noteName: string]: string}>({});
  const [local, setLocal] = useState<Localize>(defaultLocal);
  const [langId, setLangId] = useState<string>("zh-TW");
  const [filteredNotes, setFilteredNotes] = useState<string[]>([]);
  const [filter, setFilter] = useState<RegExp>(/./);

  const getNoteDate = (noteName: string) => {
    const date = new Date(noteName.slice(0, noteName.length - 5));
    return date;
  };

  const searchOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const text = event.target.value;
    const newFilter = new RegExp(text);
    setFilter(newFilter);
  };

  useEffect(() => {
    (async () => {
      const localLangId = await storage.getItem('langId') as string | null;
      if(localLangId !== null) {
        const newLocal = await import(`@/localize/${localLangId}.json`);
        setLocal(newLocal);
        setLangId(localLangId);
      }
    })()
  }, [setLocal, setLangId]);
  useEffect(() => {
    (async () => {
      const newNotenames = (await storage.userNotes.keys()).reverse();
      const newNoteDates: {[notName: string]: string} = {};
      for(let i = 0; i < newNotenames.length; ++i) {
        const noteName = newNotenames[i];
        newNoteDates[noteName] = getNoteDate(noteName).toLocaleDateString(langId);
      }
      setNoteDates(newNoteDates);
      setNoteNames(newNotenames);
    })()
  }, [langId, setNoteNames, setNoteDates]);
  useEffect(() => {
    if(noteNames !== null) {
      const newFilteredNotes = noteNames
        .filter(noteName => noteDates[noteName].search(filter) !== -1)
        .filter((_, index) => index < 10);
      setFilteredNotes(newFilteredNotes);
    }
  }, [noteDates, noteNames, filter, setFilteredNotes]);
  return (
    <>
      <ContentCard>
        <input placeholder={local.reminder.noteSearch} className="w-[70vw] h-5 px-10 py-6 rounded-md bg-dlyw bg-[length:30px_30px] bg-[5px_center] bg-[url('/note-search.svg')] bg-no-repeat border-2 border-[#80804d] outline-none" type="text" onChange={searchOnChange}></input>
      </ContentCard>
      {
        filteredNotes.map((noteName, idx) => {
          const content = storage.userNotes.getItem(noteName) as Promise<Op[]>;
          return (
            <ContentCard key={idx}>
              <h2>{noteDates[noteName]}</h2>
              <TextEditor local={local} readOnly={true} defaultContent={content} />
            </ContentCard>
          )
        })
      }
    </>
  )
}