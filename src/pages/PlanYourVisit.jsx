import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import "../styles/PlanYourVisit.css";
import ItemStep from "../components/PlanYourVisit/ItemStep";
import ReviewStep from "../components/PlanYourVisit/ReviewStep";
import PersonalStep from "../components/PlanYourVisit/personalStep";
import { spots, restaurants, events } from "../assets/PlanLists";
import TransportationStep from "../components/PlanYourVisit/TransportationStep";
import { Link } from "react-router-dom";

const steps = [
  "Choose Spots to go to",
  "Choose Events to attend",
  "Choose Restaurants",
  "Choose Transportation",
  "Review Details",
  "Personal Information",
];

const PlanYourVisit = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const spotsContainerRef = useRef(null);
  const [selectedSpots, setSelectedSpots] = React.useState(spots);
  const [selectedEvents, setSelectedEvents] = React.useState(events);
  const [selectedRestaurants, setSelectedRestaurants] =
    React.useState(restaurants);
  const [transportationType, setTransportationType] = useState("Walking");
  const [errorMessage, setErrorMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (spotsContainerRef.current) {
      spotsContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [activeStep]);

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (fullName === "") {
      formIsValid = false;
      errors["fullName"] = "Please enter your full name";
    }

    if (email === "") {
      formIsValid = false;
      errors["email"] = "Please enter your email";
    } else if (typeof email !== "undefined") {
      let pattern = new RegExp(/^\S+@\S+\.\S+$/);
      if (!pattern.test(email)) {
        formIsValid = false;
        errors["email"] = "Please enter valid email";
      }
    }

    setErrors(errors);
    return formIsValid;
  };

  const calculateStats = () => {
    const numberOfSpots = selectedSpots.length;
    let avgTripTime, avgDistance, estimatedCost, totalTripTime;

    switch (transportationType) {
      case "Walking":
        // These values are placeholders for the 'Walking' type.
        avgTripTime = numberOfSpots * 10;
        avgDistance = numberOfSpots * 1.8;
        estimatedCost = 0;
        totalTripTime = numberOfSpots * 15;
        break;
      case "Public Transit":
        // These values are placeholders for the 'PublicTransportation' type.
        avgTripTime = numberOfSpots * 8;
        avgDistance = numberOfSpots * 1.5;
        estimatedCost = numberOfSpots * 2;
        totalTripTime = numberOfSpots * 12;
        break;
      case "Driving":
        // These values are placeholders for the 'Taxi' type.
        avgTripTime = numberOfSpots * 5;
        avgDistance = numberOfSpots * 1.5;
        estimatedCost = numberOfSpots * 10;
        totalTripTime = numberOfSpots * 8;
        break;
      case "Bicycling":
        avgTripTime = numberOfSpots * 7;
        avgDistance = numberOfSpots * 1.6;
        estimatedCost = 0;
        totalTripTime = numberOfSpots * 11.5;
      default:
        break;
    }

    return { avgTripTime, avgDistance, estimatedCost, totalTripTime };
  };

  const handleTransportationTypeChange = (event) => {
    setTransportationType(event.target.value);
  };

  const totalSteps = () => {
    return steps.length;
  };

  const handleRemove = (type, id) => {
    switch (type) {
      case "spots":
        setSelectedSpots((prevSpots) =>
          prevSpots.filter((spot) => spot.id !== id)
        );
        break;
      case "events":
        setSelectedEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
        break;
      case "restaurants":
        setSelectedRestaurants((prevRestaurants) =>
          prevRestaurants.filter((restaurant) => restaurant.id !== id)
        );
        break;
      default:
        break;
    }
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    // If we're at the "Personal Information" step and the form is invalid, don't proceed to the next step
    if (activeStep === steps.length - 1 && !validateForm()) {
      setErrorMessage("Please fix the errors before proceeding.");
      return;
    }

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ItemStep
            items={selectedSpots}
            onRemove={(id) => handleRemove("spots", id)}
          />
        );
      case 1:
        return (
          <ItemStep
            items={selectedEvents}
            onRemove={(id) => handleRemove("events", id)}
          />
        );
      case 2:
        return (
          <ItemStep
            items={selectedRestaurants}
            onRemove={(id) => handleRemove("restaurants", id)}
          />
        );
      case 3:
        return (
          <TransportationStep
            transportationType={transportationType}
            onTransportationTypeChange={handleTransportationTypeChange}
            stats={calculateStats()}
          />
        );
      case 4:
        return (
          <ReviewStep
            selectedSpots={selectedSpots}
            selectedRestaurant={selectedRestaurants}
            selectedEvent={selectedEvents}
            transportationType={transportationType}
            transportationCost={
              (selectedSpots.length +
                selectedEvents.length +
                selectedRestaurants.length) *
              4
            }
          />
        );
      case 5:
        return (
          <PersonalStep
            validateForm={validateForm}
            errors={errors}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="plan-main">
      <div className="plan-overlay" />

      <div className="plan-nav">
        <Navbar />
      </div>

      <div className="steps-container">
        <Box sx={{ width: "100%" }}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            className="plan-stepper"
          >
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton className="step-button" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <React.Fragment>
                <div className="plan-box-container" ref={spotsContainerRef}>
                  <Typography
                    className="plan-title"
                    variant="h2"
                    sx={{ mt: "3%" }}
                  >
                    Completed All steps
                  </Typography>
                  <Box
                    className="plan-box"
                    sx={{
                      maxHeight: 500, // Set the maximum height of the container
                      overflow: "auto", // Enable scrolling when content overflows
                    }}
                  >
                    <div className="spots-container">
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed have been completed - you&apos;re
                        finished.
                      </Typography>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        An itenary will be sent to your email shortly.
                      </Typography>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset} sx={{ ml: 25 }}>
                        Reset
                      </Button>
                    </div>
                  </Box>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography
                  className="plan-title"
                  variant="h2"
                  sx={{ mt: "3%" }}
                >
                  {steps[activeStep]}
                </Typography>
                <div className="plan-box-container" ref={spotsContainerRef}>
                  <Box
                    className="plan-box"
                    sx={{
                      maxHeight: 500,
                      overflow: "auto",
                    }}
                  >
                    <div className="plan-spots-container">
                      <Box>{renderStepContent(activeStep)}</Box>
                    </div>
                  </Box>

                  <div className="btn-container">
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className="btn-back"
                      sx={{
                        backgroundColor: "#008080",
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor: "#00AAAA",
                        },
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      className="btn-more"
                      sx={{
                        backgroundColor: "#008080",
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor: "#00AAAA",
                        },
                      }}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/spots"
                      >
                        Add More
                      </Link>
                    </Button>
                    <Button
                      className="btn-next"
                      onClick={handleNext}
                      sx={{
                        backgroundColor: "#008080",
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor: "#00AAAA",
                        },
                      }}
                    >
                      Next
                    </Button>

                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button
                          className="btn-complete"
                          onClick={handleComplete}
                          sx={{
                            backgroundColor: "#008080",
                            color: "#ffffff",
                            "&:hover": {
                              backgroundColor: "#00AAAA",
                            },
                          }}
                        >
                          {completedSteps() === totalSteps() - 1
                            ? "Finish"
                            : "Complete Step"}
                        </Button>
                      ))}
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default PlanYourVisit;
