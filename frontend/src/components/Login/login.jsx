import {Wrapper, Form, InputBox, RememberForgot, ButtonSubmit, RegisterLink} from "../../styles/LoginStyles/styleLogin";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    if (email && !password) {
      Swal.fire({
        icon: "warning",
        title: "Enter field Password please",
      });
    } else if (password && !email) {
      Swal.fire({
        icon: "warning",
        title: "Enter field Email please",
      });
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
            Swal.fire({
              icon: "success",
              title: "Accescorrect",
              text: "Welcome",
            });
            window.location.reload();
          }, 3000);
        }
      } catch (error) {
        console.error("Error en la solicitud de login:", error);
        if (error.response.status === 404) {
          Swal.fire({
            icon: "error",
            title: "the email does not exist",
            text: "Email not exist ",
          });
        } else if (error.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Password Incorrect",
            text: "Password Incorrect STOP",
          });
        }else if(error){
          console.error(error.response.data)
          Swal.fire({
            icon: "error",
            title: "Password Incorrect",
            text: "Password Incorrect STOP",
          });
        }
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "enter all Fields",
        text: "error Fields",
      });
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