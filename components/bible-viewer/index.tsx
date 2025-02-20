import type { BibleView } from "@/lib/type";
import NarVerse from "./verse-line/nar-verse";
import PeoVerse from "./verse-line/peo-verse";
import { PEO_BOOK } from "@/lib/utilites";

type PropType = {
  content: BibleView
  title?: boolean,
  version?: boolean,
};

export default function BibleViewer({ content, title, version }: PropType) {
  const genVerse = (verseRange: [number, number]) => {
    if(verseRange[0] === verseRange[1])
      return `${verseRange[0]}`;
    else
      return `${verseRange[0]}-${verseRange[1]}`;
 };

  return (
    <article className='bible-verse'>
      {
        title ? (
          <h2>{`${content.bookName} ${content.chapterName}`}{content.fullChapter ? "" : `:${genVerse(content.verseRange)}`}{version ? <span className="bible-version">{content.version}</span> : <></>}</h2>
        ) :
          <></>
      }
      {
        PEO_BOOK.includes(content.bookId) ? (
          content.verses.map((verse, idx) => { return <PeoVerse key={idx} verse={verse} /> })
        ) : (
          <p>{content.verses.map((verse, idx) => { return <NarVerse key={idx} verse={verse} /> })}</p>
        )
      }
    </article>
  )
}