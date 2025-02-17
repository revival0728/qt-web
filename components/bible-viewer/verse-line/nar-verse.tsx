import type { Verse } from "@/lib/type";

type PropType = {
  verse: Verse,
}

export default function NarVerse({ verse }: PropType) {
  return (
    <span><span className='bible-verse-id'>{verse.id}</span>{verse.verse}</span>
  )
}