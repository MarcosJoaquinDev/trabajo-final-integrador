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

function getUserById(id){
    return null
}

function updateUserById(id){
    return null
}

function deleteUserById(id){
    return null
}

async function findByEmail(email){
    const isFound = User.getByEmail(email);
    return isFound;
}

async function createUser(name,password,email,rol){
    const emailFound = findByEmail(email);
    if (emailFound) {
        return new Error("Ya hay un registro con este email");
    }

    const encryptedPass = encryptWord(password);
    const userRepository = new User();
    try {
        const data = {name,email,encryptedPass,rol};
        const responseFirebase = await userRepository.create(data);
        return responseFirebase;
    } catch (e) {
        return e.message;
    }
}

async function verifyUser(email,password) {
    const emailFound = findByEmail(email);

    const userRepository = new User();
    const passwordHashed = encryptWord(password);

    try {
        const dataUser = await userRepository.login(email,passwordHashed);
        if(dataUser.id){
            return jwt.sign(
                dataUser,
                process.env.CANTINA_TOKEN
            )
        }
    } catch (e) {
        return e.message;
    }
    if (!dataUser || !emailFound) {
        return new Error("El email o contraseña son incorrectas");
    }
}

async function encryptWord(pass) {
    const passwordHashed = await bcrypt.hash(clave, 10);
    return passwordHashed;
}

module.exports = {
    createUser, getAllUsers
}