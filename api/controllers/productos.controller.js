module.exports = ({ productosService }) => ({
    getProductos: async (ctx) => {
        try {
            const productos = await productosService.getAllProductos();
            ctx.body = productos.rows;
        } catch (err) {
            ctx.status = 500;
            ctx.body = { error: 'Error al obtener productos' };
        }
    },

    createProducto: async (ctx) => {
        const { nombre, precio, stock } = ctx.request.body;
        try {
            const nuevoProducto = await productosService.createProducto(nombre, precio, stock);
            ctx.status = 201;
            ctx.body = nuevoProducto.rows[0];
        } catch (err) {
            ctx.status = 500;
            ctx.body = { error: 'Error al crear producto' };
        }
    },

    updateProducto: async (ctx) => {
        const id = ctx.params.id;
        const { nombre, precio, stock } = ctx.request.body;
        try {
            const productoActualizado = await productosService.updateProducto(id, nombre, precio, stock);
            ctx.body = productoActualizado.rows[0];
        } catch (err) {
            ctx.status = 500;
            ctx.body = { error: 'Error al actualizar producto' };
        }
    },

    deleteProducto: async (ctx) => {
        const id = ctx.params.id;
        try {
            await productosService.deleteProducto(id);
            ctx.status = 204; // No Content
        } catch (err) {
            ctx.status = 500;
            ctx.body = { error: 'Error al eliminar producto' };
        }
    }
});
