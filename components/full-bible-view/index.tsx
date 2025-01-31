"use client"

import type { Bible } from '@/lib/type';
import { useCallback, useEffect, useState } from 'react';
import defaultBible from '@/bible/CUT/full.json';
import SelectMenu from './select-menu';
import VerseLine from '../verse-line';

export default function FullBibleView() {
  const [bible, setBible] = useState<Bible>(defaultBible);
  const [bookId, setBookId] = useState<string>("Ge");
  const [chapterId, setChapterId] = useState<number>(0);
  const [bookNames, setBookNames] = useState<{id: string, name: string}[]>([]);

  const allVersion = [{
    id: 'CUT',
    name: '中文和合本',
  }];

  const sortedBookName = useCallback(() => {
    const bookIds = Object.keys(bible.books);
    bookIds.sort((a, b) => { return bible.books[a].order - bible.books[b].order; });
    return bookIds.map((k) => { return {
      id: k,
      name: bible.books[k].name
    }});
  }, [bible]);

  useEffect(() => {
    setBookNames(sortedBookName());
  }, [bible, sortedBookName, setBookNames])

  const versionOnChange: React.ChangeEventHandler<HTMLSelectElement> = async (event) => {
    const newVersion = event.target.value;
    const newBible = await import(`@/bible/${newVersion}/full.json`);
    setBible(newBible);
    setBookNames(sortedBookName())
  };
  const bookIdOnChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const newBookId = event.target.value;
    setBookId(newBookId);
    const chapterSelect = document.getElementsByName('chapterId')[0];
    if(chapterSelect instanceof HTMLSelectElement)
      chapterSelect.value = "0";
    setChapterId(0);
  };
  const chapterIdOnChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const newChapterId = event.target.value;
    setChapterId(parseInt(newChapterId));
  };

  return (
    <>
      <div className='h-full w-full bg-lyw'>
        <div className='sticky top-0 left-0 z-10'>
          <SelectMenu name="version" onChange={versionOnChange} options={allVersion} />
          <SelectMenu name="bookId" onChange={bookIdOnChange} options={bookNames} />
          <SelectMenu name="chapterId" onChange={chapterIdOnChange} 
            options={bible.books[bookId].chapters.map((ch, idx) => { 
              return { id: idx.toString(), name: ch.id.toString() 
              }})}  
          />
        </div>
        <div className='flex w-full justify-center items-center'>
          <article className='w-[98%] font-noto-serif-TC text-2xl text-gray-800'>
            {
              bible.books[bookId].chapters[chapterId].verses.map((ve, idx) => {
                return <VerseLine key={idx} verse={ve} />
              })
            }
          </article>
        </div>
      </div>
    </>
  )
}
