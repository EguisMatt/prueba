import {ContainerPageLogin, HeaderLogin,TextLogin, UnderlineLogin,InputsLogin,InputContenLogin, Input,SubmitContainer,Submit,ForgotPassword} from "../../styles/LoginStyles/styleLogin";
import { IoIosMail } from "react-icons/io";
import { GiPadlockOpen } from "react-icons/gi";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";




const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');


  const handleLogin = async() => {
    try {
      const apiBaseBack = import.meta.env.VITE_URL_BACKEND;
      const response = await axios.post(`${apiBaseBack}/login`,{
          email:email,
          password:password
      })
      console.log(response.data)
      navigate('/home/*')
    } catch (error) {
      console.error(error)
    }
  }
  


  return (
    <ContainerPageLogin>
        <HeaderLogin>
            <TextLogin>Login</TextLogin>
            <UnderlineLogin></UnderlineLogin>
        </HeaderLogin>
        <InputsLogin>
            <InputContenLogin>
              <IoIosMail className="logo"/>
              <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            </InputContenLogin>

            <InputContenLogin>
              <GiPadlockOpen className="logo"/>
              <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </InputContenLogin>
        </InputsLogin>
        <ForgotPassword>Lost Password ? <span>Click Here!</span></ForgotPassword>
        <SubmitContainer>
            <Submit onClick={()=>{navigate('/register/*')}}>Sign Up</Submit>
            <Submit onClick={handleLogin}>Login</Submit>
        </SubmitContainer>
    </ContainerPageLogin>
  );

};

export default Login;
