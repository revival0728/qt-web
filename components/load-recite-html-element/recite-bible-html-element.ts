import type { BibleRange, Book } from "../../lib/type";
import { parseBibleRange, PEO_BOOK } from "../../lib/utilites";

export class ReciteBibleElement extends HTMLElement {
  constructor() {
    super();
  }
  #genTitle = (book: Book, range: BibleRange) => {
    const verseId: string[] = [];
    if(range.verseRange !== undefined) {
      verseId.push(":");
      verseId.push(range.verseRange[0].toString());
      verseId.push("-");
      verseId.push(range.verseRange[1].toString());
    }
    return `${book.name} ${range.chapterId}${verseId.join("")}`;
  }
  async connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement('style');
    style.textContent = `
      .bible-verse-id {
        vertical-align: text-top;
        font-size: 0.875rem /* 14px */;
        line-height: 1.25rem /* 20px */;
        font-weight: 300;
        opacity: 0.8;
        user-select: none;
      }
      .bible-verse {
        font-family: var(--font-noto-serif-TC);
        font-size: 1.5rem /* 24px */;
        --tw-text-opacity: 1;
        color: rgb(31 41 55 / var(--tw-text-opacity, 1)) /* #1f2937 */;
        line-height: 2;
      }
      .bible-verse h2 {
        font-weight: 600;
        margin: 0;
      }
      .bible-verse h2 span.bible-version {
        margin-left: 0.5rem /* 8px */;
      }
      .bible-verse p {
        margin: 0;
      }
    `;
    shadow.appendChild(style);
    const src = this.getAttribute('src');
    if(src === null) return;
    try {
      const range = parseBibleRange(src);
      if(range === undefined) {
        shadow.innerHTML = src;
        return;
      }
      if(range.version === undefined) {
        const ver = this.getAttribute('version');
        if(ver !== null)
          range.version = ver;
        else
          range.version = "CUV";
      }
      const book = (await import(`@/bible/${range.version}/${range.bookId}`)).default as Book;
      const article = document.createElement('article');
      article.classList.add('bible-verse');
      if(this.getAttribute('title') !== null) {
        const title = document.createElement('h2');
        title.textContent = this.#genTitle(book, range);
        if(this.getAttribute('version') !== null && range.version !== undefined) {
          const version = document.createElement('span');
          version.classList.add('bible-version');
          version.textContent = range.version;
          title.appendChild(version);
        }
        article.appendChild(title);
      }
      const ch = book.chapters[range.chapterId - 1].verses;
      const peo = PEO_BOOK.includes(book.id);
      if(range.verseRange === undefined)
        range.verseRange = [1, ch.length];
      const ptag = document.createElement('p');
      for(let i = range.verseRange[0] - 1; i <= range.verseRange[1] - 1; ++i)  {
        const v = ch[i];
        const verse = peo ? document.createElement('p') : document.createElement('span');
        const id = document.createElement('span');
        id.classList.add('bible-verse-id');
        id.innerHTML = v.id.toString();
        verse.appendChild(id);
        verse.innerHTML += v.verse;
        if(peo)
          article.appendChild(verse)
        else
          ptag.appendChild(verse);
      }
      if(!peo)
        article.appendChild(ptag);
      shadow.appendChild(article);
    } catch(err) {
      console.log(err);
      return;
    }
  }
}

customElements.define('recite-bible', ReciteBibleElement);