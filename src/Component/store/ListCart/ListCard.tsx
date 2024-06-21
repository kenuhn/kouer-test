import { Card, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useCartContext } from "../Context/ProductContext";

const CartList: React.FC = () => {
  const { cart } = useCartContext();
  console.log("productContext", cart);

  return (
    <Card sx={{ width: "100%", minHeight: "300px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Mon panier
        </Typography>
        <ul>
          {cart.length > 0 &&
            cart.map((product, index) => (
              <Box
                key={index}
                sx={{
                  boxShadow: 1,
                  borderRadius: 4,
                  marginBottom: 2,
                  padding: 2,
                }}
              >
                <Typography>{product.name}</Typography>
                <Typography color="text.secondary">
                  {product.description}
                </Typography>
              </Box>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CartList;
