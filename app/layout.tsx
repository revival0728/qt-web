import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC, Klee_One } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quiet Time",
  description: "每天與神親近一段時間！ Keep a daily quiet time with God!",
  openGraph: {
    type: "website",
    title: 'Quite Time',
    description: '每天與神親近一段時間！ Keep a daily quiet time with God!',
    url: "",
    images: ['/logo-image?height=630&width=1200'],
  },
  twitter: {
    card: "summary_large_image",
    title: 'Quite Time',
    description: '每天與神親近一段時間！ Keep a daily quiet time with God!',
    images: ['/logo-image?height=630&width=1200'],
  }
};

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-TC',
  subsets: ['latin', 'cyrillic', 'latin-ext'],
})

const notoSerifTC = Noto_Serif_TC({
  variable: '--font-noto-serif-TC',
  subsets: ['latin', 'cyrillic', 'latin-ext'],
});

const kleeOne = Klee_One({
  weight: ["400", "600"],
  variable: '--font-klee-one',
  subsets: ['latin', 'cyrillic', 'latin-ext'],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${notoSansTC.variable} ${notoSerifTC.variable} ${kleeOne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
