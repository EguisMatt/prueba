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
  const [isChecked, setIsChecked] = useState(false);
  const [labelColor, setLabelColor] = useState('black');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');




  const handleCheckBox = (e) =>{
    setIsChecked(!isChecked)
    setLabelColor('black');
    e.preventDefault();
  }
  


  
  const notCaracterOrNumbers = (e) => {
    const regex = /[0-9´*`!#$%&,.-_-'¿´´/()=°|{}?¡<>"@+]+$/;
    if (regex.test(e.key)) {
      e.preventDefault();
    }
  }


  const isValidEmailFormat = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');


    try {

      if(!name){
        setNameError('Please enter your name');
      }
      if (!email || !isValidEmailFormat(email)) {
        setEmailError('Invalid email format');
      }
      if (!phone) {
        setPhoneError('Please enter your phone number');
      }else if(phone.length < 10){
          Swal.fire({
            icon: 'error',
            title: 'the number is short',
          });
          setPhoneError("number very short")
      }
      if (!password) {
        setPasswordError('Please enter a password');
      }
      if (!confirmPassword) {
        setConfirmPasswordError('Please confirm your password');
      }
      

      if(!isChecked){
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
      }
    } catch (error) {
      if (error.response.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "The Email Already Exists.",
        });
        setEmailError('Email already exists')
        console.error(error);
      } else if (error.response.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Passwords do not match",
        });
        setConfirmPasswordError('please enter the same password')
        console.error(error);
      } else if (error.response.status === 404 ) {
        console.error(error.response.data);
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: "Missing Fields or incorrect field"
        });

      }else if (error.response.status === 400) {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'the field canot content space empty'
        });
      }else if (!isValidEmailFormat(email)){
        Swal.fire({
          icon: 'error',
          title: 'Invalid email format!',
        });
        console.error(error)
      }
    }
  };

  const LongitudePhone = (e) => {
    setPhoneError('');
    const maxLength = 10;
    const min = 10;
    let inputValue = e.target.value.replace(/[^0-9]/g, '');
    // Limitar la longitud del número
    if (inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }else if(inputValue.length < min){
      setPhoneError("Please write at least 10 digits");
    }
    // Actualizar el estado o realizar otras acciones
    setPhone(inputValue);
  };



  return (
    <WrapperRegister>
      <Form action="">
        <TittleRegister>Register</TittleRegister>
        <InputBoxRegister>
          <input
            type="text"
            placeholder="Name"
            onKeyDown={notCaracterOrNumbers}
            onChange={(e) => {
              setName(e.target.value);
              setNameError('');
            }}
          />
          <label style={{color: 'red'}}>{nameError}</label>
          <MdDriveFileRenameOutline className="logo-register" />
        </InputBoxRegister>
        <InputBoxRegister>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>{
              setEmail(e.target.value);
              setEmailError('');
            }}
          />
          <label style={{color: 'red'}}>{emailError}</label>
          <MdEmail className="logo-register"/>
        </InputBoxRegister>
        <InputBoxRegister>
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={LongitudePhone}
          />
          <label style={{color: 'red'}}>{phoneError}</label>
          <FaPhone className="logo-register" />
        </InputBoxRegister>
        <InputBoxRegister>
          <input
            type="password"
            placeholder="Password"
            maxLength={15}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
          />
          <label style={{color: 'red'}}>{passwordError}</label>
          <FaLock className="logo-register" />
        </InputBoxRegister>
        <InputBoxRegister>
          <input
            type="password"
            placeholder="confirmPassword"
            onChange={(e) =>{
              setConfirmPassword(e.target.value);
              setConfirmPasswordError('');
            }}
            maxLength={15}
          />
          <label style={{color: 'red',  position:'relative', margin: '30'}}>{confirmPasswordError}</label>
          <FaLock className="logo-register"/>
        </InputBoxRegister>

        <AcceptPolyce>
          <label style={{ color: labelColor,  fontSize:"14px", cursor:'pointer',  userSelect:'none',  display:'flex', alignItems:'center'}} >
            <input type="checkbox" checked={isChecked} onChange={handleCheckBox} onClickCapture={handleCheckBox} required />
            Accept The <a href="https://policies.google.com/privacy?hl=es">Polyce Privacite</a>
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
