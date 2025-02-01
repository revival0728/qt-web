import type { Verse } from "@/lib/type";

type PropType = {
  verse: Verse,
}

export default function PeoVerse({ verse }: PropType) {
  return (
    <p><span className='align-text-top text-sm font-light opacity-80 select-none'>{verse.id}</span>{verse.verse}</p>
  )
}