"use client"

type PropType = {
  formName: string,
  reqDatas: {
    inputName: string,
    inputType: React.HTMLInputTypeAttribute,
    inputCaption: string,
  }[], 
  buttonCatpion: string,
  action: (formData: FormData) => void,
}

export default function LocalForm({ formName, reqDatas, buttonCatpion, action }: PropType) {
  const getFormId = (props) => {
    const MOD1 = 1e9 + 7, MOD2 = 987654361;
    const len = props.length;
    let base1 = 1, base2 = 2, hash1 = 0, hash2 = 0;
    for(let i = 0; i < len; ++i) {
      hash1 += base1 * props.charCodeAt(i) % MOD1;
      hash2 += base2 * props.charCodeAt(i) % MOD2;
      base1 = (base1 << 1) % MOD1;
	    base2 = (base2 << 2) % MOD2;
      hash1 %= MOD1;
      hash2 %= MOD2;
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
