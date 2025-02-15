export default function ContentBox({ 
  children, 
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <div id="contents" className="w-fit pt-2 px-14 pb-14 max-md:px-5 space-y-5 overflow-auto">
      {children}
    </div>
  )
}