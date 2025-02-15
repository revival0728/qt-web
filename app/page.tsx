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
import storage from "@/lib/storage";
import ContentBox from "@/components/content-box";
import ContentBoard from "@/components/content-board";
import InfoBox from "@/components/info-box";
import NavLinks from "@/components/navlinks";

export default function Home() {
  const [requireBookList, setRequireBookList] = useState<string[]>(["Prv"]);
  const [version, setVersion] = useState<string>(defaultLang.preferences.version);
  const [bible, setBible] = useState<Bible>(createBibleByBooks("CUV", [defaultProv]));
  const [local, setLocal] = useState<Localize>(defaultLang);
  const [langId, setLangId] = useState<string>("zh-TW");
  const [plan, setPlan] = useState<CustomPlan | null>(null);

  const isPlanExpired = (checkPlan: CustomPlan | null) => {
    if(checkPlan === null) return true;
    return getDayId(checkPlan.beginDate) >= checkPlan.duration;
  };

  useEffect(() => {
    (async () => {
      const localLangId = await storage.getItem('langId');
      if(typeof localLangId === 'string') {
        setLangId(localLangId);
      }
    })();
  }, [setLangId]);
  useEffect(() => {
    if(plan === null || isPlanExpired(plan)) return;
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
      const localPlan = await storage.getItem('currentPlan') as CustomPlan | null;
      if(localPlan !== null) {
        const json: CustomPlan = localPlan;
        if(isPlanExpired(json)) return;
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
    <ContentBoard>
      <ContentBox>
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
          plan === null || isPlanExpired(plan) ? (
            <DefaultPlan local={local} bible={bible} />
          ) : (
            checkBibleMatchRequirement(requireBookList, bible) ? 
              <CustomPlanUI bible={bible} plan={plan} />
                :
              <ContentCard>
                <p>{`${local.catpions.waitForLoading}...`}</p>
              </ContentCard>
          )
        }
        <ContentCard>
          <h2>{local.catpions.takeSomeNotes}</h2>
          <TextEditor local={local} />
        </ContentCard>
      </ContentBox>
      <InfoBox>
        <NavLinks globalLocal={local} />
        <InfoCard />
      </InfoBox>
    </ContentBoard>
  );
}