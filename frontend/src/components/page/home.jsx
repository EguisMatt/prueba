import { useState , useEffect} from "react";
import { IoMdExit } from "react-icons/io";
import { ContainerHome, Table, Tbody,Td, Th,Thead,Tr, TitleHome, Text,ContenExit } from "../../styles/HomeStyles/StylesHome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Define el componente Home
function Home() {
  const [users, setUsers] = useState([])
  // Datos de ejemplo para la tabla
  const apiBaseBack = import.meta.env.VITE_URL_BACKEND
  const navigate = useNavigate();

  const getUsers = async () => {
    try{
      const res = await axios.get(`${apiBaseBack}/getUsers`);
      setUsers(res.data);
    }catch(error){
      console.log("Error al obtener los usuarios: ", error)
    }
  }

  const logOut = () => { 
    localStorage.removeItem("token"); 
    window.location.reload();
    navigate("/")
  }

  useEffect(() => {
    getUsers();
  });

  return (
    <ContainerHome>
    <TitleHome>
      <ContenExit onClick={logOut}>
        <IoMdExit  style={{fontSize: '20px'}} className="exit" /> exit
      </ContenExit>
      <Text>
        Tabla de usuarios
      </Text>
    </TitleHome>
      <Table>
        <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Nombre</Th>
          <Th>Email</Th>
          <Th>Phone</Th>
        </Tr>
        </Thead>
        <Tbody>
          {users.map((item, index) => (
            <Tr key={index}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
              <Td>{item.phone}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </ContainerHome>
  );
}

// Exporta el componente Home
export default Home;