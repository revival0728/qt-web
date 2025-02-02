type PropType = { 
  options: { id: string, name: string }[],
  name: string,
  onChange: React.ChangeEventHandler<HTMLSelectElement>, 
};

export default function SelectMenu({ name, options, onChange }: PropType) {
  return (
    <select className="w-60 min-w-16 max-md:max-w-28 max-md:w-fit h-9 my-2 px-3 md:rounded-full max-md:px-1 max-md:first:px-3 bg-dlyw max-md:first:rounded-l-md max-md:last:rounded-r-md appearance-none text-clip" name={name} onChange={onChange}>
      {
        options.map((o, idx) => {
          return <option key={idx} value={o.id}>{o.name}</option>
        })
      }
    </select>
  )
}