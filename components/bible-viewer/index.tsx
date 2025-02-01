import type { BibleView } from "@/lib/type";
import NarVerse from "./verse-line/nar-verse";
import PeoVerse from "./verse-line/peo-verse";

type PropType = {
  content: BibleView
  title?: boolean,
  version?: boolean,
};

const PEO_BOOK: string[] = ["Psa", "Prv", "Eccl", "SSol"];

export default function BibleViewer({ content, title, version }: PropType) {
  return (
    <article className='font-noto-serif-TC text-2xl text-gray-800 leading-loose'>
      {
        title ? (
          <h1 className='font-semibold'>{`${content.bookName} ${content.chapterName}`}{content.fullChapter ? "" : `:${content.verseRange[0]}-${content.verseRange[1]}`}{version ? <span className="ml-2">{content.version}</span> : <></>}</h1>
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