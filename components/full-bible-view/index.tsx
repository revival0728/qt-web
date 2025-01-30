"use client"

import type { Bible } from '@/lib/type';
import { useCallback, useEffect, useState } from 'react';
import defaultBible from '@/bible/CUT/full.json';

export default function FullBibleView() {
  const [bible, setBible] = useState<Bible>(defaultBible);
  const [bookId, setBookId] = useState<string>("Ge");
  const [chapterId, setChapterId] = useState<number>(1);
  const [bookNames, setBookNames] = useState<{id: string, name: string}[]>([]);

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
  };
  const chapterIdOnChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const newChapterId = event.target.value;
    setChapterId(parseInt(newChapterId));
  };

  return (
    <>
      <div>
        <select name="version" onChange={versionOnChange}>
          <option value="CUT">中文和合本</option>
        </select>
        <select name="bookId" onChange={bookIdOnChange}>
          {
            bookNames.map((bn, idx) => {
              return <option key={idx} value={bn.id}>{bn.name}</option>
            })
          }
        </select>
        <select name="chaperId" onChange={chapterIdOnChange}>
          {
            bible.books[bookId].chapters.map((ch, idx) => {
              return <option key={idx}>{ch.id}</option>
            })
          }
        </select>
        <article>
          {
            bible.books[bookId].chapters[chapterId].verses.map((ve, idx) => {
              return (
                <p key={idx}><span>{ve.id}</span> {ve.verse}</p>
              )
            })
          }
        </article>
      </div>
    </>
  )
}
