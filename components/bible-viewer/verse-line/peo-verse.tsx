import type { Verse } from "@/lib/type";

type PropType = {
  verse: Verse,
}

export default function PeoVerse({ verse }: PropType) {
  return (
    <p><span className='bible-verse-id'>{verse.id}</span>{verse.verse}</p>
  )
}