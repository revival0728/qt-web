import ContentBox from "@/components/content-box";
import InfoCard from "@/components/info-card";
import ContentBoard from "@/components/content-board";
import type { Metadata } from "next";
import NotesClient from "@/components/notes-client";
import NavLinks from "@/components/navlinks";
import InfoBox from "@/components/info-box";

export const metadata: Metadata = {
  robots: {
    index: false,
  },
  openGraph: {
    type: "website",
    title: 'QT Notes',
    description: '你的QT筆記！ Your QT notes!',
    url: "/notes",
    images: ['/logo-image/custom?height=630&width=1200&text=NOTES&fontSize=400'],
  },
  twitter: {
    card: "summary_large_image",
    title: 'QT Notes',
    description: '你的QT筆記！ Your QT notes!',
    images: ['/logo-image/custom?height=630&width=1200&text=NOTES&fontSize=400'],
  }
}

export default function Notes() {
  return (
    <ContentBoard>
      <ContentBox>
        <NotesClient />
      </ContentBox>
      <InfoBox>
        <NavLinks />
        <InfoCard />
      </InfoBox>
    </ContentBoard>
  )
}