import './global.css'
import FullBibleView from "@/components/full-bible-view";
import InfoCard from '@/components/info-card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    title: 'QT Bible',
    description: '每天與神親近一段時間！ Keep a daily quiet time with God!',
    url: "/bible",
    images: ['/logo-image?height=630&width=1200'],
  },
  twitter: {
    card: "summary_large_image",
    title: 'QT Bible',
    description: '每天與神親近一段時間！ Keep a daily quiet time with God!',
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
        <div className="block w-[80%]">
          <hr className="mb-5" />
          <InfoCard />
        </div>
      </div>
    </>
  )
}