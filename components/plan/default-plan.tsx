import { Bible, Localize } from "@/lib/type"
import Link from "next/link";
import ContentCard from "@/components/content-card";
import DailyProv from "@/components/daily-prov";

type PropType = {
  local: Localize,
  bible: Bible,
};

export default function DefaultPlan({ local, bible }: PropType) {
  return (
    <> <ContentCard>
        <h2>{local.catpions.prepareTitle}</h2>
      </ContentCard>
      <ContentCard>
        <DailyProv bible={bible} local={local} />
      </ContentCard>
      <ContentCard>
        <p>
          {local.catpions.endingCaption}
          <Link className="ml-2 underline" target="_blank" href="/bible">
            {local.catpions.bibleLinkCaption}
          </Link>
        </p>
      </ContentCard>
    </>
  )
}