import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useCartContext } from "../Context/ProductContext";

const CartList: React.FC = () => {
  const { cart } = useCartContext();
  console.log("productContext", cart);

  return (
    <Card sx={{ width: "100vh", minHeight: "300px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Cart Items
        </Typography>
        <ul>
          {cart.length > 0 &&
            cart.map((product, index) => (
              <li key={index}>
                <Typography>{product.name}</Typography>
                <Typography color="text.secondary">
                  {product.description}
                </Typography>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CartList;
