mod type_def;
mod proc_bible;
mod slice_bible;

use wasm_bindgen::prelude::*;

fn set_panic_hook() {
  // When the `console_error_panic_hook` feature is enabled, we can call the
  // `set_panic_hook` function at least once during initialization, and then
  // we will get better error messages if our code ever panics.
  //
  // For more details see
  // https://github.com/rustwasm/console_error_panic_hook#readme
  #[cfg(feature = "console_error_panic_hook")]
  console_error_panic_hook::set_once();
}


use type_def::QTRustError;

impl Into<JsValue> for QTRustError {
  fn into(self) -> JsValue {
    JsValue::undefined()
  }
}

#[wasm_bindgen]
pub fn text_proc_to_json(version: String, bible: String) -> Result<String, QTRustError> {
  set_panic_hook();
  proc_bible::raw::proc_to_json(version, bible)
}

#[wasm_bindgen]
pub fn json_slice_by_book(json_data: String) -> Result<Vec<String>, QTRustError> {
  set_panic_hook();
  slice_bible::raw::slice_by_book(json_data)
}