# Gestión de Productos

Este proyecto es una aplicación web para la gestión de productos en una tienda, construida con **Next.js** como frontend y **Bulma** para los estilos. La aplicación permite realizar un CRUD (Crear, Leer, Actualizar y Eliminar) de productos a través de una API REST.

## Características

- Ver la lista de productos.
- Crear nuevos productos.
- Editar productos existentes.
- Eliminar productos.

## Tecnologías utilizadas

- **Next.js**: Framework de React para renderizado del lado del cliente.
- **Bulma**: Framework CSS para el diseño y estilo.
- **Axios**: Cliente HTTP para realizar solicitudes a la API.
- **Node.js**: Entorno de ejecución de JavaScript en el servidor.

## Requisitos previos

Asegúrate de tener instalados los siguientes requisitos en tu máquina:

- [Node.js](https://nodejs.org/) (versión 14.x o superior)
- [npm](https://www.npmjs.com/) (normalmente viene con Node.js)


Configurar las variables de entorno
Crea un archivo .env.local en la raíz del proyecto frontend y define la URL de la API (que será configurada más adelante en el backend):

```bash
NEXT_PUBLIC_API_URL=http://localhost:3200
```

Ejecutar la aplicación en modo desarrollo
Utiliza el siguiente comando para ejecutar el servidor de desarrollo de Next.js:

```bash
npm run dev
```

Iniciar la API
Este proyecto asume que tienes una API REST en ejecución en http://localhost:3200 que gestiona los productos (CRUD). A continuación te explico cómo configurar y ejecutar la API:
lee las instrucciones para la API, en la carpeta mis-ps-02/api