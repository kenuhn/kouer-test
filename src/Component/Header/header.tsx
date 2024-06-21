import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";

import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../App";

const HeaderRoot = styled("div")({
  width: "100%",
});

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Title = styled(Typography)({
  flexGrow: 1,
  textAlign: "center",
});

export const Header = () => {
  const auth = useContext(authContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId");
    auth.setIsAuth(false);
    navigate("/authentification");
  };

  return (
    <HeaderRoot>
      <AppBar position="static">
        <Toolbar>
          <MenuButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </MenuButton>
          <Title variant="h6">Kouer Test</Title>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </HeaderRoot>
  );
};
