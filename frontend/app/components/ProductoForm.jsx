import axios from 'axios';
import {useEffect, useState} from 'react';

export default function ProductoForm({ producto, onSuccess }) {
    const [nombre, setNombre] = useState(producto ? producto.nombre : '');
    const [precio, setPrecio] = useState(producto ? producto.precio : 0);
    const [stock, setStock] = useState(producto ? producto.stock : 0);

    // Si el producto cambia (es seleccionado para editar), actualiza el formulario
    useEffect(() => {
        if (producto) {
            setNombre(producto.nombre);
            setPrecio(producto.precio);
            setStock(producto.stock);
        }
    }, [producto]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProducto = { nombre, precio, stock };

        try {
            if (producto) {
                // Si hay un producto, actualiza
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/productos/${producto.id}`, newProducto);
            } else {
                // Si no hay producto, crea uno nuevo
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/productos`, newProducto);
            }

            setNombre('');
            setPrecio(0);
            setStock(0);
            onSuccess(); // Llama al callback para actualizar la lista
        } catch (error) {
            console.error('Error al guardar el producto', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="box">
            <h2 className="title is-4">{producto ? 'Editar Producto' : 'Agregar Producto'}</h2>

            <div className="field">
                <label className="label">Nombre</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Nombre del producto"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Precio (€)</label>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        placeholder="Precio del producto"
                        value={precio}
                        onChange={(e) => setPrecio(Number(e.target.value))}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Stock</label>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        placeholder="Cantidad en stock"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                        required
                    />
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button type="submit" className="button is-primary">
                        {producto ? 'Actualizar' : 'Agregar'}
                    </button>
                </div>
                <div className="control">
                    <button
                        type="reset"
                        className="button is-light"
                        onClick={() => {
                            // Limpia el formulario y deselecciona el producto actual
                            setNombre('');
                            setPrecio(0);
                            setStock(0);
                            onSuccess(); // Reinicia la lista de productos
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </form>
    );
}
