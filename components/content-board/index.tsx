export default function ContentBoard({ 
  children, 
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <div className="flex flex-col gap-5 justify-between items-center absolute top-0 left-0 h-fit min-h-full w-full pt-2 pb-4 bg-dlyw font-noto-sans-TC">
      {children}
    </div>
  )
}