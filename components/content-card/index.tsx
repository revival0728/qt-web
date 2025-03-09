export default function ContentCard({ 
  children, stretch
}: Readonly<{
  children: React.ReactNode,
  stretch?: boolean,
}>) {
  const stretchCSS = stretch === undefined ? "max-h-36" : stretch ? "max-h-36" : "";
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
      className={`content-card h-fit ${stretchCSS} w-full max-w-[80vw] max-md:max-w-[95vw] overscroll-auto overflow-hidden bg-lyw p-6 rounded-lg shadow-lg transition-all hover:shadow-2xl hover:z-10`}
    >
      {children}
    </div>
  )
}