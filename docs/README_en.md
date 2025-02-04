# QT website
This is a website to help you focus on your Bible reading.

- Simple, clear interface that doesn't distract from your Bible reading
- Use a color scheme that is easy to read

## How to give suggestions
You can use [Github Issues](https://github.com/revival0728/qt-web/issues) to make suggestions.

## How to contribute
### New Bible Versions
Versions of the Bible are stored in `/bible`.

The folder name needs to be the same as the version name.

It is recommended that the name of the version be in all capital letters.

There should be 67 files of `json` in the folder.

One copy of `full.json` is the entire Bible.

The rest are `json` files with chapter IDs.

The `full.json` needs to be converted to the following format
```json
{
  "version": "...",
  "books": {
    "Ge": {
      "id": "Ge",
      "order": 0,
      "name": "Genesis",
      "chapters": [{
        "id": 1,
        "verses": [{
          "id": 1,
          "verse": "..."
        }, ... ]
      }, ... ]
    }, ...
  }
}
```
In `typescript`
```ts
type Bible = {
  version: string,
  books: {
    [bookId: string]: {
      id: string,
      order: number,
      name: string,
      chapters: {
        id: number,
        verses: {
          id: number,
          verse: string
        }[]
      }[]
    }
  }
};
```
After conversion you can use `/qt-rust`'s `slice_bible::slice_by_books()` for splitting.

`/qt-rust`'s `proc_bible::proc_to_json()` converts the Bible translation from [this site](http://download.ibibles.net/) into the desired format.

Web versions of these two functions will be available in the future.

After adding files and folders, add the translation to `/bible/list.json`.

<details>
  <summary>Chapter ID Reference Table</summary>
  ```json
  [
    { id: 'Ge', name: 'Genesis' },
    { id: 'Exo', name: 'Exodus' },
    { id: 'Lev', name: 'Leviticus' },
    { id: 'Num', name: 'Numbers' },
    { id: 'Deu', name: 'Deuteronomy' },
    { id: 'Josh', name: 'Joshua' },
    { id: 'Jdgs', name: 'Judges' },
    { id: 'Ruth', name: 'Ruth' },
    { id: '1Sm', name: 'Samuel1' },
    { id: '2Sm', name: 'Samuel2' },
    { id: '1Ki', name: 'Kings1' },
    { id: '2Ki', name: 'Kings2' },
    { id: '1Chr', name: 'Chronicles1' },
    { id: '2Chr', name: 'Chronicles2' },
    { id: 'Ezra', name: 'Ezra' },
    { id: 'Neh', name: 'Nehemiah' },
    { id: 'Est', name: 'Esther' },
    { id: 'Job', name: 'Job' },
    { id: 'Psa', name: 'Psalms' },
    { id: 'Prv', name: 'Proverbs' },
    { id: 'Eccl', name: 'Ecclesiastes' },
    { id: 'SSol', name: 'Songs' },
    { id: 'Isa', name: 'Isaiah' },
    { id: 'Jer', name: 'Jeremiah' },
    { id: 'Lam', name: 'Lamentations' },
    { id: 'Eze', name: 'Ezekiel' },
    { id: 'Dan', name: 'Daniel' },
    { id: 'Hos', name: 'Hosea' },
    { id: 'Joel', name: 'Joel' },
    { id: 'Amos', name: 'Amos' },
    { id: 'Obad', name: 'Obadiah' },
    { id: 'Jonah', name: 'Jonah' },
    { id: 'Mic', name: 'Micah' },
    { id: 'Nahum', name: 'Nahum' },
    { id: 'Hab', name: 'Habakkuk' },
    { id: 'Zep', name: 'Zephaniah' },
    { id: 'Hag', name: 'Haggai' },
    { id: 'Zec', name: 'Zechariah' },
    { id: 'Mal', name: 'Malachi' },
    { id: 'Mat', name: 'Matthew' },
    { id: 'Mark', name: 'Mark' },
    { id: 'Luke', name: 'Luke' },
    { id: 'John', name: 'John' },
    { id: 'Acts', name: 'Acts' },
    { id: 'Rom', name: 'Romans' },
    { id: '1Cor', name: 'Corinthians1' },
    { id: '2Cor', name: 'Corinthians2' },
    { id: 'Gal', name: 'Galatians' },
    { id: 'Eph', name: 'Ephesians' },
    { id: 'Phi', name: 'Philippians' },
    { id: 'Col', name: 'Colossians' },
    { id: '1Th', name: 'Thessalonians1' },
    { id: '2Th', name: 'Thessalonians2' },
    { id: '1Tim', name: 'Timothy1' },
    { id: '2Tim', name: 'Timothy2' },
    { id: 'Titus', name: 'Titus' },
    { id: 'Phmn', name: 'Philemon' },
    { id: 'Heb', name: 'Hebrews' },
    { id: 'Jas', name: 'James' },
    { id: '1Pet', name: 'Peter1' },
    { id: '2Pet', name: 'Peter2' },
    { id: '1Jn', name: 'John1' },
    { id: '2Jn', name: 'John2' },
    { id: '3Jn', name: 'John3' },
    { id: 'Jude', name: 'Jude' },
    { id: 'Rev', name: 'Revelation' }
  ]
  ```
</details>

### Add a web translation
The translation should be accompanied by a Bible translation for the language , or if one already exists, it can be used directly.

Web translations are stored in `/localize`.

Add a new `json` with a filename that matches the [localize list](https://www.w3schools.com/tags/ref_language_codes.asp) file name.

It should contain the following information

```json
{
  "preferences": {
    "version": "KJV"
  },
  "catpions": {
    "dailyProverbs": "Daily Proverbs",
    "prepareTitle": "Let's start with a simple prayer to quiet your mind and get ready for today's reading.",
    "endingCaption": "Want to read other passages? Or do you want to compare and contrast?",
    "bibleLinkCaption": "the Bible"
  }
}
```

After adding the new language, you need to add the language in `/localize/list.json`.

### Add web page functionality
This web page is implemented using the following technique
- Typescript
- Next.js
- Tailwind CSS

I'll write a document later :D

## Bible Translation Sources
| Abbreviation | Source URL or Organization |
| ------------ | ---------------------------- |
| CUV          | http://download.ibibles.net/ |
| KJV          | http://download.ibibles.net/ |