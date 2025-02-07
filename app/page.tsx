"use client"

import { CustomPlan, type Bible, type Localize } from "@/lib/type";
import { useEffect, useState } from "react";
import ContentCard from "@/components/content-card";
import DailyProv from "@/components/daily-prov";
import { checkBibleMatchRequirement, createBibleByBooks, getBibleView, getDayId, getRequireBooks, parseBibleRange } from "@/lib/utilites";
import HomepageSetting from "@/components/homepage-setting";
import InfoCard from "@/components/info-card";
import Link from "next/link";
import BibleViewer from "@/components/bible-viewer";

import defaultLang from "@/localize/zh-TW.json";
import defaultProv from "@/bible/CUV/Prv.json";

//TODO: Add localization support to custom plan
export default function Home() {
  const [requireBookList, setRequireBookList] = useState<string[]>(["Prv"]);
  const [version, setVersion] = useState<string>(defaultLang.preferences.version);
  const [bible, setBible] = useState<Bible>(createBibleByBooks("CUV", [defaultProv]));
  const [local, setLocal] = useState<Localize>(defaultLang);
  const [plan, setPlan] = useState<CustomPlan | null>(null);

  useEffect(() => {
    (async() => {
      const localPlan = localStorage.getItem('currentPlan');
      if(localPlan !== null) {
        const json: CustomPlan = JSON.parse(localPlan);
        const dayId = getDayId(json.beginDate);
        const tdReq = json.requireBookList[dayId];
        for(let i = 0; i < tdReq.length; ++i) {
          if(!requireBookList.includes(tdReq[i]))
            requireBookList.push(tdReq[i]);
        }
        const newBible = createBibleByBooks(version, await getRequireBooks(version, requireBookList));
        setBible(newBible);
        setRequireBookList(requireBookList);
        setPlan(json);
      }
    })();
  }, [version, requireBookList, setPlan, setRequireBookList]);

  console.log(requireBookList);
  console.log(bible);

  return (
    <div className="flex flex-col gap-5 justify-between items-center absolute top-0 left-0 h-fit min-h-full w-full pt-2 pb-4 bg-dlyw font-noto-sans-TC">
      <div id="contents" className="w-fit pt-2 px-14 pb-14 max-md:px-5 space-y-5 overflow-auto">
        <ContentCard>
          <HomepageSetting 
            requireBookList={requireBookList} 
            setBible={setBible} 
            setLocal={setLocal} 
            setVersion={setVersion}
          />
        </ContentCard>
        {
          plan === null ? (
            <>
              <ContentCard>
                <h2>{local.catpions.prepareTitle}</h2>
              </ContentCard>
              <ContentCard>
                <DailyProv bible={bible} local={local} />
              </ContentCard>
            </>
          ) : (
            checkBibleMatchRequirement(requireBookList, bible) ? plan.dailyContent.map((content, idx) => {
              const dayId = getDayId(plan.beginDate);
              const data = plan.requireData[dayId];
              let bibleRange = null;
              if(content.bibleProgressId !== undefined)
                bibleRange = parseBibleRange(plan.bibleProgress[dayId][content.bibleProgressId]);
              return (
                <ContentCard key={idx}>
                  { content.titleId === undefined || data.titles === undefined ? <></> : <h2>{data.titles[idx]}</h2> }
                  { content.captionId === undefined || data.captions === undefined ? <></> : <p>{data.captions[idx]}</p> }
                  { bibleRange === null ? <></> : <BibleViewer content={getBibleView(bible, bibleRange.bookId, bibleRange.chapterId, bibleRange.verseRange)} title={true} version={true} /> }
                </ContentCard>
              )
            }) : (
              <ContentCard>
                <p>Please wait for downloading the bible...</p>
              </ContentCard>
            )
          )
        }
        <ContentCard>
          <p>
            {local.catpions.endingCaption}
            <Link className="ml-2 underline" target="_blank" href="/bible">
              {local.catpions.bibleLinkCaption}
            </Link>
          </p>
        </ContentCard>
      </div>
      <div className="w-[80%]">
        <InfoCard />
      </div>
    </div>
  );
}
