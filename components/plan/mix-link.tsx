import type { Plan } from "@/lib/type"
import Link from "next/link";

type PropType = {
  externalLinks: Plan.ExternalLink[] | undefined,
  externalLinkIds: number[] | undefined,
};

export default function MixLink({ externalLinks, externalLinkIds }: PropType) {
  return (
    externalLinkIds === undefined || externalLinks === undefined ? <></> : (
      externalLinkIds.map((id, idx) => {
        return (
          externalLinks[id].url.includes('http') ?
            <a key={idx} className="underline [&:not(:first-child)]:ml-2" target="_blank" href={externalLinks[id].url}>{externalLinks[id].caption}</a>
          :
            <Link key={idx} className="underline [&:not(:first-child)]:ml-2" target="_blank" href={externalLinks[id].url}>{externalLinks[id].caption}</Link>
        )
      })
    )
  )
}