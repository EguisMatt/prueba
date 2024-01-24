import styled from "styled-components";

export const ContainerPageLogin = styled.div`
border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 200px;
  width: 600px;
  background: #ffff;
  padding-bottom: 30px;
`;
export const HeaderLogin = styled.div`
/* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  width: 100%;
  margin-top: 20px;
`;
export const TextLogin = styled.div`
/* border: 1px solid red; */
  color: #3c0093;
  font-size: 48px;
  font-weight: 700;
`;
export const UnderlineLogin = styled.div`
  width: 61px;
  height: 6px;
  background: #3c0093;
  border-radius: 9px;

`;
export const InputsLogin = styled.form`
/* border: 1px solid blue; */
  margin-top: 55px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
export const InputContenLogin = styled.div`
/* border: 1px solid pink; */
  display: flex;
  align-items: center;
  margin: auto;
  width: 480px;
  height: 80px;
  background: #eaeaea;
  border-radius: 6px;
  `;
export const Input = styled.input`
  height: 50px;
  width: 400px;
  background: transparent;
  border: none;
  outline: none;
  color: #797979;
  font-size: 19px;

`;
export const ForgotPassword = styled.div`
/* border: 1px solid violet; */
  padding-left: 62px;
  margin-top: 27px;
  color: #797979;
  font-size: 18px;

  span{
    color: #4c00b4;
    cursor: pointer;
  }

  a{
    color: #044bfc;
    cursor: pointer;
  }
`;
export const SubmitContainer = styled.div`
/* border: 1px solid magenta; */
  display: flex;
  gap: 30px;
  margin: 60px auto;
`;

export const Submit = styled.button`
/* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 59px;
  color: #fff;
  background: #4c00b4;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;

`;