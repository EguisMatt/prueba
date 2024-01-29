import {
  WrapperRegister,
  TittleRegister,
  InputBoxRegister,
  AcceptPolyce,
  ButttonRegister,
  LoginLink,
} from "../../styles/RegisterStyles/styleRegister";
import axios from 'axios';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "../../styles/LoginStyles/styleLogin";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [labelColor, setLabelColor] = useState('black');

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setEmailError(!isValidEmailFormat(inputEmail));
  };

  const handleCheckBox = (e) =>{
    setIsChecked(!isChecked)
    setLabelColor('black');
    e.preventDefault();
  }
  

  const labelStyle = {
    color: isChecked ? 'black' : 'red', // Cambia el color a negro si está marcado, a rojo si no
  };

  const notCaracterOrNumbers = (event) => {
    const regex = /[0-9´*`!#$%&,.-_-/()=°|{}?¡<>"@+]+$/;
    if (regex.test(event.key)) {
      event.preventDefault();
    }
  }


  const isValidEmailFormat = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Resto del código de manejo del formulario

    try {
      if(isChecked === false){
        setLabelColor('red'); 
        Swal.fire({
          icon: "warning",
          title: 'do not accept the terms' 
        })
      return
      }
      const apiBaseBack = import.meta.env.VITE_URL_BACKEND;
      const response = await axios.post(`${apiBaseBack}/register`, {
        name: name,
        email: email,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword,
      });


      if (!isValidEmailFormat(email)) {
        setEmailError(true);
        Swal.fire({
          icon: 'error',
          title: 'Invalid email format',
        });
        return;
      }
      if (response.status === 200) {
        setTimeout(() => {
          navigate('/');
          Swal.fire({
            icon: 'success',
            title: 'Registered',
          });
          console.log(response.data);
        },);
      } else if (response.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Email has been registered",
        });
      } else if (response.status === 401) {
        Swal.fire({
          icon: 'warning',
          title: 'Passwords do not match',
        });
      }
    } catch (error) {
      if (error.response.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "The Email Already Exists.",
        });
        console.error(error);
      } else if (error.response.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Passwords do not match",
        });
        console.error(error);
      } else if (error) {
        console.error(error.response.data);
        Swal.fire({
          icon: 'error',
          title: 'Missing fields',
          text: "Missing Fields or incorrect field"
        });
      }else if (!isValidEmailFormat(email)){
          setEmailError(true);
          Swal.fire({
            icon: 'error',
            title: 'Caracter invalido'
          });
          console.error(error)
      }else if (error.response.status === 400) {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'the field canot content space'
        });
      }
    }
  };


  return (
    <WrapperRegister>
      <Form action="">
        <TittleRegister>Register</TittleRegister>
        <InputBoxRegister>
          <input
            type="text"
            placeholder="Name"
            maxLength={255}
            onKeyDown={notCaracterOrNumbers}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <MdDriveFileRenameOutline className="logo-register" />
        </InputBoxRegister>
        <InputBoxRegister>
          <input
            type="email"
            placeholder="Email"
            onChange={handleEmailChange}
            value={email}
            required
            className={emailError ? 'error' : ''}
          />
          <MdEmail id="3" className={`logo-register ${emailError ? 'error' : ''}` } />
        </InputBoxRegister>
        <InputBoxRegister>
          <input
            type="number"
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <FaPhone className="logo-register" />
        </InputBoxRegister>
        <InputBoxRegister>
          <input
            type="password"
            placeholder="Password"
            maxLength={15}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="logo-register" />
        </InputBoxRegister>
        <InputBoxRegister>
          <input
            type="password"
            placeholder="ConfirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            maxLength={15}
            required
          />
          <FaLock className="logo-register" />
        </InputBoxRegister>

        <AcceptPolyce>
          <label style={{ color: labelColor }}>
            <input type="checkbox" checked={isChecked} onClickCapture={handleCheckBox} required />
            Accept The <a href="https://policies.google.com/privacy?hl=es">Polyce Privacite </a>{" "}
          </label>
        </AcceptPolyce>

        <ButttonRegister onClick={handleFormSubmit}>Register</ButttonRegister>

        <LoginLink>
          <p>
            You Have a Account <a href="/">Login</a>
          </p>
        </LoginLink>
      </Form>
    </WrapperRegister>
  );
};

export default Register;
