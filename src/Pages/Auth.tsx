import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../App";
import Form from "../Component/Form/AuthForm";

export const Auth = () => {
  const { isAuth } = useContext(authContext);
  const navigate = useNavigate();
  console.log(isAuth);
  useEffect(() => {
    const redirect = () => {
      if (isAuth) {
        navigate("/Homepage");
      }
    };
    redirect();
  }, []);
  return <Form />;
};
