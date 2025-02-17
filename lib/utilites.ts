import type { Bible, BibleView, Verse, Book, BibleRange } from "./type"; 

export const PEO_BOOK: string[] = ["Psa", "Prv", "Eccl", "SSol"];

export function getBibleView(bible: Bible, bookId: string, chapterId: number, verseRange?: [number, number]): BibleView {
  const fullVerse = bible.books[bookId].chapters[chapterId].verses;
  const fullChapter = verseRange === undefined;
  if(verseRange === undefined)
    verseRange = [fullVerse[0].id, fullVerse[fullVerse.length - 1].id];
  const verses: Verse[] = fullVerse
    .filter((verse) => verseRange[0] <= verse.id && verse.id <= verseRange[1]);
  return {
    bookId,
    chapterId,
    verseRange,
    verses,
    fullChapter, 
    version: bible.version,
    bookName: bible.books[bookId].name,
    chapterName: bible.books[bookId].chapters[chapterId].id,
  }
}

export function createBibleByBooks(version: string, argBooks: Book[]): Bible {
  const books: { [book: string]: Book } = {};
  for(let i = 0; i < argBooks.length; ++i) {
    books[argBooks[i].id] = argBooks[i];
  }

  return {
    version,
    books,
  }
}

export async function getRequireBooks(version: string, requireBookList: string[]): Promise<Book[]> {
  const res: Promise<Book>[] = requireBookList.map(async (bookId) => {
    const book: Book = await import(`@/bible/${version}/${bookId}.json`);
    return book;
  });

  return await Promise.all(res);
}

export function getDayId(beginDateString: string): number {
  const beginDate = new Date(beginDateString);
  return Math.floor((Date.now() - beginDate.valueOf()) / (1000 * 60 * 60 * 24));
}

export function getRawBibleRangeFormat(): RegExp { 
  return /([A-Z]+_)?([A-Z][a-z]+)=([1-9][0-9]*)(:([1-9][0-9]*)(-([1-9][0-9]*):([1-9][0-9]*))?)?/y;
}
export function parseBibleRange(raw: string): BibleRange | undefined {
  if(!getRawBibleRangeFormat().test(raw)) return undefined;
  let version = undefined;
  let splitVB = ["" , raw];
  if(raw.includes('_')) {
    splitVB = raw.split('_');
    version = splitVB[0];
  }
  const splitBR = splitVB[1].split('=');
  const bookId = splitBR[0];
  const splitBE = splitBR[1].split('-');
  const parseCV = (raw: string) => {
    const split = raw.split(':');
    const res: number[] = [];
    for(let i = 0; i < split.length; ++i)
      res.push(parseInt(split[i]));
    return res;
  }
  const cv = parseCV(splitBE[0]);
  const chapterId = cv[0];
  if(splitBE.length === 1) {
    if(cv.length === 1) {
      return {
        version,
        bookId,
        chapterId,
      };
    }
    const verseRange: [number, number] = [cv[1], cv[1]];
    return {
      version,
      bookId,
      chapterId,
      verseRange,
    };
  }
  const begin = parseCV(splitBE[0]);
  const end = parseCV(splitBE[1]);
  if(begin[0] !== end[0]) return undefined;
  const verseRange: [number, number] = [begin[1], end[1]];
  return {
    version,
    bookId,
    chapterId,
    verseRange,
  };
}

export function checkBibleMatchRequirement(requireBookList: string[], bible: Bible): boolean {
  const exist = Object.keys(bible.books).sort();
  const req = requireBookList.toSorted();
  if(exist.length !== req.length) return false;
  return exist.every((value, idx) => value === req[idx]);
}