"use client"

import { useEffect } from "react"

export default function LoadReciteBibleHTMLElement() {
  useEffect(() => { import('./recite-bible-html-element') }, []);
  return <></>
}