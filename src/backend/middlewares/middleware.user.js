const jwt = require("jsonwebtoken");

const ADMIN = process.env.ROL_ADMIN;

function adminOnly(req, res, next) {
    if (req.dataUser?.rol != ADMIN) {
        return res.status(403).json({ error: "No tenés roles de administrador" });
    }
    next();
}


function middlewareToken(req, res, next) {
    const [tipo, token] = (req.headers.authorization ?? "").split(" ");
    
    if (tipo !== "Bearer" || !token) {
        return res.status(401).json({ error: "Hace falta iniciar sesión" });
    }
    try {
        req.dataUser = jwt.verify(token, process.env.CANTINA_TOKEN);
        next();
    } catch (e) {
        return res.status(401).json({ error: "La sesión no es válida o venció" });
    }
}

module.exports = { adminOnly,middlewareToken }