import type { Bible, CustomPlan } from "@/lib/type"
import ContentCard from "@/components/content-card";
import { getDayId, parseBibleRange, getBibleView } from "@/lib/utilites";
import BibleViewer from "@/components/bible-viewer";

type PropType = {
  plan: CustomPlan,
  bible: Bible,
};

export default function CustomPlanUI({ plan, bible }: PropType) {
  return (
    plan.dailyContent.map((content, idx) => {
      const dayId = getDayId(plan.beginDate);
      const data = plan.requireData[dayId];
      let bibleRange = null;
      if(content.bibleProgressId !== undefined)
        bibleRange = parseBibleRange(plan.bibleProgress[dayId][content.bibleProgressId]);
      return (
        <ContentCard key={idx}>
          { content.titleId === undefined || data.titles === undefined ? <></> : <h2>{data.titles[content.titleId]}</h2> }
          { content.captionId === undefined || data.captions === undefined ? <></> : <p>{data.captions[content.captionId]}</p> }
          { bibleRange === null ? <></> : <BibleViewer content={getBibleView(bible, bibleRange.bookId, bibleRange.chapterId, bibleRange.verseRange)} title={true} version={true} /> }
        </ContentCard>
      )
    })
  )
}