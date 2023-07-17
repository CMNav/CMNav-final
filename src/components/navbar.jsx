import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const pages = ["Home", "Events", "Spots", "Contact Us", "Plan Your Visit"];
const pages_route = ["/", "/Events", "/Spots", "/contact", "/plan-your-vist"];

function ResponsiveAppBar() {
  const [activePage, setActivePage] = useState("");
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "transparent", boxShadow: "none" }}
    >
      <Toolbar disableGutters>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "flex-start",
            marginLeft: "20px",
          }}
        >
          <AdbIcon sx={{ mr: 4 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Times New Roman",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CMNav
          </Typography>
        </Box>
        <Box sx={{ display: "flex", marginRight: "10px" }}>
          {pages.map((page, index) => {
            const isActive = activePage === page;
            return (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: isActive ? "black" : "white",
                  display: "block",
                  "&:hover": {
                    backgroundColor: "#FFD700",
                  },
                }}
                onMouseEnter={() => setActivePage(page)}
                onMouseLeave={() => setActivePage("")}
                component={Link}
                to={pages_route[index]}
                style={{ textDecoration: "none" }}
              >
                {t(page)}
              </Button>
            );
          })}
          <Button onClick={changeLanguage}>
            {i18n.language.toUpperCase()}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
