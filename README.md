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
        }, ...]
      }, ...]
    }, ...
  }
}
```
轉換完程後可以使用`/qt-rust`的`slice_bible::slice_by_books()`進行分割

`/qt-rust`的`proc_bible::proc_to_json()`可以將[這個網站](http://download.ibibles.net/)的聖經譯本轉換成所需的格式

未來會提供以上兩個函數的網頁版本

新增完檔案和資料夾後須在`/bible/list.json`新增該譯本

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
