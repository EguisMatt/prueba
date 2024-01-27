import { ContainerMain } from "../styles/styleMain"
import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense} from "react";
import Login from "./Login/login";
import Home from "./page/home";
import NotFound from "./NotFound/NotFound";
import Register from "./Register/register";


const MainRoute = () => {
  const token = localStorage.getItem("token");
  const isUserLoggedIn = !!token;


  return (
    <ContainerMain>
      <Routes>
        <Route path="/" element={<Login />} />
          {isUserLoggedIn ? (
          <Route 
            path='/home/*'
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <Home/>  
              </Suspense>
            } 
          />
        ) : (
          <Route path="/home/" element={<Navigate to="/" />} />
        )}
        <Route path="/register/*" element={<Register />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </ContainerMain>
  );
}; 

export default MainRoute
