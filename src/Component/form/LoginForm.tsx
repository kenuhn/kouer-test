import { FormControl } from "@mui/base/FormControl";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../App";
import { userService } from "../../Repository/user";

const LoginForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const navigate = useNavigate();
  const authState = useContext(authContext);

  const [isConnected, setIsConnected] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleemailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    if (emailRef.current !== null && passwordRef.current !== null) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const user = await userService.login({ email, password });
      if (user === "User not found") {
        return alert("email ou mot de passe incorrect");
      }
      authState.setIsAuth(true);
      /*    console.log(user.access);
      localStorage.setItem("token", JSON.stringify(user.access)); */
      setIsConnected(true);
    }
  };

  useEffect(() => {
    if (isConnected) {
      navigate("/homePage");
    }
  }, [isConnected, navigate]);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{
            width: "600px",
            height: "400px",
            gap: "1px",
            backgroundColor: "white",
            color: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            gutterBottom
            sx={{ fontSize: "40px", fontWeight: "bold" }}
          >
            Sign In
          </Typography>
          <FormControl>
            <TextField
              placeholder="Write your email"
              inputRef={emailRef}
              value={email}
              onChange={handleemailChange}
              margin="normal"
              sx={{
                width: "500px",
              }}
            />
            <TextField
              placeholder="password"
              inputRef={passwordRef}
              value={password}
              onChange={handlePassword}
              margin="normal"
              sx={{
                width: "500px",
              }}
            />

            <Button
              onClick={handleSubmit}
              sx={{
                width: "500px",
              }}
            >
              login
            </Button>
            <Button
              onClick={onSwitch}
              sx={{
                width: "500px",
                height: "50px",
                backgroundColor: "#1976d2",
                color: "white",
              }}
            >
              sign up
            </Button>
          </FormControl>
        </Stack>
      </Box>
    </Container>
  );
};

export default LoginForm;
