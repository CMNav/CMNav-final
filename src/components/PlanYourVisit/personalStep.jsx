import React, { useState } from "react";
import { Box, Typography, TextField, Grid, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const PersonalStep = ({
  onNext,
  validateForm,
  fullName,
  setFullName,
  email,
  setEmail,
  errors,
}) => {
  const [arrivalDate, setArrivalDate] = React.useState(dayjs("2023-07-17"));
  const [departureDate, setDepartureDate] = React.useState(dayjs("2023-07-19"));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Typography variant="h6">Step 6: Personal Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              name="fullName"
              fullWidth
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Arrival Date"
                name="arrivalDate"
                fullWidth
                required
                value={arrivalDate}
                onChange={(newValue) => setArrivalDate(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Departure Date"
                name="departureDate"
                fullWidth
                required
                value={departureDate}
                onChange={(newValue) => setDepartureDate(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">Next</Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default PersonalStep;
