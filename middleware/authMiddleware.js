function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        return next(); // Usuario autenticado
    }
    // Denegar acceso
    res.status(401).send(`
        <h3>Acceso denegado</h3>
        <p>No tienes una sesión activa. <a href="/login.html">Iniciar sesión</a></p>
    `);
}

module.exports = { requireAuth };