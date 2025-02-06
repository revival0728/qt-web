use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

pub fn slice_by_book(file_dest: &str, save_dest: &str) -> Result<(), crate::type_def::QTRustError> {
  let mut file = match File::open(file_dest) {
      Ok(v) => v,
      Err(_) => {
          println!("Error while opening {file_dest}");
          return Ok(());
      }
  };
  let mut json_data = String::new();
  match file.read_to_string(&mut json_data) { Ok(_) => {}, Err(_) => { println!("Error while reading file"); return Ok(()); } };

  let books = raw::slice_by_book(json_data)?;

  let dest_foler = Path::new(save_dest);
  for book in books.chunks(2) {
    let book_id = &book[0];
    let data = &book[1];
    let dest_file = dest_foler.join(format!("{book_id}.json"));
    let mut save = match File::create(dest_file) {
        Ok(v) => v,
        Err(_) => {
            println!("Error while creating {save_dest}");
            return Ok(());
        }
    };
    match save.write_all(data.as_bytes()) { Ok(_) => {}, Err(_) => { println!("Error while writing file"); return Ok(()); } };
  }

  Result::Ok(())
}

pub mod raw {
  use serde_json::Value;
  use crate::type_def::*;

  // return Result<[id, data, id, data, ...], QTRustError>
  pub fn slice_by_book(json_data: String) -> Result<Vec<String>, QTRustError> {
    let bible: Value = match serde_json::from_str(&json_data) { Ok(v) => Ok(v), Err(e) => Err(QTRustError::Json(e)) }?;
    let books = bible["books"].as_object().unwrap();
    let mut ret = Vec::new();
    for (book_id, data) in books {
      let res = match serde_json::to_string(data) { Ok(v) => Ok(v), Err(e) => Err(QTRustError::Json(e))}?;
      ret.push(book_id.clone());
      ret.push(res);
    }

    Result::Ok(ret)
  }
}