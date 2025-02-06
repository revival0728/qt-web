[English](/docs/README_en.md)

# QT website
這是一個幫助你專注於讀經的網站

- 界面簡潔、不會有干擾讀經的元素
- 使用易於閱讀的配色

## 如何提供建議
可以使用[Github Issues](https://github.com/revival0728/qt-web/issues)

## How to contribute
### 新增聖經版本
各種版本的聖經存放在`/bible`

存放的資料夾名稱需要與版本名稱相同

版本名稱建議全使用英文字母大寫

資料夾內需要有67份`json`

一份`full.json`也就是整本聖經

剩下的皆是以章節編號命名的`json`檔案

`full.json`須將聖經轉換成以下格式
```json
{
  "version": "...",
  "books": {
    "Ge": {
      "id": "Ge",
      "order": 0,
      "name": "創世紀",
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
用`typescript`表示
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

轉換完程後可以使用`/qt-rust`的`slice_bible::slice_by_books()`進行分割

`/qt-rust`的`proc_bible::proc_to_json()`可以將[這個網站](http://download.ibibles.net/)的聖經譯本轉換成所需的格式

[/dev](https://qt.hsingfu.tw/dev)提供以上兩個函數的網路版本 (目前可能無法使用)

新增完檔案和資料夾後須在`/bible/list.json`新增該譯本

<details>
  <summary>章節編號對照表</summary>
  ```json
  [
    { id: 'Ge', name: '創世紀' },
    { id: 'Exo', name: '出埃及記' },
    { id: 'Lev', name: '利未記' },
    { id: 'Num', name: '民數記' },
    { id: 'Deu', name: '申命記' },
    { id: 'Josh', name: '約書亞記' },
    { id: 'Jdgs', name: '士師記' },
    { id: 'Ruth', name: '路得記' },
    { id: '1Sm', name: '撒母耳記上' },
    { id: '2Sm', name: '撒母耳記下' },
    { id: '1Ki', name: '列王記上' },
    { id: '2Ki', name: '列王記下' },
    { id: '1Chr', name: '歷代志上' },
    { id: '2Chr', name: '歷代志下' },
    { id: 'Ezra', name: '以斯拉記' },
    { id: 'Neh', name: '尼希米記' },
    { id: 'Est', name: '以斯帖記' },
    { id: 'Job', name: '約伯記' },
    { id: 'Psa', name: '詩篇' },
    { id: 'Prv', name: '箴言' },
    { id: 'Eccl', name: '傳道書' },
    { id: 'SSol', name: '雅歌' },
    { id: 'Isa', name: '以賽亞書' },
    { id: 'Jer', name: '耶利米書' },
    { id: 'Lam', name: '耶利米哀歌' },
    { id: 'Eze', name: '以西結書' },
    { id: 'Dan', name: '但以理書' },
    { id: 'Hos', name: '何西阿書' },
    { id: 'Joel', name: '約珥書' },
    { id: 'Amos', name: '阿摩司書' },
    { id: 'Obad', name: '俄巴底亞書' },
    { id: 'Jonah', name: '約拿書' },
    { id: 'Mic', name: '彌迦書' },
    { id: 'Nahum', name: '那鴻書' },
    { id: 'Hab', name: '哈巴谷書' },
    { id: 'Zep', name: '西番雅書' },
    { id: 'Hag', name: '哈該書' },
    { id: 'Zec', name: '撒迦利亞書' },
    { id: 'Mal', name: '瑪拉基書' },
    { id: 'Mat', name: '馬太福音' },
    { id: 'Mark', name: '馬可福音' },
    { id: 'Luke', name: '路加福音' },
    { id: 'John', name: '約翰福音' },
    { id: 'Acts', name: '使徒行傳' },
    { id: 'Rom', name: '羅馬書' },
    { id: '1Cor', name: '哥林多前書' },
    { id: '2Cor', name: '哥林多後書' },
    { id: 'Gal', name: '加拉太書' },
    { id: 'Eph', name: '以弗所書' },
    { id: 'Phi', name: '腓立比書' },
    { id: 'Col', name: '歌羅西書' },
    { id: '1Th', name: '帖撒羅尼迦前書' },
    { id: '2Th', name: '帖撒羅尼迦後書' },
    { id: '1Tim', name: '提摩太前書' },
    { id: '2Tim', name: '提摩太後書' },
    { id: 'Titus', name: '提多書' },
    { id: 'Phmn', name: '腓利門書' },
    { id: 'Heb', name: '希伯來書' },
    { id: 'Jas', name: '雅各書' },
    { id: '1Pet', name: '彼得前書' },
    { id: '2Pet', name: '彼得後書' },
    { id: '1Jn', name: '約翰一書' },
    { id: '2Jn', name: '約翰二書' },
    { id: '3Jn', name: '約翰三書' },
    { id: 'Jude', name: '猶大書' },
    { id: 'Rev', name: '啟示錄' }
  ]
  ```
</details>

### 新增網頁翻譯
提供翻譯的同時，需要提供該語言適用的聖經譯本，如果已有合適的可直接引用。

網頁翻譯存放在`/localize`

新增一個符合[地區語言編號對照表](https://www.w3schools.com/tags/ref_language_codes.asp)檔案名的`json`

裡面須包含以下資料

```json
{
  "preferences": {
    "version": "CUV"
  },
  "catpions": {
    "dailyProverbs": "每日箴言",
    "prepareTitle": "先做一個簡單的禱告，安靜自己的心，準備開始今天的讀經。",
    "endingCaption": "有感動想讀其他段落？還是想比照前後文？",
    "bibleLinkCaption": "翻閱聖經"
  }
}
```

新增完成後須在`/localize/list.json`新增該語言

### 新增網頁功能
這個網頁使用以下技術實現
- Typescript
- Next.js
- Tailwind CSS

剩下的部分我會找時間寫一份文件:D

## 聖經譯本來源
| 譯本簡稱 | 來源網址或機構                 |
| ------ | ---------------------------- |
| CUV    | http://download.ibibles.net/ |
| KJV    | http://download.ibibles.net/ |
