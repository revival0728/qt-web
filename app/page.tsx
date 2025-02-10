"use client"

import defaultLang from "@/localize/zh-TW.json";
import defaultProv from "@/bible/CUV/Prv.json";

import type { CustomPlan, Bible, Localize } from "@/lib/type";
import { useEffect, useState } from "react";
import ContentCard from "@/components/content-card";
import { checkBibleMatchRequirement, createBibleByBooks, getDayId } from "@/lib/utilites";
import HomepageSetting from "@/components/homepage-setting";
import InfoCard from "@/components/info-card";
import CustomPlanUI from "@/components/plan/custom-plan-ui";
import DefaultPlan from "@/components/plan/default-plan";
import TextEditor from "@/components/text-editor";

export default function Home() {
  const [requireBookList, setRequireBookList] = useState<string[]>(["Prv"]);
  const [version, setVersion] = useState<string>(defaultLang.preferences.version);
  const [bible, setBible] = useState<Bible>(createBibleByBooks("CUV", [defaultProv]));
  const [local, setLocal] = useState<Localize>(defaultLang);
  const [langId, setLangId] = useState<string>("zh-TW");
  const [plan, setPlan] = useState<CustomPlan | null>(null);

  useEffect(() => {
    const localLangId = localStorage.getItem('langId');
    if(localLangId !== null) {
      setLangId(localLangId);
    }
  }, [setLangId]);
  useEffect(() => {
    if(plan === null) return;
    if(plan.langId !== langId) {
      if(plan.localizeData !== undefined && langId in plan.localizeData) {
        setPlan({
          ...plan,
          langId: langId,
          requireData: plan.localizeData[langId],
        });
      }
    }
  }, [langId, plan, setPlan]);
  useEffect(() => {
    // Update requireBookList and plan
    // Bible updates in <HomepageSetting />
    (async() => {
      const localPlan = localStorage.getItem('currentPlan');
      if(localPlan !== null) {
        const json: CustomPlan = JSON.parse(localPlan);
        const dayId = getDayId(json.beginDate);
        const newList = [...requireBookList];
        const tdReq = json.requireBookList[dayId];
        let isListUpdated = false;
        for(let i = 0; i < tdReq.length; ++i) {
          if(!newList.includes(tdReq[i])) {
            newList.push(tdReq[i]);
            isListUpdated = true;
          }
        }
        if(isListUpdated)
          setRequireBookList(newList);
        setPlan(json);
      }
    })();
  }, [version, requireBookList, setPlan, setRequireBookList]);

  return (
    <div className="flex flex-col gap-5 justify-between items-center absolute top-0 left-0 h-fit min-h-full w-full pt-2 pb-4 bg-dlyw font-noto-sans-TC">
      <div id="contents" className="w-fit pt-2 px-14 pb-14 max-md:px-5 space-y-5 overflow-auto">
        <ContentCard>
          <HomepageSetting 
            requireBookList={requireBookList} 
            langId={langId}
            setBible={setBible} 
            setLocal={setLocal} 
            setVersion={setVersion}
            setLangId={setLangId}
          />
        </ContentCard>
        {
          plan === null ? (
            <DefaultPlan local={local} bible={bible} />
          ) : (
            checkBibleMatchRequirement(requireBookList, bible) ? 
              <CustomPlanUI bible={bible} plan={plan} />
                :
              <ContentCard>
                <p>{`${local.catpions.waitForDownload}...`}</p>
              </ContentCard>
          )
        }
        <ContentCard>
          <TextEditor />
        </ContentCard>
      </div>
      <div className="w-[80%]">
        <InfoCard />
      </div>
    </div>
  );
}