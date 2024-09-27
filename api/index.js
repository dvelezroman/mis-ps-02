require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body');
const json = require('koa-json');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(json());

const PORT = process.env.PORT || 3000;

// Ruta principal
router.get('/', (ctx) => {
    ctx.body = 'Bienvenido a la API de gestión de inventario';
});

// Uso de las rutas
app.use(router.routes()).use(router.allowedMethods());

// Servidor en escucha
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
