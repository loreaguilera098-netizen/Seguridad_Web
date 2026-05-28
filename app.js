const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const privateRoutes = require('./routes/privateRoutes');

const app = express();

// Middleware básico
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Configuración de sesión con cookie segura (para HTTPS en producción)
app.use(session({
    secret: 'clave-super-segura-cambiarla-en-produccion',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,      // No accesible desde JS (mitiga XSS)
        secure: false,       // Cambiar a true si usas HTTPS localmente o en prod
        sameSite: 'lax',     // Mitiga CSRF
        maxAge: 1000 * 60 * 10  // 10 minutos
    }
}));

// Servir archivos estáticos (HTML, CSS)
app.use(express.static(path.join(__dirname, 'views')));

// Rutas
app.use('/auth', authRoutes);
app.use('/private', privateRoutes);

// Redirección raíz al login
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});