import styled from "styled-components";

export const Wrapper = styled.div`
  width: 420px;
  background-color: transparent;
  border: 2px solid rgba(255,255,255,.2);
  backdrop-filter: blur(30px);
  box-shadow: 0 0 10px rgba(0,0,0, .2);
  color: #fff;
  border-radius: 10px;
  padding: 30px 40px;
  h1{
    font-size: 36px;
    text-align: center;
  }
`;

export const InputBox = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  margin: 30px 0;

  input{
    width: 100%;
    height: 100%;
    background: transparent;
    border: 2px solid rgba(255,255,255, .2);
    outline: none;
    border-radius: 40px;
    font-size: 16px;
    color: #fff;
    padding: 20px 45px 20px 20px;

    input::placeholder{
      color: #fff;
    }
  }
`;


export const Form = styled.form`

`;

export const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14.5px;
  margin: -15px 0 15px;

  label input{
    accent-color: #fff;
    margin-right: 4px;
  }

  a{
    color: #fff;
    text-decoration: none
  }

  a &:hover{
    text-decoration: underline
  }
`;

export const ButtonSubmit = styled.button`
    width: 100%;
    height: 45px;
    background: #fff;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0,0,0, .1);
    cursor: pointer;
    font-size: 16px;
    color: #333;
    font-weight: 700px;
`;

export const RegisterLink = styled.div`
  font-size: 14.5px;
  text-align: center;
  margin: 20px 0 15;

  p a{
    color: #fff;
    text-decoration: none;
    font-weight: 600;

    &:hover{
      text-decoration: underline;
    }
  }


`;

