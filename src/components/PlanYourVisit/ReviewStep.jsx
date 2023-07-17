import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const ReviewStep = ({
  selectedSpots = [],
  selectedRestaurants = [],
  selectedEvents = [],
  transportationType,
  transportationCost,
}) => {
  const handleSpotChange = (event) => {};
  const handleRestaurantChange = (event) => {};
  const handleEventChange = (event) => {};

  const defaultIcon = new Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <Box sx={{ width: "100%", marginTop: 2, display: "flex" }}>
      <div style={{ flex: 1 }}>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <Typography variant="h6" gutterBottom style={{ marginRight: 20 }}>
            Spots to Visit
          </Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <Select onChange={handleSpotChange}>
              {selectedSpots.map((spot) => (
                <MenuItem value={spot.name}>{spot.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <Typography variant="h6" gutterBottom style={{ marginRight: 20 }}>
            Restaurants
          </Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <Select onChange={handleRestaurantChange}>
              {selectedRestaurants.map((restaurant) => (
                <MenuItem value={restaurant.name}>{restaurant.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <Typography variant="h6" gutterBottom style={{ marginRight: 20 }}>
            Events
          </Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <Select onChange={handleEventChange}>
              {selectedEvents.map((event) => (
                <MenuItem value={event.name}>{event.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{ marginTop: 2 }}
        >
          Transportation Method: {transportationType}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{ marginTop: 2 }}
        >
          Total Estimated Price: $ {transportationCost + 200}
        </Typography>
      </div>
      <div
        style={{
          flex: 1,
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          padding: 10,
        }}
      >
        <div style={{ height: "500px", borderRadius: "10px" }}>
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {[...selectedSpots, ...selectedRestaurants, ...selectedEvents].map(
              (item) => {
                if (item.lat && item.lng) {
                  // Check if latitude and longitude are defined
                  return (
                    <Marker
                      position={[item.lat, item.lng]}
                      key={item.name}
                      icon={defaultIcon}
                    >
                      <Popup>{item.name}</Popup>
                    </Marker>
                  );
                }
                return null; // Skip items without latitude and longitude
              }
            )}
          </MapContainer>
        </div>
      </div>
    </Box>
  );
};

export default ReviewStep;
