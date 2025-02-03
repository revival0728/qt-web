#![allow(dead_code)]

mod proc_bible;
mod slice_bible;
use serde_json::Result;

fn main() -> Result<()> {
  // proc_bible::proc_to_json(
  //   "KJV", 
  //   "/home/revival0728/Downloads/kjv/books.txt", 
  //   "./full-json-bible/KJV-version.json"
  // )
  slice_bible::slice_by_book(
    "/home/revival0728/Documents/repo/qt-web/bible/KJV/full.json", 
    "/home/revival0728/Documents/repo/qt-web/bible/KJV/"
  )
}
