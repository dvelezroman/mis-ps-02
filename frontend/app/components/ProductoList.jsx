'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProductoList({ onEdit }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);

    // Función para obtener productos
    const fetchProductos = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/productos`);
            setProductos(response.data);
        } catch (err) {
            setError('Error al cargar los productos');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/productos/${id}`);
            fetchProductos(); // Recargar la lista después de eliminar
        } catch (error) {
            setError('Error al eliminar el producto');
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <div>
            <h2 className="title is-4">Lista de Productos</h2>
            {error && <p>{error}</p>}
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id} className="media">
                        <div className="media-content">
                            {producto.nombre} - {producto.precio} € (Stock: {producto.stock})
                        </div>
                        <div className="media-right">
                            <button
                                className="button is-primary"
                                onClick={() => onEdit(producto)} // Pasa el producto seleccionado al formulario
                            >
                                Editar
                            </button>
                            <button
                                className="button is-danger"
                                onClick={() => handleDelete(producto.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
