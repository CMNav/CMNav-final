import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import contactImage from "../assets/contact.jpeg";
import "../styles/Contact.css";

import { useTranslation } from "react-i18next";

const Contact = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    fullName: false,
    email: false,
    company: false,
    message: false,
  });
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = () => {
    const { fullName, email, company, message } = formValues;

    if (fullName && email && company && message) {
      // Reset form errors
      setFormErrors({
        fullName: false,
        email: false,
        company: false,
        message: false,
      });

      // Logic for form submission
      setOpenSnackbar(true);
      setIsButtonClicked(true);
    } else {
      // Display form error messages
      setFormErrors({
        fullName: fullName ? false : "Please enter your full name",
        email: email ? false : "Please enter a valid email",
        company: company ? false : "Please enter your company",
        message: message ? false : "Please enter your message",
      });

      setOpenSnackbar(true);
      setIsButtonClicked(false);
    }
  };

  const handleFormChange = (event) => {
    const { id, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const { t } = useTranslation();

  return (
    <div>
      <div className="nav">
        <Navbar />
      </div>
      <div className="hero-contact">
        <Hero
          title={t("Contact Us")}
          description={t(
            "Get in touch with us and fulfill your business potential with us"
          )}
          backgroundImage={contactImage}
        />
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          marginTop: "20px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                width: "80%",
                margin: "auto",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {t("Contact Information")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <PhoneIcon sx={{ marginRight: "10px" }} />
                  <Typography variant="body1">Phone: 123-456-7890</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <EmailIcon sx={{ marginRight: "10px" }} />
                  <Typography variant="body1">
                    Email: example@example.com
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <AccessTimeIcon sx={{ marginRight: "10px" }} />
                  <Typography variant="body1">
                    {t("Business Hours")}: Monday-Friday, 9AM-5PM
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <RoomIcon sx={{ marginRight: "10px" }} />
                  <Typography variant="body1">
                    {t("Location")}: University of Ottawa, Ottawa, Canada
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                marginRight: "10%",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {t("Contact Form")}
                </Typography>
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    id="fullName"
                    label={t("Full Name")}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formValues.fullName}
                    onChange={handleFormChange}
                    error={!!formErrors.fullName}
                    helperText={
                      formErrors.fullName ? t("Full Name is required") : ""
                    }
                  />
                  <TextField
                    id="email"
                    label={t("Email")}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formValues.email}
                    onChange={handleFormChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email ? t("Email is required") : ""}
                  />
                  <TextField
                    id="company"
                    label={t("Company")}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formValues.company}
                    onChange={handleFormChange}
                    error={!!formErrors.company}
                    helperText={
                      formErrors.company ? t("Company is required") : ""
                    }
                  />
                  <TextField
                    id="message"
                    label={t("How can we help you?")}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={formValues.message}
                    onChange={handleFormChange}
                    error={!!formErrors.message}
                    helperText={
                      formErrors.message ? t("Message is required") : ""
                    }
                  />
                  <Button
                    variant="contained"
                    color={isButtonClicked ? "success" : "primary"}
                    size="large"
                    fullWidth
                    sx={{ marginTop: "20px" }}
                    onClick={handleSubmit}
                  >
                    {t("Submit")}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        sx={{
          width: "90%",
          left: 0,
          bottom: 0,
          marginBottom: "20px",
          borderRadius: "4px",
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={isButtonClicked ? "success" : "error"}
          sx={{ width: "100%", borderRadius: "4px" }}
        >
          {isButtonClicked
            ? t("Form submitted successfully")
            : t("Form submission failed")}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Contact;
