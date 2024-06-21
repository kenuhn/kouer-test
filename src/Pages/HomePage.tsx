import { Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { CartProvider } from "../Component/store/Context/ProductContext";
import ListCard from "../Component/store/ListCart/ListCard";
import { Slider } from "../Component/store/StoreSlider/slider";

const CenteredContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
});

export const HomePage = (): JSX.Element => {
  return (
    <CartProvider>
      <CenteredContainer maxWidth="md">
        <Typography variant="h3" gutterBottom>
          Welcome
        </Typography>
        <Stack spacing={3} alignItems="center">
          <Slider />
          <ListCard />
        </Stack>
      </CenteredContainer>
    </CartProvider>
  );
};
