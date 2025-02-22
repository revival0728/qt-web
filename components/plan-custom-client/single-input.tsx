import type { HTMLInputTypeAttribute, RefObject } from "react"

type PropType = {
  label: string,
  inputType: HTMLInputTypeAttribute,
  inputRef: RefObject<HTMLInputElement | null>,
}

export default function SingleInput({ label, inputType, inputRef }: PropType) {
  return (
    <div>
      <span>{label}: </span>
      <input ref={inputRef} type={inputType} />
    </div>
  )
}