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
