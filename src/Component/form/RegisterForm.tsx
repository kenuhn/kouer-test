import {
  Box,
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { userService } from "../../Domain/user/useCases";
import { TnewUser, TuserError } from "../../Entity/user";

const RegisterForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const [formData, setFormData] = useState<TnewUser>({
    name: "",
    email: "",
    password: "",
    products: [],
  });

  const [errors, setErrors] = useState<TuserError>({ message: "" });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (
      passwordRef.current &&
      confirmPasswordRef.current &&
      passwordRef.current.value !== confirmPasswordRef.current.value
    ) {
      setErrors({ ...errors, password: "Passwords do not match" });
      return;
    }

    setFormData({
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      products: [],
    });
  };

  const manageRegister = async () => {
    try {
      const response = await userService.register(formData);

      if (typeof response === "string") {
        setErrors({ ...errors, general: response });
      } else if ("message" in response && response.message === "error") {
        setErrors(response);
      } else {
        alert("Registration successful");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ ...errors, general: "Failed to register user" });
    }
  };

  useEffect(() => {
    const register = async () => {
      console.log("hellp");
      return manageRegister();
    };
    register();
  }, [formData]);

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
            height: "450px",
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
            Sign Up
          </Typography>
          <FormControl>
            <TextField
              placeholder="Write your name"
              inputRef={nameRef}
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                width: "500px",
                margin: "10px 0px",
              }}
            />
            <TextField
              placeholder="Write your email"
              inputRef={emailRef}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                width: "500px",
                margin: "10px 0px",
              }}
            />
            <TextField
              placeholder="Password"
              type="password"
              inputRef={passwordRef}
              error={!!errors.password}
              helperText={errors.password}
              sx={{
                width: "500px",
                margin: "10px 0px",
              }}
            />
            <TextField
              placeholder="Confirm Password"
              type="password"
              inputRef={confirmPasswordRef}
              error={!!errors.password}
              helperText={errors.password}
              sx={{
                width: "500px",
                margin: "10px 0px",
              }}
            />

            {errors.general && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {errors.general}
              </Typography>
            )}

            <Button
              onClick={handleSubmit}
              sx={{
                width: "500px",
                height: "50px",
                backgroundColor: "#1976d2",
                color: "white",
              }}
            >
              Sign Up
            </Button>
            <Button
              onClick={onSwitch}
              sx={{
                width: "500px",
                marginTop: "10px",
              }}
            >
              Sign In
            </Button>
          </FormControl>
        </Stack>
      </Box>
    </Container>
  );
};

export default RegisterForm;
