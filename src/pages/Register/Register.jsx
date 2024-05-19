import { useNavigate } from "react-router-dom";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import { useState } from "react";
import { registerNewUserCall } from "../../services/apiCalls";
import { inputValidator } from "../../utils/validators";
import { InputC } from "../../components/InputC/InputC";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    firstName: "",
    password: "",
  });
  const [isValidContent, setIsValidContent] = useState({
    email: "",
    password: "",
  });
  const inputValidatorHandler = (e) => {
    const errorMessage = inputValidator(e.target.value, e.target.firstName);
    setIsValidContent((prevState) => ({
      ...prevState,
      [e.target.name]: errorMessage,
    }));
  };

  const [msg, setMsg] = useState("");

  const inputHandler = (e) => {
    //genero la función que bindea

    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerMe = async () => {
    if (
      inputValidator(credentials.firstName, "name") &&
      inputValidator(credentials.password, "password")
    ) {
      const answer = await registerNewUserCall(credentials);
      console.log(answer);
      setMsg(answer.data.message);

      if (answer.data.email) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } else {
      console.log(
        "credenciales incorrectas, algún campo no está bien introducido"
      );
    }
  };

  return (
    <div className="register-desing">
      <div className="register-container registerElementsDesign">
        {msg === "" ? (
          <>
            <h1>CREATE YOUR ACCOUNT</h1>
            <InputC
              typeProp={"text"}
              nameProp={"name"}
              handlerProp={(e) => inputHandler(e)}
              placeholderProp={"escribe tu nombre"}
              onBlurHandler={(e) => inputValidatorHandler(e)}
              errorText={isValidContent.firstName}
            />
            <InputC
              typeProp={"email"}
              nameProp={"email"}
              handlerProp={(e) => inputHandler(e)}
              placeholderProp={"escribe tu e-mail"}
              onBlurHandler={(e) => inputValidatorHandler(e)}
              errorText={isValidContent.email}
            />

            <InputC
              typeProp={"password"}
              nameProp={"password"}
              handlerProp={(e) => inputHandler(e)}
              placeholderProp={"escribe el password"}
              onBlurHandler={(e) => inputValidatorHandler(e)}
              errorText={isValidContent.password}
            />

            <ButtonC
              title={"register!"}
              className={"regularButtonClass"}
              functionEmit={registerMe}
            />
          </>
        ) : (
          <div>{msg}</div>
        )}
      </div>
    </div>
  );
};
