const { admin } = require('../lib/firebase');
const menu = require("./data.json")

class Menu {
  constructor() {
    this.db = admin.firestore();
    this.collection = this.db.collection('menu');
  }

  getAllLocal() {
    return menu;
  }

  async getAll() {
    const snapshot = await this.collection.get();
    const menuItems = [];
    snapshot.forEach((doc) => {
      menuItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return menuItems;
  }

  async getById(id) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async create(data) {
    const docRef = await this.collection.add(data);
    const doc = await docRef.get();
    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async update(id, data) {
    await this.collection.doc(id).update(data);
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async delete(id) {
    await this.collection.doc(id).delete();
    return { id, deleted: true };
  }
}

module.exports = Menu;
