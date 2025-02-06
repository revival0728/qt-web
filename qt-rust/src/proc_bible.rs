use std::fs::File;
use std::io::prelude::*;

// Download full bible from http://download.ibibles.net/
// Convert the "books.txt" to a marked json file
pub fn proc_to_json(version: &str, file_dest: &str, save_dest: &str) -> Result<(), crate::type_def::QTRustError> {
    let mut file = match File::open(file_dest) {
        Ok(v) => v,
        Err(_) => {
            println!("Error while opening {file_dest}");
            return Ok(());
        }
    };
    let mut bible = String::new();
    match file.read_to_string(&mut bible) { Ok(_) => {}, Err(_) => { println!("Error while reading file"); return Ok(()); } };
    let mut save = match File::create(save_dest) {
        Ok(v) => v,
        Err(_) => {
            println!("Error while creating {save_dest}");
            return Ok(());
        }
    };
    let render_res = raw::proc_to_json(version.to_string(), bible.to_string())?;
    match save.write_all(render_res.as_bytes()) { Ok(_) => {}, Err(_) => { println!("Error while writing file"); return Ok(()); } };

    Result::Ok(())
}

pub mod raw {
    use crate::type_def::*;

    pub fn proc_to_json(version: String, bible: String) -> Result<String, QTRustError> {
        let lines: Vec<&str> = bible.trim().split('\n').collect();
        let mut json_bible = Bible::default();
        let mut cur_order = 0_u32;
        let mut cur_book = Book::default();
        let mut cur_book_fn: &str = &"";
        let mut cur_chapter= Chapter::default();

        json_bible.version = version.to_string();

        for line in lines {
            let data: Vec<&str> = line.split(' ').collect();
            if data[0].contains("=") {
                cur_book = Book::default();
                cur_chapter = Chapter::default();
                if data.len() >= 2 {
                    cur_book_fn = data[1];
                }
            } else if data[0] == "END" {
                cur_book.chapters.push(cur_chapter);
                cur_chapter = Chapter::default();
                let cloned_book = cur_book.clone();
                json_bible.books.insert(cloned_book.id.clone(), cloned_book);
                cur_order += 1;
            } else {
                cur_book.id = data[0].to_string();
                cur_book.name = (if data[0] == data[2] { cur_book_fn } else { data[2] }).to_string();
                cur_book.order = cur_order;
                let info: Vec<&str> = data[1].split(':').collect();
                // let ch = match info[0].parse::<u32>() { Ok(v) => v, Err(e) => { println!("{e}"); return Ok(()); } };
                let ch = match info[0].parse::<u32>() { Ok(v) => v, Err(e) => { return Err(QTRustError::ParseInt(e)); } };
                let ver = match info[1].parse::<u32>() { Ok(v) => v, Err(e) => { return Err(QTRustError::ParseInt(e)); } };
                let verse = data[4..].join(" ");
                if cur_chapter.id == ch {
                    cur_chapter.verses.push(Verse { id: ver, verse });
                } else {
                    if cur_chapter.id > 0 {
                        cur_book.chapters.push(cur_chapter);
                    }
                    cur_chapter = Chapter::default();
                    cur_chapter.id = ch;
                    cur_chapter.verses.push(Verse { id: ver, verse });
                }
            }
        }
        assert_eq!(json_bible.books.len(), 66);

        match serde_json::to_string(&json_bible) {
            Ok(s) => Ok(s),
            Err(e) => Err(QTRustError::Json(e)),
        }
    }

}