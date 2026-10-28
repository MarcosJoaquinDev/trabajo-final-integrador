const jwt = require("jsonwebtoken");

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

module.exports = { middlewareToken }