// This lib handles data storage

import localforage from "localforage";

const data = localforage;
data.config({
  name: 'qt-web',
  storeName: 'qt-web-data'
});

const userNotes = localforage.createInstance({
  name: 'qt-web',
  storeName: 'user-notes',
});

class storage {
  static data = data;
  static getItem = data.getItem;
  static setItem = data.setItem;

  static userNotes = userNotes;
}

export default storage;