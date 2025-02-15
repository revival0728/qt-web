"use client"

import defaultLocal from "@/localize/zh-TW.json";

import type { Localize } from "@/lib/type";
import Link from "next/link";
import { useEffect, useState } from "react";
import storage from "@/lib/storage";

export default function NavLinks({ globalLocal }: { globalLocal?: Localize }) {
  const [local, setLocal] = useState<Localize>(defaultLocal);

  useEffect(() => {
    if(globalLocal !== undefined) {
      setLocal(globalLocal)
      return;
    }
    (async() => {
      const langId = await storage.getItem('langId') as string;
      const newLocal = await import(`@/localize/${langId}.json`);
      setLocal(newLocal);
    })()
  }, [globalLocal, setLocal]);

  return (
    <div className="flex gap-2 w-full justify-center items-center font-klee-one text-hyw opacity-50 underline">
      <Link href='/'>{local.navlinks.dailyQT}</Link>
      <Link href='/bible'>{local.navlinks.bible}</Link>
      <Link href='/notes'>{local.navlinks.notes}</Link>
    </div>
  )
}