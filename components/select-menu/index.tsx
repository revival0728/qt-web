type PropType = { 
  options: { id: string, name: string }[],
  name: string,
  onChange: React.ChangeEventHandler<HTMLSelectElement>, 
};

export default function SelectMenu({ name, options, onChange }: PropType) {
  return (
    <select className="w-60 h-7 mb-2 bg-lyw" name={name} onChange={onChange}>
      {
        options.map((o, idx) => {
          return <option key={idx} value={o.id}>{o.name}</option>
        })
      }
    </select>
  )
}