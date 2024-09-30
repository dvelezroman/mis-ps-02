import axios from 'axios';

export default function Productos({ productos }) {
    return (
        <div>
            <h1>Productos</h1>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        {producto.nombre} - {producto.precio} € (Stock: {producto.stock})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps({ req }) {
    const token = req.cookies.token;

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/productos`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            props: { productos: data }, // Pasamos los productos como props a la página
        };
    } catch (error) {
        console.error('Error al obtener los productos en SSR', error);
        return {
            props: { productos: [] },
        };
    }
}

