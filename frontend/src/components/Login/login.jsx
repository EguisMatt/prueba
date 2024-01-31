import {Wrapper, Form, InputBox, ButtonSubmit, RegisterLink} from "../../styles/LoginStyles/styleLogin";
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
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError('')
    setPassError('')

    if (email && !password) {
      Swal.fire({
        icon: "warning",
        title: "Enter field Password please",
      });
      setPassError('please enter your  password')
    } else if (password && !email) {
      Swal.fire({
        icon: "warning",
        title: "Enter field Email please",
      });
      setEmailError('please enter your email address')
    } else if (email && password) {
      try {
        const apiBaseBack = import.meta.env.VITE_URL_BACKEND;
        const response = await axios.post(`${apiBaseBack}/login`, {
          email: email,
          password: password
        });
        
        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("token", JSON?.stringify(token));
          setTimeout(async ()  => {
            Swal.fire({
              icon: "success",
              title: "Accescorrect",
              text: "Welcome",
            });
          });
          navigate('/home/*');
        }
      } catch (error) {
        console.error("Error en la solicitud de login:", error);
        if (error.response.status === 404) {
          Swal.fire({
            icon: "error",
            title: "the email does not exist",
            text: "Email not exist ",
          });
          setEmailError('This email does not exist')
        } else if (error.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Password Incorrect",
            text: "Password Incorrect STOP",
          });
        }
        setPassError('Password Incorrect')
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
              <input type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value); setEmailError('');}}/>
              <label style={{color: 'red'}}>{emailError}</label>
              <IoIosMail className="icon"/>
          </InputBox>

          <InputBox>
              <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value); setPassError('');}}/>
              <label style={{color: 'red'}}>{passError}</label>
              <FaLock className="icon"/>
          </InputBox>

          <ButtonSubmit onClick={handleLogin}>Login</ButtonSubmit>  

          <RegisterLink>
            <p>Don`t have an account <a href="/register/*">register</a></p>
          </RegisterLink>
        </Form>
    </Wrapper>
  );

};

export default Login;