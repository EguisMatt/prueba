import { ContainerHome } from "../../styles/HomeStyles/StylesHome";

// Define el componente Home
function Home() {
  // Datos de ejemplo para la tabla
  const data = [
    { nombre: 'Usuario1', correo: 'usuario1@example.com', contraseña: '*********' },
    { nombre: 'Usuario2', correo: 'usuario2@example.com', contraseña: '*********' },
    { nombre: 'Usuario3', correo: 'usuario3@example.com', contraseña: '*********' },
    // Agrega más filas según sea necesario
  ];

  return (
    <ContainerHome>
      <h2>Tabla de Usuarios</h2>
      {/* Tabla con campos de nombre, correo y contraseña */}
      <table border="1" className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Contraseña</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapea los datos para generar las filas de la tabla */}
          {data.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.contraseña}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ContainerHome>
  );
}

// Exporta el componente Home
export default Home;