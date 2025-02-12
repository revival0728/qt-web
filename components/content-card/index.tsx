export default function ContentCard({ 
  children, 
}: Readonly<{
  children: React.ReactNode,
}>) {
  const onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const current = event.currentTarget;
    if(current.classList.contains('content-card-current')) return;
    const cards = document.getElementsByClassName('content-card');
    for(let i = 0; i < cards.length; ++i) {
      const card = cards[i];
      card.classList.remove('content-card-current');
    }
    current.classList.add('content-card-current');
  };
  
  return (
    <div 
      onClick={onClick}
      className="content-card h-fit max-h-36 w-full max-w-[80vw] max-md:max-w-[95vw] overscroll-auto overflow-hidden bg-lyw p-6 rounded-lg shadow-lg transition-all hover:shadow-2xl hover:z-10"
    >
      {children}
    </div>
  )
}