import { ContainerMain } from "../styles/styleMain"
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login/login";
import Home from "./page/home";
import Register from "./Register/register";


const MainRoute = () => {
  const token = localStorage.getItem("token");
  const isUserLoggedIn = token;
  return (
    <ContainerMain>
      <Routes>
        <Route path="/" element={<Login />} />
        {isUserLoggedIn ? (
          <Route path="/home/*" element={<Home/>} />
        ) : (
          <Route path="/home/*" element={<Navigate to="/" />} />
        )}
        <Route path="/register/*" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </ContainerMain>
  );
};

export default MainRoute;

