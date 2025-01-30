mod proc_bible;
use serde_json::Result;

fn main() -> Result<()> {
  proc_bible::proc_to_json(
    "CUT", 
    "/home/revival0728/Downloads/cut/books.txt", 
    "./full-json-bible/CUT-version.json"
  )
}
