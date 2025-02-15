export default function InfoBox({ 
  children, 
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <div className="w-[80%]">
      {children}
    </div>
  )
}