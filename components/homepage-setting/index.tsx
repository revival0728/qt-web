import type { Bible, Localize } from "@/lib/type"
import { type Dispatch, type SetStateAction } from "react"
import SelectMenu from "../select-menu"

import allVersion from "@/bible/list.json";
import allLang from "@/localize/list.json";
import { createBibleByBooks, getRequireBooks } from "@/lib/utilites";

type PropType = Readonly<{
  requireBookList: string[],
  setBible: Dispatch<SetStateAction<Bible>>,
  setLocal: Dispatch<SetStateAction<Localize>>,
  setVersion: Dispatch<SetStateAction<string>>,
}>;

export default function HomepageSetting({ requireBookList, setBible, setLocal, setVersion }: PropType) {
  const langIdOnChange: React.ChangeEventHandler<HTMLSelectElement> = async (event) => {
    const newLangId = event.target.value;
    const local: Localize = await import(`@/localize/${newLangId}.json`);
    const preferVer = local.preferences.version;
    const newVerBible = createBibleByBooks(preferVer, await getRequireBooks(preferVer, requireBookList));
    setLocal(local);
    setBible(newVerBible);
    setVersion(preferVer);
    localStorage.setItem('langId', newLangId);
    const bibleVerSelect = document.getElementsByName('bibleVer')[0];
    if(bibleVerSelect instanceof HTMLSelectElement) {
      bibleVerSelect.value = preferVer;
    }
    document.documentElement.lang = newLangId;
  };
  const bibleVerOnChange: React.ChangeEventHandler<HTMLSelectElement> = async (event) => {
    const newBibleVer = event.target.value;
    const newVerBible = createBibleByBooks(newBibleVer, await getRequireBooks(newBibleVer, requireBookList));
    setBible(newVerBible);
    setVersion(newBibleVer);
  }

  return (
    <div className="flex gap-3 max-md:gap-0 overflow-auto max-md:justify-center max-md:divide-x-2">
      <SelectMenu name="langId" options={allLang} onChange={langIdOnChange} />
      <SelectMenu name="bibleVer" options={allVersion} onChange={bibleVerOnChange} />
    </div>
  )
}