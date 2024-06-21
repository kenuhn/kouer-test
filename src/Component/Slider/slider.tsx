import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useState } from "react";

import db from "../../Mock-db/db.json";
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
  transition: "transform 300ms ease-in-out",
});

const CardWrapper = styled(Card)(({ theme }) => ({
  maxWidth: 345,
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

const ProductSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
    <Root>
      <ButtonLeft
        onClick={handlePrevSlide}
        color="primary"
        disabled={products.length <= 1}
      >
        <ArrowBackIosIcon />
      </ButtonLeft>
      <SliderContainer
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {products.map((product) => (
          <CardWrapper key={product.id}>
            {/*     <CardMedia
              component="img"
              alt={product.name}
              height="140"
              image={product.image}
            /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
          </CardWrapper>
        ))}
      </SliderContainer>
      <ButtonRight
        onClick={handleNextSlide}
        color="primary"
        disabled={products.length <= 1}
      >
        <ArrowForwardIosIcon />
      </ButtonRight>
    </Root>
  );
};

export default ProductSlider;
