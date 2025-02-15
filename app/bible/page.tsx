import './global.css'
import FullBibleView from "@/components/full-bible-view";
import InfoBox from '@/components/info-box';
import InfoCard from '@/components/info-card';
import NavLinks from '@/components/navlinks';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "QT Bible",
  description: "QT使用的網頁版聖經 | Web version of the Bible used by QT website",
  openGraph: {
    type: "website",
    title: 'QT Bible',
    description: 'QT使用的網頁版聖經 | Web version of the Bible used by QT website',
    url: "/bible",
    images: ['/logo-image?height=630&width=1200'],
  },
  twitter: {
    card: "summary_large_image",
    title: 'QT Bible',
    description: 'QT使用的網頁版聖經 | Web version of the Bible used by QT website',
    images: ['/logo-image?height=630&width=1200'],
  }
}


export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-40 items-center justify-between absolute h-auto min-h-full w-full top-0 left-0 pt-2 pb-4">
        <div className="block h-full w-[80%]">
          <FullBibleView />
        </div>
        <InfoBox>
          <hr className="mb-5" />
          <NavLinks />
          <InfoCard />
        </InfoBox>
      </div>
    </>
  )
}