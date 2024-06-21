import { Box } from "@mui/material";
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
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 1,
          maxWidth: 400, // Ajustez la largeur maximale selon vos besoins
          width: "100%",
          boxShadow: 1, // Ajoute une légère ombre
        }}
      >
        <Form />
      </Box>
    </Box>
  );
};
