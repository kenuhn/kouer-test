import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../App";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
const Form = () => {
  const [isRegister, setIsRegister] = useState(false);
  const { isAuth } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = () => {
      if (isAuth) {
        navigate("/Homepage");
      }
    };
    redirect();
  }, [isAuth, navigate]);

  const handleRegister = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div
      style={{
        width: "100vh",
        display: "flex",
        justifyContent: "center",
        color: "white",
      }}
    >
      {isRegister ? (
        <RegisterForm onSwitch={handleRegister} />
      ) : (
        <LoginForm onSwitch={handleRegister} />
      )}
    </div>
  );
};

export default Form;
