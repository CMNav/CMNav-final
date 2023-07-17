import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ItemStep = ({ items, onRemove }) => {
  console.log(items); // Add this line
  
  const handleRemoveItem = (itemId) => {
    console.log("Removing item with ID:", itemId);
    onRemove(itemId);
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{ width: "80%" }}>
        {items.map((item) => (
          <Card
            key={item.id}
            sx={{
              display: "flex",
              marginBottom: "20px",
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 200, height: 200, objectFit: "cover" }}
              image={item.image}
              alt={item.name}
            />
            <CardContent sx={{ paddingRight: "40px" }}>
              <Typography variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
            <IconButton
              aria-label="Remove"
              onClick={() => onRemove(item.id)}
              sx={{
                position: "absolute",
                top: "5px",
                right: "5px",
                color: "gray",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ItemStep;
