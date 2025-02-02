import Image from "next/image"

export default function InfoCard() {
  return (
    <div className="flex flex-col gap-2 items-center w-full font-klee-one text-hyw opacity-50 select-none">
      <div className="flex w-fit gap-2">
        <span>Made with 💖 by God who loves you.</span>
        <span>©2025 HsingFu</span>
      </div>
      <a className="opacity-20" target="_blank" href="https://github.com/revival0728/qt-web">
        <Image alt="github-repo-link" src="/github-mark.svg" width={98 * 0.3} height={96 * 0.3} />
      </a>
    </div>
  )
}