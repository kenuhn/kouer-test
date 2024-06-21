import { Card, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useCartContext } from "../Context/ProductContext";

const CartList: React.FC = () => {
  const { cart } = useCartContext();
  console.log("productContext", cart);

  return (
    <Card
      sx={{ width: "100%", minHeight: "300px", backgroundColor: "#f9f9f9" }}
    >
      <CardContent>
        <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
          Mon panier
        </Typography>
        <ul style={{ padding: 0 }}>
          {cart.length > 0 &&
            cart.map((product, index) => (
              <Box
                key={index}
                sx={{
                  boxShadow: 3, // Niveau d'ombre plus prononcé
                  borderRadius: 2, // Bordures arrondies
                  marginBottom: 2, // Marge inférieure entre les éléments de la liste
                  padding: 2, // Espacement intérieur
                  backgroundColor: "#fff",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 6,
                  },
                }}
              >
                <Typography sx={{ fontWeight: "bold", color: "#333" }}>
                  {product.name}
                </Typography>
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
