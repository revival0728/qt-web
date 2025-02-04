"use client"

import type { Localize, Bible } from "@/lib/type";
import BibleViewer from "@/components/bible-viewer";
import { getBibleView } from "@/lib/utilites";

type PropType = {
  bible: Bible,
  local: Localize,
};

export default function DailyProv({ bible, local }: PropType) {
  const date = new Date();
  const todayChapterId = date.getDate() - 1;

  return (
    <article>
      <h2>{local.catpions.dailyProverbs}</h2>
      <BibleViewer content={getBibleView(bible, "Prv", todayChapterId)} title={true} version={true} />
    </article>
  );
}
