const toolbarOptions: (Record<string, unknown> | string)[][] = [
  [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }, { 'align': [] }],
  ['clean'],
  ['link', 'image', 'video'],
];

export const createToolbarUI = (): HTMLElement => {
  const toolbar = document.createElement('div');
  toolbar.classList.add('ql-toolbar');
  toolbarOptions.forEach((f) => {
    const formats = document.createElement('span');
    formats.classList.add('ql-formats');
    f.forEach((config) => {
      if(typeof config === 'string') {
        const button = document.createElement('button');
        button.classList.add(`ql-${config}`);
        button.setAttribute('aria-label', config);
        formats.appendChild(button);
      } else {
        const name = Object.keys(config)[0];
        if(typeof config[name] === 'string' || typeof config[name] === 'number') {
          const button = document.createElement('button');
          button.setAttribute('aria-label', `${name}: ${config[name].toString()}`);
          button.setAttribute('value', config[name].toString());
          button.classList.add(`ql-${name}`);
          formats.appendChild(button);
        }
        if(config[name] instanceof Array) {
          const select = document.createElement('select');
          select.classList.add(`ql-${name}`);
          formats.appendChild(select);
        }
      }
    });
    toolbar.appendChild(formats);
  });
  const formats = document.createElement('span');
  formats.classList.add('ql-formats');
  const reciteBible = document.createElement('button');
  reciteBible.innerHTML = "recite";
  reciteBible.classList.add('ql-reciteBible');
  formats.appendChild(reciteBible);
  toolbar.appendChild(formats);
  return toolbar;
}
