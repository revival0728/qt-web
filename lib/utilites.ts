import type { Bible, BibleView, Verse } from "./type"; 

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

export { getBibleView };