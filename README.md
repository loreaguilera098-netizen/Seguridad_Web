# Proyecto Seguridad - Node.js + Express

## Objetivo
Implementar autenticación básica con sesión y control de acceso a rutas protegidas.

## Pasos
1. Instalar dependencias: `npm install express express-session`
2. Ejecutar: `node app.js`
3. Acceder a `http://localhost:3000/login`

## Evidencias
- Login correcto → acceso a `/dashboard`
- Login incorrecto → mensaje de error
- Logout → destruye sesión
- Consola muestra flujo de autenticación

## Seguridad
- Cookies con `HttpOnly` y `SameSite` para evitar XSS y CSRF.
- HTTPS protege credenciales y cookies (atributo `Secure` activo en producción).

[https://github.com/loreaguilera098-netizen/Seguridad_Web]
