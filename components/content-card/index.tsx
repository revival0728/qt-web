export default function ContentCard({ 
  children, 
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <div 
      className="content-card h-fit max-h-36 w-full max-w-[80vw] max-md:max-w-[95vw] hover:max-h-none overscroll-auto overflow-hidden hover:overflow-auto bg-lyw p-6 rounded-lg shadow-lg transition-all hover:shadow-2xl hover:z-10"
    >
      {children}
    </div>
  )
}