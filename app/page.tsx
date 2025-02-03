"use client"

import type { Bible, Localize } from "@/lib/type";
import { useState } from "react";
import ContentCard from "@/components/content-card";
import DailyProv from "@/components/daily-prov";
import { createBibleByBooks } from "@/lib/utilites";

import defaultLang from "@/localize/zh-TC.json";
import defaultProv from "@/bible/CUV/Prv.json";
import HomepageSetting from "@/components/homepage-setting";
import InfoCard from "@/components/info-card";

export default function Home() {
  const requireBookList = ["Prv"];
  const [bible, setBible] = useState<Bible>(createBibleByBooks("CUV", [defaultProv]));
  const [local, setLocal] = useState<Localize>(defaultLang);

  return (
    <div className="flex flex-col gap-5 justify-between items-center absolute top-0 left-0 h-fit min-h-full w-full pt-2 pb-4 bg-dlyw font-noto-sans-TC">
      <div id="contents" className="w-fit pt-2 px-14 pb-14 max-md:px-5 space-y-5 overflow-auto">
        <ContentCard>
          <HomepageSetting requireBookList={requireBookList} setBible={setBible} setLocal={setLocal} />
        </ContentCard>
        <ContentCard>
          <DailyProv bible={bible} local={local} />
        </ContentCard>
      </div>
      <div className="w-[80%]">
        <InfoCard />
      </div>
    </div>
  );
}
