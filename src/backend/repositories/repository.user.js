const { admin } = require('../lib/firebase');
const bcrypt = require('bcryptjs');

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

  static async getByEmail(email) {
    const db = admin.firestore();
    const snapshot = await db
      .collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async login(email, pass) {
    const user = await User.getByEmail(email);
    if (!user || !user.pass) {
      return null;
    }
    const isValid = await bcrypt.compare(pass, user.pass);
    if (!isValid) {
      return null;
    }
    return user;
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
