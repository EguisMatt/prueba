import {ContainerPageRegister, HeaderLogin,TextLogin, UnderlineLogin,InputsLogin,InputContenLogin, Input,SubmitContainer,Submit,CheckBox,ContentPolicy,BoxIcon} from "../../styles/RegisterStyles/styleRegister";
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
    <ContainerPageRegister>
        <HeaderLogin>
          <BoxIcon>
            <IoMdExit className="exit-logo"/>
          </BoxIcon>
            <TextLogin>Register</TextLogin>
            <UnderlineLogin></UnderlineLogin>
        </HeaderLogin>
        <InputsLogin>


            <InputContenLogin>
              <FaUser className="logo"/>
              <Input 
              type="text" 
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              />
            </InputContenLogin>


            <InputContenLogin >
              <IoIosMail className="logo"/>
              <Input 
              type="email" 
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              />
            </InputContenLogin>


            <InputContenLogin>
              <FaPhoneAlt className="logo"/>
              <Input 
              type="number" 
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
              />
            </InputContenLogin>

            <InputContenLogin>
              <GiPadlockOpen className="logo"/>
              <Input 
              type="password" 
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              />
            </InputContenLogin>


            <InputContenLogin>
              <GiPadlockOpen className="logo"/>
              <Input 
              type="password" 
              placeholder="ConfirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputContenLogin>

        </InputsLogin>
        <ContentPolicy>
          <span>Do You Accept The <a href="http://surl.li/psoqr">Privacy Policy?</a></span>
          <CheckBox type="checkbox"></CheckBox>
        </ContentPolicy>
        <SubmitContainer>
            <Submit onClick={handleFormSubmit}>Sign Up</Submit>
        </SubmitContainer>
    </ContainerPageRegister>
  );
};

export default Register;