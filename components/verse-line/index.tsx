import type { Verse } from "@/lib/type";

type PropType = {
  verse: Verse,
}

export default function VerseLine({ verse }: PropType) {
  //TODO: fix verse id display bug. e.g. ACTS 1:13
  return (
    <div className='flex my-5'>
      <span className='inline-flex w-full basis-7 mr-3 select-none justify-end items-start'>
        <span className="text-sm font-light opacity-80">{verse.id}</span>
      </span>
      <p>{verse.verse}</p>
    </div>
  )
}