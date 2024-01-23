import { ContainerMain } from "../styles/styleMain"
import { Route, Routes } from "react-router-dom";
import Login from "./Login/login";
import Register from "./Register/Register";
const MainRoute = () => {

  return (
    <ContainerMain>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register/*" element={<Register/>} />
      </Routes>
    </ContainerMain>
  )
}

export default MainRoute
