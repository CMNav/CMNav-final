import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import {
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import herobg from "../assets/events-hero.jpeg";
import Hero from "../components/Hero";
import "../styles/Events.css";
import { events_gallery, events_popular } from "../assets/EventsLists";
import { events } from "../assets/PlanLists";
import { useTranslation } from "react-i18next";
import "../styles/Card.css";

const organizations = [
  "Ottawa Festivals",
  "National Arts Centre",
  "Ottawa Art Gallery",
];
const eventTypes = ["Music Festival", "Theatre", "Art Exhibition"];

const Events = () => {
  const { t } = useTranslation(); // Hook for translation
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([
    ...events_popular,
    ...events_gallery,
  ]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleAddEvent = (event) => {
    setSelectedEvents((prevSelectedEvents) => [...prevSelectedEvents, event]);
    events.push(event); // Add the selected event to the events list
    setSnackbarOpen(true); // Show the snackbar
    console.log(events);
  };

  const handleOrganizationChange = (event) => {
    setSelectedOrganization(event.target.value);
  };

  const handleEventTypeChange = (event) => {
    setSelectedEventType(event.target.value);
  };

  const handleOpenDialog = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    let events = [...events_popular, ...events_gallery];

    if (selectedOrganization) {
      events = events.filter(
        (event) => event.organization === selectedOrganization
      );
    }

    if (selectedEventType) {
      events = events.filter((event) => event.type === selectedEventType);
    }

    setFilteredEvents(events);
  }, [selectedOrganization, selectedEventType]);

  return (
    <div>
      <div className="nav">
        <Navbar />
      </div>
      <div className="hero-events">
        <Hero
          title={t("Events")}
          description={t("Discover the best events in the city")}
          backgroundImage={herobg}
        />
      </div>
      <div className="events-filters">
        <FormControl sx={{ marginRight: "10px" }} className="org-filter">
          <InputLabel>{t("Organization")}</InputLabel>
          <Select
            value={selectedOrganization}
            onChange={handleOrganizationChange}
            className="org-select"
          >
            <MenuItem value="">{t("All Organizations")}</MenuItem>
            {organizations.map((organization) => (
              <MenuItem value={organization} key={organization}>
                {t(organization)} {/* Translate the organization name */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="type-filter">
          <InputLabel>{t("Event Type")}</InputLabel>
          <Select
            value={selectedEventType}
            onChange={handleEventTypeChange}
            className="type-select"
          >
            <MenuItem value="">{t("All Event Types")}</MenuItem>
            {eventTypes.map((eventType) => (
              <MenuItem value={eventType} key={eventType}>
                {t(eventType)} {/* Translate the event type */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="events-section">
        <div className="section-header">
          <Typography variant="h5" className="section-title" sx={{ mb: 3 }}>
            {t("Events")}
          </Typography>
        </div>
        <div className="events-cards">
          {filteredEvents.map((event) => (
            <div
              className="event-card-top"
              onClick={() => handleCardClick(event)}
              key={event.name}
            >
              <div className="card-img-wrapper">
                <img
                  src={event.image}
                  alt={event.name}
                  className="event-card-img-top"
                />
              </div>
              <div className="event-card-info-top">
                {" "}
                {/* Added this div to match spot cards */}
                <Typography variant="h6" className="event-card-title-top">
                  {t(event.name)}
                </Typography>
                <Typography variant="subtitle1" className="event-card-desc-top">
                  {t(event.organization)}
                </Typography>
                <Typography variant="body2" className="event-card-desc-top">
                  {t(event.smallDescription)}
                </Typography>
              </div>
              <CardActions className="event-card-actions-top">
                <Button
                  name={event.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddEvent(event);
                  }}
                >
                  {t("Add to List")}
                </Button>
              </CardActions>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Dialog */}

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{selectedEvent && selectedEvent.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedEvent && t(selectedEvent.description)}{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            onClick={handleCloseDialog}
            sx={{
              border: "none",
              background: "#ccc",
              color: "#333",
              padding: " 10px 20px",
              cursor: "pointer",
            }}
          >
            {t("Close")}
          </Button>
          <Button
            onClick={handleAddEvent}
            sx={{
              border: "none",
              background: "#333",
              color: "#fff",
              padding: " 10px 20px",
              cursor: "pointer",
            }}
          >
            {t("Add to List")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {t("Event added to the list successfully!")}{" "}
          {/* Translate the success message */}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Events;
