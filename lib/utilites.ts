import type { Bible, BibleView, Verse, Book } from "./type"; 

function getBibleView(bible: Bible, bookId: string, chapterId: number, verseRange?: [number, number]): BibleView {
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

function createBibleByBooks(version: string, argBooks: Book[]): Bible {
  const books: { [book: string]: Book } = {};
  for(let i = 0; i < argBooks.length; ++i) {
    books[argBooks[i].id] = argBooks[i];
  }

  return {
    version,
    books,
  }
}

async function getRequireBooks(version: string, requireBookList: string[]): Promise<Book[]> {
  const res: Promise<Book>[] = requireBookList.map(async (bookId) => {
    const book: Book = await import(`@/bible/${version}/${bookId}.json`);
    return book;
  });

  return await Promise.all(res);
}

export { getBibleView, createBibleByBooks, getRequireBooks };