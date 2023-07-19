import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import "../styles/Spots.css";
import {
  sites_historical,
  sites_museums,
  sites_parks,
  Restaurants_Asian,
  Restaurants_FastFood,
  Restaurants_Italian,
  Restaurants_Seafood,
  Restaurants_Vegan,
  Restaurants_FamilyFriendly,
  Restaurants_FineDining,
  Restaurants_Cafes,
  Shopping_Boutiques,
  Shopping_Malls,
  Shopping_Markets,
  ToDo_Activities,
  ToDo_Nightlife,
  ToDo_Tours,
} from "../assets/SpotsLists";
import herobg from "../assets/spots-bg.jpeg";
import {
  spots as spotsData,
  restaurants as restaurantsData,
} from "../assets/PlanLists";
import SpotCard from "../components/spots/SpotCard";

const categories = [
  { name: "Sites", subcategories: ["Historical", "Museums", "Parks"] },
  { name: "Shopping", subcategories: ["Malls", "Boutiques", "Markets"] },
  { name: "To Do", subcategories: ["Tours", "Activities", "Nightlife"] },
  {
    name: "Restaurants",
    subcategories: [
      "Italian",
      "Asian",
      "Sea Food",
      "Cafes",
      "Fast Food",
      "Fine Dining",
      "Family Friendly",
      "Vegan",
    ],
  },
];

const SpotDetailsModal = ({
  open,
  onClose,
  spot,
  onAddToList,
  handleOpenSnackbar,
}) => {
  if (!open) return null;

  const handleAddToList = () => {
    onAddToList(spot);
    handleOpenSnackbar();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="spot-name">{spot.name}</h2>
        <p className="spot-location">{spot.location}</p>
        <p className="spot-description">{spot.description}</p>
        <p className="spot-category">{spot.category}</p>
        <h3>Reviews</h3>
        {spot.ratings.map((review, index) => (
          <div key={index} className="review-container">
            <h4>{review.user}</h4>
            <p>{review.comment}</p>
            <Rating
              name={`review-rating-${index}`}
              value={review.rating}
              readOnly
            />
          </div>
        ))}

        <div className="modal-buttons">
          <button className="close-button" onClick={onClose}>
            Close
          </button>
          <button className="add-button" onClick={handleAddToList}>
            Add to List
          </button>
        </div>
      </div>
    </div>
  );
};
const Spots = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const [spots, setSpots] = useState([]); // Make spots a state variable
  const [restaurants, setRestaurants] = useState([]);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openWarningSnackbar, setOpenWarningSnackbar] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [selectedCategories, selectedSubcategories]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCardClick = (spot) => {
    setSelectedSpot(spot);
  };

  const handleModalClose = () => {
    setSelectedSpot(null);
  };

  const handleAddToList = (spot) => {
    const isSpotAlreadyAdded = spotsData.find((item) => item.id === spot.id);
    const isRestaurantAlreadyAdded = restaurantsData.find(
      (item) => item.id === spot.id
    );

    if (isSpotAlreadyAdded || isRestaurantAlreadyAdded) {
      setOpenWarningSnackbar(true); // Warning snackbar
    } else {
      if (spot.type === "Restaurants") {
        restaurantsData.push(spot);
        console.log(restaurantsData);
      } else {
        spotsData.push(spot);
      }
      console.log("Spot added to list:", spot);
      setSelectedSpot(null); // Close the modal after adding the spot
      setOpenSuccessSnackbar(true); // Success snackbar
    }
  };

  const handleCategoryChange = (event, category) => {
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    }
  };

  const handleSubcategoryChange = (event, subcategory) => {
    if (event.target.checked) {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    } else {
      setSelectedSubcategories(
        selectedSubcategories.filter((item) => item !== subcategory)
      );
    }
  };

  let filterSpots = [];

  if (selectedCategories.length > 0) {
    filterSpots = categories
      .filter((category) => selectedCategories.includes(category.name))
      .flatMap((category) =>
        category.subcategories.map((subcategory) => ({
          category: category.name,
          subcategory,
        }))
      )
      .filter((spot) => selectedSubcategories.includes(spot.subcategory))
      .flatMap((spot) => {
        switch (spot.subcategory) {
          case "Historical":
            return sites_historical;
          case "Museums":
            return sites_museums;
          case "Parks":
            return sites_parks;
          case "Malls":
            return Shopping_Malls;
          case "Boutiques":
            return Shopping_Boutiques;
          case "Markets":
            return Shopping_Markets;
          case "Tours":
            return ToDo_Tours;
          case "Activities":
            return ToDo_Activities;
          case "Nightlife":
            return ToDo_Nightlife;
          case "Italian":
            return Restaurants_Italian;
          case "Asian":
            return Restaurants_Asian;
          case "Cafes":
            return Restaurants_Cafes;
          case "Fast Food":
            return Restaurants_FastFood;
          case "Sea Food":
            return Restaurants_Seafood;
          case "Fine Dining":
            return Restaurants_FineDining;
          case "Family Friendly":
            return Restaurants_FamilyFriendly;
          case "Vegan":
            return Restaurants_Vegan;
          default:
            return [];
        }
      });
  } else {
    filterSpots = [
      ...sites_historical,
      ...sites_museums,
      ...sites_parks,
      ...Shopping_Malls,
      ...Shopping_Boutiques,
      ...Shopping_Markets,
      ...ToDo_Tours,
      ...ToDo_Activities,
      ...ToDo_Nightlife,
      ...Restaurants_Italian,
      ...Restaurants_Asian,
      ...Restaurants_Cafes,
      ...Restaurants_FastFood,
      ...Restaurants_Seafood,
      ...Restaurants_FineDining,
      ...Restaurants_FamilyFriendly,
      ...Restaurants_Vegan,
    ];
  }

  return (
    <div>
      <div className="nav">
        <Navbar />
      </div>
      <div className="hero-spots">
        <Hero
          title="Spots"
          description="Discover the hidden gems of the city"
          backgroundImage={herobg}
        />
      </div>
      <div className="spots-container">
        <div className="faceted-search">
          <h2>Categories</h2>
          {categories.map((category) => (
            <FormControlLabel
              key={category.name}
              control={
                <Checkbox
                  onChange={(event) =>
                    handleCategoryChange(event, category.name)
                  }
                />
              }
              label={category.name}
            />
          ))}
          {selectedCategories.length > 0 && (
            <>
              <h3>Subcategories</h3>
              {categories
                .filter((category) =>
                  selectedCategories.includes(category.name)
                )
                .flatMap((category) => category.subcategories)
                .map((subcategory) => (
                  <FormControlLabel
                    key={subcategory}
                    control={
                      <Checkbox
                        onChange={(event) =>
                          handleSubcategoryChange(event, subcategory)
                        }
                      />
                    }
                    label={subcategory}
                  />
                ))}
            </>
          )}
        </div>
        <div className="spot-cards">
          {filterSpots
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((spot, index) => (
              <SpotCard
                key={index}
                id={spot.id}
                name={spot.name}
                image={spot.image}
                type={spot.type} // This is an assumption. Adapt according to your actual 'type' field.
                smallDescription={spot.smallDescription} // Adapt according to your actual 'smallDescription' field.
                description={spot.description}
                lat={spot.lat}
                lng={spot.lng}
                rating={spot.rating}
                onClick={() => handleCardClick(spot)}
                onAddToList={handleAddToList} // pass the handleAddToList function as a prop
                handleOpenSnackbar={handleOpenSnackbar}
              />
            ))}
        </div>
        <Pagination
          className="pagination"
          count={Math.ceil(filterSpots.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
        {selectedSpot && (
          <SpotDetailsModal
            open={!!selectedSpot}
            onClose={handleModalClose}
            spot={selectedSpot}
            onAddToList={handleAddToList}
            handleOpenSnackbar={handleOpenSnackbar}
          />
        )}
      </div>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSuccessSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Spot added to list!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openWarningSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenWarningSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenWarningSnackbar(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Spot already exists in the list!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Spots;
