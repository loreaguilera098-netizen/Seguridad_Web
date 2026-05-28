// En un caso real, usar bcrypt. Aquí simulamos por simplicidad.
const users = [
    { username: 'alumno', password: 'santo123', role: 'user' },
    { username: 'admin', password: 'admin123', role: 'admin' }
];

module.exports = { users };