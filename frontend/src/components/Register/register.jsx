import {} from "../../styles/RegisterStyles/styleRegister";
import axios from 'axios';
import { IoIosMail } from "react-icons/io";
import { GiPadlockOpen } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleFormSubmit = async () =>{
    try {
      const apiBaseBack = import.meta.env.VITE_URL_BACKEND;
      const response = await axios.post(`${apiBaseBack}/register`,{
        name: name,
        email: email,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword
      })
      console.log(response.data)
      navigate('/')
      
    } catch (error) {
      alert('Enter all fields')
      console.error(error)
  }
};



  return (
    <div>HOLA REGISTER</div>
  );
};

export default Register;