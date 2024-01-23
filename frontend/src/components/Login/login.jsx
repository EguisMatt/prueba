import {
  ContainerPageLogin,
  ContenLogin,
  // ContenTittle,
  ContenForm,
  Form,
  ContainInputs,
  TittleInputs,
  ContenInputs,
  InputBox,
  Input,
  CLabel
} from "../../styles/LoginStyles/styleLogin";
const Login = () => {
  return (
    <ContainerPageLogin>
        <ContenLogin>

          <ContenForm>
            <Form>
              <ContainInputs>
                <TittleInputs className="titulo">
                  Bienvenidos de nuevo
                </TittleInputs>
                <ContenInputs>
                  <InputBox>
                    <i className="fa-solid fa-envelope"></i>
                    <Input
                      type="email"
                      required
                    />
                    <CLabel>Nombre</CLabel>
                  </InputBox>
                  <InputBox>
                    <i className="fa-solid fa-envelope"></i>
                    <Input
                      type="email"
                      required
                    />
                    <CLabel>Email</CLabel>
                  </InputBox>
                  <InputBox>
                    <i className="fa-solid fa-lock"></i>
                    <Input
                      type="password"
                      required
                    />
                    <CLabel>Contraseña</CLabel>
                  </InputBox>
                </ContenInputs>
              </ContainInputs>
            </Form>
          </ContenForm>
        </ContenLogin>
      </ContainerPageLogin>
  )
};

export default Login;
