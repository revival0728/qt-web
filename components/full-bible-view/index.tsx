"use client"

import type { Bible, Localize } from '@/lib/type';
import { useCallback, useEffect, useState } from 'react';
import SelectMenu from '../select-menu';
import BibleViewer from '../bible-viewer';
import { getBibleView } from '@/lib/utilites';
import storage from '@/lib/storage';

import defaultBible from '@/bible/CUV/full.json';
import allVersion from '@/bible/list.json';

export default function FullBibleView() {
  const [bible, setBible] = useState<Bible>(defaultBible);
  const [bookId, setBookId] = useState<string>("Ge");
  const [chapterId, setChapterId] = useState<number>(0);
  const [bookNames, setBookNames] = useState<{id: string, name: string}[]>([]);

  const setLocalPage = async (newBookId: string, newChapterId: number) => {
    await storage.setItem("bookId", newBookId);
    await storage.setItem("chapterId", newChapterId);
  };
  /* 
   TODO: pre proc this and save to json file
         This require updating [type Bible] structure.
  */
  const sortedBookName = useCallback(() => {
    const bookIds = Object.keys(bible.books);
    bookIds.sort((a, b) => { return bible.books[a].order - bible.books[b].order; });
    return bookIds.map((k) => { return {
      id: k,
      name: bible.books[k].name
    }});
  }, [bible]);
  const setMenuBookId = useCallback((value: string) => {
    const bookSelect = document.getElementsByName('bookId')[0];
    if(bookSelect instanceof HTMLSelectElement) {
      bookSelect.value = value;
    }
  }, []);
  const setMenuChapterId = useCallback((value: number) => {
    const chapterSelect = document.getElementsByName('chapterId')[0];
    if(chapterSelect instanceof HTMLSelectElement) {
      chapterSelect.value = value.toString();
    }
  }, []);

  useEffect(() => {
    (async () => {
      const langId = storage.getItem('langId');
      if(typeof langId === 'string') {
        document.documentElement.lang = langId;
        if(langId === 'zh-TC') return;
        const local: Localize = await import(`@/localize/${langId}.json`);
        const newVerBible = await import(`@/bible/${local.preferences.version}/full.json`);
        const versionSelect = document.getElementsByName('version')[0];
        setBible(newVerBible);
        if(versionSelect instanceof HTMLSelectElement) {
          versionSelect.value = local.preferences.version;
        }
      }
    })();
  }, [setBible]);
  useEffect(() => {
    (async () => {
      const localBookId = await storage.getItem("bookId");
      const localChapterId = await storage.getItem("chapterId");
      if(typeof localBookId === 'string') {
        setBookId(localBookId);
        setMenuBookId(localBookId);
      }
      if(typeof localChapterId === 'number') {
        setChapterId(localChapterId);
        setMenuChapterId(localChapterId);
      }
    })()
  }, [bookId, chapterId, setBookId, setChapterId, setMenuBookId, setMenuChapterId]);
  useEffect(() => {
    setBookNames(sortedBookName());
  }, [bible, sortedBookName, setBookNames]);

  const versionOnChange: React.ChangeEventHandler<HTMLSelectElement> = async (event) => {
    const newVersion = event.target.value;
    const newBible = await import(`@/bible/${newVersion}/full.json`);
    setBible(newBible);
    setBookNames(sortedBookName())
  };
  const bookIdOnChange: React.ChangeEventHandler<HTMLSelectElement> = async (event) => {
    const newBookId = event.target.value;
    setBookId(newBookId);
    setMenuChapterId(0);
    setChapterId(0);
    await setLocalPage(newBookId, 0);
  };
  const chapterIdOnChange: React.ChangeEventHandler<HTMLSelectElement> = async (event) => {
    const newChapterId = event.target.value;
    setChapterId(parseInt(newChapterId));
    await setLocalPage(bookId, parseInt(newChapterId));
  };

  return (
    <>
      <div className='h-full w-full bg-lyw'>
        <div className='flex flex-nowrap justify-center sticky top-0 left-0 z-10 h-16 w-full bg-lyw overflow-x-auto gap-3 max-md:gap-0 max-md:divide-x-2'>
          <SelectMenu name="version" onChange={versionOnChange} options={allVersion} />
          <SelectMenu name="bookId" onChange={bookIdOnChange} options={bookNames} />
          <SelectMenu name="chapterId" onChange={chapterIdOnChange} 
            options={bible.books[bookId].chapters.map((ch, idx) => { 
              return { id: idx.toString(), name: ch.id.toString() 
              }})}  
          />
        </div>
        <div className='flex flex-nowrap w-full justify-center items-center'>
          <div className='basis-[96%]'>
            <BibleViewer content={getBibleView(bible, bookId, chapterId)} title={true} />
          </div>
        </div>
      </div>
    </>
  )
}
