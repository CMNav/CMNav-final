import React from "react";
import { CardActions, Button } from "@mui/material";

const SpotCard = ({
  id,
  name,
  image,
  type,
  smallDescription,
  description,
  lat,
  lng,
  onClick,
  onAddToList, // Updated prop name
  handleOpenSnackbar,
}) => {
  const handleAddToList = (event) => {
    event.stopPropagation(); // prevent card onClick from firing
    const spot = {
      id,
      name,
      image,
      type,
      smallDescription,
      description,
      lat,
      lng,
    };

    onAddToList(spot); // Call the onAddToList function from the prop
    handleOpenSnackbar();
  };

  return (
    <div
      className="spot-card"
      data-category={type}
      data-subcategory={type === "Restaurants" ? "Restaurants" : "Spots"}
      onClick={onClick} // added onClick handler
    >
      <div className="spot-card-img">
        <img src={image} alt={name} />
      </div>
      <div className="spot-card-info">
        <h2 className="spot-card-title">{name}</h2>
        <p className="spot-card-desc">{description}</p>
      </div>
      <CardActions className="spot-card-actions">
        <Button onClick={handleAddToList}>Add to List</Button>
      </CardActions>
    </div>
  );
};

export default SpotCard;
