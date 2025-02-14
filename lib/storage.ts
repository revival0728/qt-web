// This lib handles data storage

import localforage from "localforage";

const storage = localforage;
storage.config({
  name: 'qt-web',
  storeName: 'qt-web-data'
});

export default storage;