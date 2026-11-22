// Carga los datos iniciales en Firestore: colección "menu" desde data.json
// y un usuario admin con la pass hasheada. Ejecutar: node seed.js
require("dotenv").config();

const bcrypt = require("bcryptjs");
const { admin } = require("./lib/firebase");
const menuLocal = require("./repositories/data.json");

async function seedMenu() {
  const collection = admin.collection("menu");
  const snapshot = await collection.get();

  if (!snapshot.empty) {
    console.log(`menu: ya hay ${snapshot.size} documentos, se omite`);
    return;
  }

  for (const categoria of menuLocal.menu) {
    await collection.add({
      categoria: categoria.categoria,
      items: categoria.items ?? [],
      ...(categoria.nota_guarnicion
        ? { nota_guarnicion: categoria.nota_guarnicion }
        : {}),
    });
  }
  console.log(`menu: ${menuLocal.menu.length} categorias cargadas`);
}

async function seedUsers() {
  const collection = admin.collection("users");
  const email = "admin@todosalagua.com";
  const snapshot = await collection.where("email", "==", email).get();

  if (!snapshot.empty) {
    console.log("users: el admin ya existe, se omite");
    return;
  }

  const pass = await bcrypt.hash("123456", 10);
  await collection.add({
    name: "Administrador",
    email,
    pass,
    rol: "admin",
  });
  console.log("users: admin cargado (admin@todosalagua.com / 123456)");
}

async function main() {
  await seedMenu();
  await seedUsers();
  console.log("Seed finalizado.");
  process.exit(0);
}

main().catch((error) => {
  console.error("Error en seed:", error.message);
  process.exit(1);
});
