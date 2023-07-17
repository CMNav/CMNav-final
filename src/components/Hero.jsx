import React from "react";
import { Box, Typography } from "@mui/material";

const Hero = ({ title, description, backgroundImage }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "500px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100% 100%", // Updated backgroundSize
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "20px",
          maxWidth: "600px",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {description}
        </Typography>
      </Box>
      <div className="hero-overlay"></div>
    </Box>
  );
};

export default Hero;
