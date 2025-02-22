import ContentBoard from "@/components/content-board";
import ContentBox from "@/components/content-box";
import PlanCustomClient from "@/components/plan-custom-client";

export default function PlanCustom() {
  return (
    <ContentBoard>
      <ContentBox>
        <PlanCustomClient />
      </ContentBox>
    </ContentBoard>
  )
}