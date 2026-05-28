const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

// Ruta protegida
router.get('/dashboard', requireAuth, (req, res) => {
    res.send(`
        <h1>Área Privada</h1>
        <p>Bienvenido <strong>${req.session.user.username}</strong></p>
        <p>Rol: ${req.session.user.role}</p>
        <a href="/auth/logout">Cerrar sesión</a>
        <br>
        <a href="/login.html">Volver al login</a>
    `);
});

module.exports = router;