export type Verse = {
  id: number,
  verse: string,
};

export type Chapter = {
  id: number,
  verses: Verse[],
};

export type Bible = {
  version: string,
  books: {
    [book: string]: {
      id: string,
      order: number,
      name: string,
      chapters: Chapter[],
    },
  }
};
