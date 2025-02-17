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
  return (
    <article className='bible-verse'>
      {
        title ? (
          <h2>{`${content.bookName} ${content.chapterName}`}{content.fullChapter ? "" : `:${content.verseRange[0]}-${content.verseRange[1]}`}{version ? <span className="bible-version">{content.version}</span> : <></>}</h2>
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