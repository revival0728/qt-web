use serde::{Serialize, Deserialize};
use std::collections::BTreeMap;
use std::fmt::Display;
use std::num::ParseIntError;

#[derive(Serialize, Deserialize, Debug, Default, Clone)]
pub struct Verse {
    pub id: u32,
    pub verse: String,
}

#[derive(Serialize, Deserialize, Debug, Default, Clone)]
pub struct Chapter {
    pub id: u32,
    pub verses: Vec<Verse>,
}

#[derive(Serialize, Deserialize, Debug, Default, Clone)]
pub struct Book {
    pub id: String,
    pub order: u32,
    pub name: String,
    pub chapters: Vec<Chapter>,
}

#[derive(Serialize, Deserialize, Debug, Default, Clone)]
pub struct Bible {
    pub version: String,
    pub books: BTreeMap<String, Book>,
}

#[derive(Debug)]
pub enum QTRustError {
    Json(serde_json::Error),
    ParseInt(ParseIntError),
}
impl Display for QTRustError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Json(e) => e.fmt(f),
            Self::ParseInt(e) => e.fmt(f),
        }
    }
}
use std::error::Error;
impl Error for QTRustError {}