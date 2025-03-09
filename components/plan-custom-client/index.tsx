"use client"

import AllLangId from '@/localize/list.json';
import defaultBible from '@/bible/CUV/full.json';
import defaultLocal from '@/localize/zh-TW.json';

import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import ContentCard from "../content-card";
import storage from "@/lib/storage";
import SingleInput from "./single-input";
import SelectInput from "./select-input";
import { Bible, Localize } from '@/lib/type';

type Input = HTMLInputElement | null;
type Select = HTMLSelectElement | null
type Option = { id: string, name: string };

export default function PlanCustomClient() {
  const [langId, setLangId] = useState<string>("zh-TW");
  const [local, setLocal] = useState<Localize>(defaultLocal);
  const [bible, setBible] = useState<Bible>(defaultBible);
  const [bookList, setBookList] = useState<Option[]>([]);
  const divide_by = [{
    id: "chapter",
    name: "chapter",
  }, {
    id: "verse",
    name: "verse",
  }];
  const config = {
    duration: useRef<Input>(null),
    langId: useRef<Select>(null),
    loop: useRef<Input>(null),
    bibleProgress: {
      begin: [useRef<Select>(null), useRef<Select>(null), useRef<Select>(null)],
      end: [useRef<Select>(null), useRef<Select>(null), useRef<Select>(null)],
    },
  };
  const oper = {
    dailyCount: {
      type: useRef<Select>(null),
      value: useRef<Input>(null),
    }
  };
  
  const initValueWrapper = () => {
    const bookId = "Ge";
    const allChap = bible.books[bookId].chapters;
    const chapterList = allChap.map((name) => {
      return {
        id: name.id.toString(),
        name: name.id.toString(),
      }
    });
    const allVerse = allChap[0].verses;
    const verseList = allVerse.map((name) => {
      return {
        id: name.id.toString(),
        name: name.id.toString(),
      }
    });
    return [chapterList, verseList];
  }
  const [initChapterList, initVerseList] = initValueWrapper();
  const [chapterListB, setChapterListB] = useState<Option[]>(initChapterList);
  const [verseListB, setVerseListB] = useState<Option[]>(initVerseList);
  const [chapterListE, setChapterListE] = useState<Option[]>(initChapterList);
  const [verseListE, setVerseListE] = useState<Option[]>(initVerseList);

  const handlerWrapper = (refList: RefObject<Select>[] , setChapterList: Dispatch<SetStateAction<Option[]>>, setVerseList: Dispatch<SetStateAction<Option[]>>) => {
    const [book, chapter, verse] = refList;
    const bkHandler: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
      const bookId = event.target.value;
      const allChap = bible.books[bookId].chapters;
      const chapterList = allChap.map((name) => {
        return {
          id: name.id.toString(),
          name: name.id.toString(),
        }
      });
      if(chapter.current !== null)
        chapter.current.value = "1";
      setChapterList(chapterList);
    };
    const chHandler: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
      if(book.current === null) return;
      const bookId = book.current.value;
      const chapterId = parseInt(event.target.value);
      const allVerse = bible.books[bookId].chapters[chapterId].verses;
      const verseList = allVerse.map((name) => {
        return {
          id: name.id.toString(),
          name: name.id.toString(),
        }
      });
      if(verse.current !== null)
        verse.current.value = "1";
      setVerseList(verseList);
    };
    return [bkHandler, chHandler];
  };
  const [bkHandlerB, chHandlerB] = handlerWrapper(config.bibleProgress.begin, setChapterListB, setVerseListB);
  const [bkHandlerE, chHandlerE] = handlerWrapper(config.bibleProgress.end, setChapterListE, setVerseListE);

  useEffect(() => {
    (async () => {
      const localLangId = await storage.langId();
      if(localLangId !== null)
        setLangId(localLangId);
    })();
  }, [setLangId]);
  useEffect(() => {
    (async () => {
      const local = await import(`@/localize/${langId}.json`);
      setLocal(local);
    })()
  }, [langId]);
  useEffect(() => {
    (async () => {
      const bible = await import(`@/bible/${local.preferences.version}/full.json`);
      setBible(bible);
    })()
  }, [local]);
  useEffect(() => {
    const books = bible.books;
    const bookList = Object.keys(books).map((bookId) => {
      return {
        id: bookId,
        name: books[bookId].name,
      }
    }).sort((a, b) => books[a.id].order - books[b.id].order);
    setBookList(bookList);
  }, [bible, setBookList]);

  return (
    <>
      <ContentCard stretch={false}>
        <SingleInput label="Duration" inputType="number" inputRef={config.duration} />
        <SelectInput label="Lang ID" options={AllLangId} selectRef={config.langId} />
        <SingleInput label="Loop" inputType="checkbox" inputRef={config.loop} />
      </ContentCard>
      <ContentCard stretch={false}>
        <div>Bible Progress</div>
        <div>
          <span>Begin: </span>
          <SelectInput label="Book" options={bookList} onChange={bkHandlerB} selectRef={config.bibleProgress.begin[0]} />
          <SelectInput label="Chapter" options={chapterListB} onChange={chHandlerB} selectRef={config.bibleProgress.begin[1]} />
          <SelectInput label="Verse" options={verseListB} selectRef={config.bibleProgress.begin[2]} />
        </div>
        <div>
          <span>End: </span>
          <SelectInput label="Book" onChange={bkHandlerE} options={bookList} selectRef={config.bibleProgress.end[0]} />
          <SelectInput label="Chapter" onChange={chHandlerE} options={chapterListE} selectRef={config.bibleProgress.end[1]} />
          <SelectInput label="Verse" options={verseListE} selectRef={config.bibleProgress.end[2]} />
        </div>
        <div>
          <SelectInput label="Divide By" options={divide_by} selectRef={oper.dailyCount.type} />
          <SingleInput label="Daily Count" inputType="number" inputRef={oper.dailyCount.value} />
          <button type="button">Add to plan</button>
        </div>
      </ContentCard>
    </>
  )
}