import type { Bible, CustomPlan } from "@/lib/type"
import ContentCard from "@/components/content-card";
import { getDayId, parseBibleRange, getBibleView } from "@/lib/utilites";
import BibleViewer from "@/components/bible-viewer";
import MixLink from "./mix-link";

type PropType = {
  plan: CustomPlan,
  bible: Bible,
};

//TODO: youtubeVideo support.
//TODO: show progress
export default function CustomPlanUI({ plan, bible }: PropType) {
  const _dayId = getDayId(plan.beginDate);
  const dayId = plan.loop ? _dayId % plan.duration : _dayId;
  const data = plan.requireData[dayId];

  return (
    plan.dailyContent.map((content, idx) => {
      
      let bibleRange = null;
      if(content.bibleProgressId !== undefined)
        bibleRange = parseBibleRange(plan.bibleProgress[dayId][content.bibleProgressId]);
      return (
        <ContentCard key={idx}>
          { content.titleId === undefined || data.titles === undefined ? <></> : <h2>{data.titles[content.titleId]}</h2> }
          { 
            content.captionId === undefined || data.captions === undefined ? <></> 
              : <p>
                  <span>{data.captions[content.captionId]}</span>
                  <MixLink externalLinkIds={content.externalLinkIds} externalLinks={data.externalLinks} />
                </p> 
          }
          {
            (content.captionId === undefined || data.captions === undefined) && !(content.externalLinkIds === undefined || data.externalLinks === undefined) ?
              <p><MixLink externalLinkIds={content.externalLinkIds} externalLinks={data.externalLinks} /></p> : <></>
          }
          { bibleRange === null || bibleRange === undefined ? <></> : <BibleViewer content={getBibleView(bible, bibleRange.bookId, bibleRange.chapterId, bibleRange.verseRange)} title={true} version={true} /> }
        </ContentCard>
      )
    })
  )
}