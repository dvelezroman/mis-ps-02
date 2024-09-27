module.exports = ({ db }) => ({
    getAllProductos: () => {
        return db.query('SELECT * FROM productos');
    },

    createProducto: (nombre, precio, stock) => {
        return db.query(
            'INSERT INTO productos (nombre, precio, stock) VALUES ($1, $2, $3) RETURNING *',
            [nombre, precio, stock]
        );
    },

    updateProducto: (id, nombre, precio, stock) => {
        return db.query(
            'UPDATE productos SET nombre = $1, precio = $2, stock = $3 WHERE id = $4 RETURNING *',
            [nombre, precio, stock, id]
        );
    },

    deleteProducto: (id) => {
        return db.query('DELETE FROM productos WHERE id = $1', [id]);
    }
});
