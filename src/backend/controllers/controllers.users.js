const User = require("../repositories/repository.user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ADMIN = process.env.ROL_ADMIN;

function publicUser(user) {
    if (!user) return user;
    const { pass, encryptedPass, ...safe } = user;
    return safe;
}

async function getAllUsers(){
    const repositoryUser = new User();
    const allUsers = await repositoryUser.getAll();
    return allUsers.map(publicUser);
}

async function getUserById(id){
    const repositoryUser = new User();
    return publicUser(await repositoryUser.getById(id));
}

async function updateUserById(id, data){
    const repositoryUser = new User();
    const userFound = await repositoryUser.getById(id);
    if (!userFound) {
        return null;
    }

    const allowedFields = ["nombre", "email", "rol", "pass"];
    const updateData = {};
    allowedFields.forEach((field) => {
        if (data[field] !== undefined) {
            updateData[field] = data[field];
        }
    });

    if (Object.keys(updateData).length === 0) {
        const error = new Error("No hay campos válidos para actualizar");
        error.status = 400;
        throw error;
    }

    if (updateData.pass) {
        updateData.pass = await encryptWord(updateData.pass);
    }

    return publicUser(await repositoryUser.update(id, updateData));
}

async function deleteUserById(id){
    const repositoryUser = new User();
    const userFound = await repositoryUser.getById(id);
    if (!userFound) {
        return null;
    }
    return await repositoryUser.delete(id);
}

async function findByEmail(email){
    return await User.getByEmail(email);
}

const ROL_POR_DEFECTO = "usuario";

async function createUser(name, password, email) {
    if (!name || !email || !password) {
        const error = new Error("Faltan datos: nombre, email y contraseña");
        error.status = 400;
        throw error;
    }

    const emailFound = await findByEmail(email);
    if (emailFound) {
        const error = new Error("Ya hay un registro con este email");
        error.status = 409;
        throw error;
    }

    const pass = await encryptWord(password);
    const created = await new User().create({
        name,
        email,
        pass,
        rol: ROL_POR_DEFECTO,
    });
    return publicUser(created);
}

async function verifyUser(email, password) {
    try {
        const dataUser = await new User().login(email, password);
        if (!dataUser) {
            return new Error("El email o contraseña son incorrectos");
        }

        // Nunca incluir la contraseña (ni hasheada) en el token.
        const payload = {
            id: dataUser.id,
            email: dataUser.email,
            name: dataUser.name ?? dataUser.nombre,
            rol: dataUser.rol ?? ROL_POR_DEFECTO,
        };
        return jwt.sign(payload, process.env.CANTINA_TOKEN, { expiresIn: "7d" });
    } catch (e) {
        return new Error(e.message);
    }
}

async function encryptWord(pass) {
    const passwordHashed = await bcrypt.hash(pass, 10);
    return passwordHashed;
}

module.exports = {
    createUser,
    verifyUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}