const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// Middleware básico
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de sesión
app.use(session({
    secret: 'clave-segura-para-ejemplo',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,  // true solo si usas HTTPS
        sameSite: 'lax',
        maxAge: 1000 * 60 * 10  // 10 minutos
    }
}));

// Servir archivos HTML
app.use(express.static(path.join(__dirname, 'views')));

// Usuarios mock (en producción usar bcrypt)
const users = [
    { username: 'alumno', password: 'santo123', role: 'estudiante' }
];

// Ruta de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        console.log(`❌ Login fallido: ${username}`);
        return res.status(401).send(`
            <script>
                alert('Credenciales incorrectas');
                window.location.href = '/login.html';
            </script>
        `);
    }
    
    req.session.user = {
        username: user.username,
        role: user.role
    };
    
    console.log(`✅ Login exitoso: ${username}`);
    res.redirect('/dashboard');
});

// Middleware para proteger rutas
const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).send(`
            <script>
                alert('Acceso denegado. Debes iniciar sesión primero.');
                window.location.href = '/login.html';
            </script>
        `);
    }
};

// Ruta protegida
app.get('/dashboard', requireAuth, (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Dashboard Seguro</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    margin: 0;
                    padding: 50px;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.2);
                    text-align: center;
                }
                h1 { color: #667eea; }
                .info { background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0; }
                button {
                    background: #dc3545;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                }
                button:hover { background: #c82333; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🔐 Área Protegida</h1>
                <div class="info">
                    <p>Bienvenido, <strong>${req.session.user.username}</strong></p>
                    <p>Rol: ${req.session.user.role}</p>
                    <p>✅ Has accedido correctamente a la ruta segura</p>
                </div>
                <button onclick="location.href='/logout'">Cerrar Sesión</button>
            </div>
        </body>
        </html>
    `);
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error al cerrar sesión');
        }
        console.log('👋 Sesión cerrada');
        res.redirect('/login.html');
    });
});

// Página principal
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`📝 Credenciales de prueba:`);
    console.log(`   Usuario: alumno`);
    console.log(`   Contraseña: santo123\n`);
});
