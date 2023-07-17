import React from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Typography,
} from "@mui/material";

const TransportationStep = ({
  transportationType,
  onTransportationTypeChange,
  stats,
}) => {
  const { avgTripTime, avgDistance, estimatedCost, totalTripTime } = stats;

  return (
    <Box sx={{ width: "100%", marginTop: 2 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "28%",
        }}
      >
        <FormControl component="fieldset">
          <div style={{ textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              Transportation Type
            </Typography>
          </div>
          <RadioGroup
            aria-label="transportation-type"
            row
            value={transportationType}
            onChange={onTransportationTypeChange}
          >
            <FormControlLabel
              value="Walking"
              control={<Radio />}
              label="Walking"
            />
            <FormControlLabel
              value="Bicycling"
              control={<Radio />}
              label="Bicycling"
            />
            <FormControlLabel
              value="Driving"
              control={<Radio />}
              label="Driving"
            />
            <FormControlLabel
              value="Public Transit"
              control={<Radio />}
              label="Public Transit"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{ marginTop: 2 }}
      >
        Average Trip Time: {avgTripTime} minutes
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{ marginTop: 2 }}
      >
        Average Distance Between Places: {avgDistance} miles
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{ marginTop: 2 }}
      >
        Estimated Transportation Cost: ${estimatedCost}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{ marginTop: 2 }}
      >
        Estimated Total Trip Time: {totalTripTime} minutes
      </Typography>
    </Box>
  );
};

export default TransportationStep;
