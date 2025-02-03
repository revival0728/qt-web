export default function ContentCard({ 
  children, 
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <div 
      className="h-fit max-h-36 w-full hover:max-h-[80vh] overscroll-auto overflow-hidden hover:overflow-auto bg-lyw p-6 rounded-lg shadow-lg transition-all hover:shadow-2xl hover:basis-full hover:z-10"
    >
      {children}
    </div>
  )
}