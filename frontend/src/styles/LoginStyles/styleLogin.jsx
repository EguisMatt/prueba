import styled from "styled-components";

export const ContainerPageLogin = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #ffffff;
`;

export const ContenLogin = styled.div`
  background-color: #00ffff;
  width: 100%;
  height: 90%;
`;

export const ContenForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff700;
  width: 100%;
  height: 80%;
`;

export const Form = styled.div`
  /* position: relative; */
  background-color: #005eff;
  width: 470px;
  height: 96%;
  box-shadow: 0 0 10px rgb(0, 0, 0);
`;

export const ContainInputs = styled.div`
  /* background-color: blueviolet; */
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
`;

export const TittleInputs = styled.div`
  /* background-color: aliceblue; */
  width: 100%;
  height: 10%;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: 400;
`;

export const ContenInputs = styled.div`
  /* background-color: blanchedalmond; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const Label = styled.label`
  /* position: absolute; */
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  color: white;
  font-size: 1em;
  pointer-events: none;
  transition: 0.5s;
`;

export const InputBox = styled.div`
  width: 90%;
  position: relative;
  border-bottom: 2px solid white;
  input:focus ~ label,
  input:valid ~ label {
    top: -5px;
  }
  .fa-solid {
    position: absolute;
    right: 8px;
    color: white;
    font-size: 1.2em;
    top: 20px;
  }
`;

export const CLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  color: white;
  font-size: 1em;
  pointer-events: none;
  transition: 0.5s;
`;

export const Input = styled.input`
  width: 90%;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1em;
  padding: 0 35px 0 5px;
  color: white;
  &.soporte {
    margin-top: 10px;
    width: 100%;
    border: none;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #000;
    font-size: 16px;
    font-family: "Outfit";
  }
`;
