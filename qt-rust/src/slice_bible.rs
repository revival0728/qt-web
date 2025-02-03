use serde_json::{Result, Value};
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

pub fn slice_by_book(file_dest: &str, save_dest: &str) -> Result<()> {
  let mut file = match File::open(file_dest) {
      Ok(v) => v,
      Err(_) => {
          println!("Error while opening {file_dest}");
          return Ok(());
      }
  };
  let mut json_data = String::new();
  match file.read_to_string(&mut json_data) { Ok(_) => {}, Err(_) => { println!("Error while reading file"); return Ok(()); } };
  let bible: Value = serde_json::from_str(&json_data)?;

  let book = bible["books"].as_object().unwrap();

  let dest_foler = Path::new(save_dest);
  for (book_id, data) in book {
    let dest_file = dest_foler.join(format!("{book_id}.json"));
    let mut save = match File::create(dest_file) {
        Ok(v) => v,
        Err(_) => {
            println!("Error while creating {save_dest}");
            return Ok(());
        }
    };
    let render_res = serde_json::to_string(data)?;
    match save.write_all(render_res.as_bytes()) { Ok(_) => {}, Err(_) => { println!("Error while writing file"); return Ok(()); } };
  }

  Result::Ok(())
}