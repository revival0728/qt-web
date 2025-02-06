"use client"

type PropType = {
  reqDatas: {
    inputName: string,
    inputType: React.HTMLInputTypeAttribute,
    inputCaption: string,
  }[], 
  buttonCatpion: string,
  action: (formData: FormData) => void,
}

export default function LocalForm({ reqDatas, buttonCatpion, action }: PropType) {
  const getFormId = () => {
    if(window === undefined) return;
    const props = JSON.stringify(reqDatas) + buttonCatpion + action.toString();
    const MOD = 1e9 + 7;
    const len = props.length;
    let hash1 = 0, hash2 = 0;
    for(let i = 0; i < len; ++i) {
      hash1 += (1 << i) * props.charCodeAt(i) % MOD;
      hash2 += (1 << (len - i - 1)) * props.charCodeAt(i) % MOD;
      hash1 %= MOD;
      hash2 %= MOD;
    }
    return (hash1 ^ hash2).toString();
  }
  const formId = getFormId();
  const onClick = () => {
    if(formId === undefined) return;
    const form = document.getElementById(`${formId}-localForm`);
    if(!(form instanceof HTMLDivElement)) return;
    const formData = new FormData();
    for(let i = 0; i < reqDatas.length; ++i) {
      const inputName = reqDatas[i].inputName;
      const input = form.getElementsByClassName(`${formId}-${inputName}`)[0];
      if(input instanceof HTMLInputElement) {
        if(input.files !== null)
          formData.append(inputName, input.files[0]);
        else
          formData.append(inputName, input.value);
      }
    }
    action(formData);
  }

  return (
    <div id={`${formId}-localForm`}>
      {
        reqDatas.map(({ inputType, inputName, inputCaption }, idx) => {
          return (
            <div className="my-1" key={idx}>
              <span className="mr-1">{inputCaption}</span>
              <input placeholder={inputCaption} className={`${formId}-${inputName} border-2`} name={inputName} type={inputType}></input>
            </div>
          )
        })
      }
      <button className="bg-slate-200 p-3 rounded" type="button" onClick={onClick}>{buttonCatpion}</button>
    </div>
  )
}