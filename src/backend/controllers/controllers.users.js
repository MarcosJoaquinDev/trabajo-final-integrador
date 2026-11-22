const User = require("../repositories/repository.user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ADMIN = process.env.ROL_ADMIN;

function getAllUsers(userRol){
    if(userRol != ADMIN) {
        return new Error.message('No tenés roles de administrador');
    }
    const repositoryUser = new User();
    const allUsers = repositoryUser.getAll();
    return allUsers;
}

async function getUserById(id){
    const repositoryUser = new User();
    return await repositoryUser.getById(id);
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

    return await repositoryUser.update(id, updateData);
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

async function createUser(name,password,email,rol){
    const emailFound = await findByEmail(email);
    if (emailFound) {
        const error = new Error("Ya hay un registro con este email");
        error.status = 409;
        throw error;
    }

    const pass = await encryptWord(password);
    return await new User().create({ name, email, pass, rol });
}

async function verifyUser(email, password) {
    try {
        const dataUser = await new User().login(email, password);
        if (!dataUser) {
            return new Error("El email o contraseña son incorrectos");
        }
        return jwt.sign(dataUser, process.env.CANTINA_TOKEN);
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