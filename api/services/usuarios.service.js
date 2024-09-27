const bcrypt = require("bcryptjs");

module.exports = ({ db }) => ({
    // Buscar usuario por nombre de usuario
    getUserByUsername: (username) => {
        return db.query('SELECT * FROM usuarios WHERE username = $1', [username]);
    },

    // Crear un nuevo usuario (con contraseña encriptada)
    createUser: (username, email, password, role = 'user') => {
        const hashedPassword = bcrypt.hashSync(password, 8);
        return db.query(
            'INSERT INTO usuarios (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, hashedPassword, role]
        );
    }
});
