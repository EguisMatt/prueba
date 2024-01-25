import {Wrapper, Form, InputBox, RememberForgot, ButtonSubmit, RegisterLink} from "../../styles/LoginStyles/styleLogin";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    if (email && !password) {
      toast.warning('Por favor llenar el campo de contraseña.');
    } else if (password && !email) {
      alert('Por favor llenar el campo de correo');
    } else if (email && password) {
      e.preventDefault();
      try {
        const apiBaseBack = import.meta.env.VITE_URL_BACKEND;
        const response = await axios.post(`${apiBaseBack}/login`, {
          email: email,
          password: password
        });
        
        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("token", JSON?.stringify(token));
          setTimeout(() => {
            navigate('/home/*');
          }, 300);
        }
      } catch (error) {
        console.error("Error en la solicitud de login:", error);
        if (error.response && error.response.status === 401) {
          alert('Correo y/o contraseña incorrecta. Por favor, inténtelo de nuevo.');
        } else {
          alert('Correo y/o contraseña incorrecta. Por favor, inténtelo de nuevo.');
        }
      }
    } else {
      alert('Por favor, complete los campos requeridos.');
    }
  };
  return (
    <Wrapper>
        <Form action="">
          <h1>Login</h1>
          <InputBox>
              <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
              <IoIosMail className="icon"/>
          </InputBox>

          <InputBox>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
              <FaLock className="icon"/>
          </InputBox>

          <RememberForgot>
            <label><input type="checkbox"/>Remember Me</label>
            <a href=""></a>
          </RememberForgot>

          <ButtonSubmit onClick={handleLogin}>Login</ButtonSubmit>  

          <RegisterLink>
            <p>Don`t have an account <a href="/register/*">register</a></p>
          </RegisterLink>
        </Form>
    </Wrapper>
  );

};

export default Login;