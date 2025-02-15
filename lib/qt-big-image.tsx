export const alt = 'QTBigImage';
export const contentType = 'image/png';

export default function QTBigImage(fontSize: number, text?: string) {
  return (
    <div 
      style={{
        fontSize,
        color: '#fdfde0',
        backgroundColor: '#686840',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >{text === undefined ? 'QT' : text}</div>
  );
}