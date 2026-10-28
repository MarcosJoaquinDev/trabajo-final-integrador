const { admin } = require('../lib/firebase');

class User {
  constructor() {
    this.db = admin.firestore();
    this.collection = this.db.collection('users');
  }

  async getAll() {
    const snapshot = await this.collection.get();
    const users = [];
    snapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return users;
  }

  async create({ email, pass, nombre, rol }) {
    const userData = {
      email,
      pass,
      nombre,
      rol,
    };
    const docRef = await this.collection.add(userData);
    const doc = await docRef.get();
    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  // me falta buscarlo por email
  static async getByEmail() {
    return null;
  }

  // me falta login
  async login(){
    return null;
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

module.exports = User;
