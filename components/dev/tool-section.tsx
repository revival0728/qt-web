export default function DevToolSection({ 
  children, 
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <div className="dev-section my-4 mx-2">
      {children}
    </div>
  )
}