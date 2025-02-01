import type { Verse } from "@/lib/type";

type PropType = {
  verse: Verse,
}

export default function NarVerse({ verse }: PropType) {
  return (
    <span><span className='align-text-top text-sm font-light opacity-80 select-none'>{verse.id}</span>{verse.verse}</span>
  )
}