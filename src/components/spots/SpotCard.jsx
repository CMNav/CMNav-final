import React from "react";
import { CardActions, Button, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const SpotCard = ({
  id,
  name,
  image,
  type,
  smallDescription,
  description,
  rating,
  lat,
  lng,
  onClick,
  onAddToList,
  handleOpenSnackbar,
}) => {
  const handleAddToList = (event) => {
    event.stopPropagation();
    const spot = {
      id,
      name,
      image,
      type,
      smallDescription,
      description,
      rating,
      lat,
      lng,
    };

    onAddToList(spot);
    handleOpenSnackbar();
  };

  return (
    <div
      className="spot-card"
      data-category={type}
      data-subcategory={type === "Restaurants" ? "Restaurants" : "Spots"}
      onClick={onClick}
    >
      <div className="spot-card-img">
        <img src={image} alt={name} />
      </div>
      <div className="spot-card-info">
        <h2 className="spot-card-title">{name}</h2>
        <p className="spot-card-desc">{description}</p>
        <div className="spot-card-rating">
          <Typography variant="body2" color="textSecondary" component="span">
            Rating:
          </Typography>
          <Box component="span" sx={{ marginLeft: "4px" }}>
            <Rating value={rating} precision={0.5} readOnly />
          </Box>
        </div>
      </div>
      <CardActions className="spot-card-actions">
        <Button onClick={handleAddToList}>Add to List</Button>
      </CardActions>
    </div>
  );
};

export default SpotCard;
