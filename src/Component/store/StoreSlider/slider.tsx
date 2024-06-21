import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { useCartContext } from "../Context/ProductContext";

import { TexistingProduct } from "../../../Entity/product";
import db from "../../../Mock-db/db.json";
const products = db.product;

const Root = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  overflow: "hidden",
  position: "relative",
  marginTop: "16px",
});

const SliderContainer = styled("div")({
  display: "flex",
  width: "100%",
  overflowX: "auto",
  scrollSnapType: "x mandatory",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const CardWrapper = styled(Card)(({ theme }) => ({
  flex: "0 0 auto",
  width: "50%",
  scrollSnapAlign: "start",
  margin: theme.spacing(0, 1),
}));

const ButtonLeft = styled(Button)(({ theme }) => ({
  position: "absolute",
  left: theme.spacing(1),
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 1,
}));

const ButtonRight = styled(Button)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 1,
}));

export const Slider = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNextSlide = () => {
    if (startIndex + 2 < products.length) {
      setStartIndex((prevIndex) => prevIndex + 2);
    }
  };

  const handlePrevSlide = () => {
    if (startIndex - 2 >= 0) {
      setStartIndex((prevIndex) => prevIndex - 2);
    }
  };

  const { addToCart } = useCartContext();

  const handleAddToCart = (product: TexistingProduct) => {
    const id = localStorage.getItem("userId");
    const idNumber = Number(id);
    if (idNumber) {
      addToCart(product);
    }
  };
  return (
    <Root sx={{ width: "100vh" }}>
      <ButtonLeft
        onClick={handlePrevSlide}
        color="primary"
        disabled={startIndex === 0}
      >
        <ArrowBackIosIcon />
      </ButtonLeft>
      <SliderContainer>
        {products.slice(startIndex, startIndex + 2).map((product) => (
          <CardWrapper key={product.id}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Button
                size="small"
                onClick={() => {
                  handleAddToCart(product);
                }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </CardWrapper>
        ))}
      </SliderContainer>
      <ButtonRight
        onClick={handleNextSlide}
        color="primary"
        disabled={startIndex + 2 >= products.length}
      >
        <ArrowForwardIosIcon />
      </ButtonRight>
    </Root>
  );
};
