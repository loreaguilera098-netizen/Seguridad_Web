const express = require('express');
const router = express.Router();
const { users } = require('../data/users');

// POST /auth/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        console.log(`[LOG] Fallo login: ${username}`);
        return res.status(401).send('Credenciales incorrectas');
    }

    // Crear sesión
    req.session.user = { username: user.username, role: user.role };
    console.log(`[LOG] Login exitoso: ${username}`);

    // Redirigir a zona privada
    res.redirect('/private/dashboard');
});

// GET /auth/logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log('[ERROR] Logout fallido', err);
            return res.status(500).send('Error al cerrar sesión');
        }
        console.log('[LOG] Sesión destruida');
        res.redirect('/login.html');
    });
});

module.exports = router;