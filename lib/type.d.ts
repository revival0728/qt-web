export type Verse = {
  id: number,
  verse: string,
};

export type Chapter = {
  id: number,
  verses: Verse[],
};

export type Book = {
  id: string,
  order: number,
  name: string,
  chapters: Chapter[],
}

export type Bible = {
  version: string,
  books: {
    [book: string]: Book,
  }
};

export type BibleView = {
  version: string,
  bookId: string,
  bookName: string,
  chapterId: number,
  chapterName: number,
  verseRange: [number, number],
  fullChapter: boolean,
  verses: Verse[],
};

export type Localize = {
  preferences: {
    version: string,
  },
  catpions: {
    dailyProverbs: string,
    prepareTitle: string,
    endingCaption: string,
    bibleLinkCaption: string,
  },
};

export type LanguageInfo = {
  id: string,
  name: string,
  preferVer: string,
};