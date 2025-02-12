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

export type BibleRange = {
  bookId: string,
  chapterId: number,
  verseRange?: [number, number],
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
    waitForLoading: string,
    takeSomeNotes: string,
  },
  message: {
    saved: string,
  },
};

export type LanguageInfo = {
  id: string,
  name: string,
  preferVer: string,
};

export namespace Plan {
  export type ExternalLink = {
    caption: string,
    url: string,
  };
  export type RequireData = {
    titles?: string[],
    captions?: string[],
    externalLinks?: ExternalLink[],
    youtubeVideos?: string[],
  };
}

export type CustomPlan = {
  duration: number,
  langId: string,
  beginDate: string,
  loop?: boolean,
  bibleProgress: string[][],
  requireBookList: string[][],
  requireData: Plan.RequireData[],
  dailyContent: {
    titleId?: number,
    captionId?: number,
    youtubeVideoId?: number,
    externalLinkIds?: number[],
    bibleProgressId?: number,
  }[],
  localizeData?: {
    [langId: string]: Plan.RequireData[],
  },
};