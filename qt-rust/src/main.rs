mod proc_bible;
use serde_json::Result;

fn main() -> Result<()> {
  proc_bible::proc_to_json(
    "KJV", 
    "/home/revival0728/Downloads/kjv/books.txt", 
    "./full-json-bible/KJV-version.json"
  )
}
