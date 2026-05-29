function requireAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(403).send('Acceso denegado. Inicia sesión primero.');
  }
}

module.exports = requireAuth;
