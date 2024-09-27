const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports = ({ usuariosService }) => ({
    login: async (ctx) => {
        const { username, password } = ctx.request.body;

        // Buscar el usuario por su nombre de usuario
        const result = await usuariosService.getUserByUsername(username);

        if (result.rowCount === 0) {
            ctx.status = 401;
            ctx.body = { message: 'Usuario no encontrado' };
            return;
        }

        const user = result.rows[0];

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            ctx.status = 401;
            ctx.body = { message: 'Contraseña incorrecta' };
            return;
        }

        // Generar un token JWT
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        // Responder con el token y los datos del usuario
        ctx.body = {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        };
    },

    register: async (ctx) => {
        const { username, email, password } = ctx.request.body;

        // Crear un nuevo usuario
        const result = await usuariosService.createUser(username, email, password);
        const newUser = result.rows[0];

        // Responder con los datos del usuario recién creado
        ctx.status = 201;
        ctx.body = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        };
    }
});
