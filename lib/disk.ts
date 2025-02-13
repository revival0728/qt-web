// This lib handles data storage

class Disk {
  storage: StripStorage;

  constructor(storage: StripStorage) {
    this.storage = storage;
  }
}

const disk = new Disk(localStorage);

export default Disk;