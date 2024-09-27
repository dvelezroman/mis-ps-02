require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const koaJwt = require('koa-jwt');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const { scopePerRequest } = require('awilix-koa');
const container = require('./containers');

const app = new Koa();
const router = new Router();

// middlewares
app.use(bodyParser());
app.use(json());

// Middleware de inyección de dependencias por request
app.use(scopePerRequest(container));
// Middleware JWT para proteger rutas (excepto las públicas como login y registro)
app.use(koaJwt({ secret: process.env.SECRET_KEY, key: 'user' }).unless({ path: [/^\/login/, /^\/register/, /^\/test/] }));

// Rutas públicas
router.get('/test', (ctx) => {
    ctx.body = {
        status: true,
        message: 'Bienvenido a la API de gestión de inventario',
    };
});

router.post('/login', async (ctx) => {
    const { authController } = ctx.state.container.cradle;
    await authController.login(ctx);
});

router.post('/register', async (ctx) => {
    const { authController } = ctx.state.container.cradle;
    await authController.register(ctx);
});

// Rutas protegidas (ejemplo de ruta protegida)
router.get('/perfil', async (ctx) => {
    const { user } = ctx.state;
    ctx.body = { message: `Bienvenido ${user.username}`, user };
});

router.get('/productos', async (ctx) => {
    const { productosController } = ctx.state.container.cradle;
    await productosController.getProductos(ctx);
});

router.post('/productos', async (ctx) => {
    const { productosController } = ctx.state.container.cradle;
    await productosController.createProducto(ctx);
});

router.put('/productos/:id', async (ctx) => {
    const { productosController } = ctx.state.container.cradle;
    await productosController.updateProducto(ctx);
});

router.delete('/productos/:id', async (ctx) => {
    const { productosController } = ctx.state.container.cradle;
    await productosController.deleteProducto(ctx);
});

const PORT = process.env.PORT || 3000;
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
