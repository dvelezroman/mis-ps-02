'use client'

import 'bulma/css/bulma.min.css';
import { useState } from 'react';
import ProductoList from "@/app/components/ProductoList";
import ProductoForm from "@/app/components/ProductoForm";

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);

  const handleEdit = (producto) => {
    setSelectedProducto(producto);
  };

  const handleSuccess = () => {
    setRefresh(!refresh); // Forzar la actualización de la lista de productos
    setSelectedProducto(null); // Reiniciar selección
  };

  return (
      <div className="box">
        <h1 className="title is-4">Gestión de Productos</h1>
        <ProductoForm producto={selectedProducto} onSuccess={handleSuccess} />
        <ProductoList onEdit={handleEdit} key={refresh} />
      </div>
  );
}
