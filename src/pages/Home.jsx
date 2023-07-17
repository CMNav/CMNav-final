import React from "react";
import Navbar from "../components/navbar";
import { Button } from "@mui/material";
import "../styles/Home.css";
import herobg from "../assets/home-bg.mp4";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="home-nav">
        <Navbar />
      </div>
      <div className="hero">
        <video className="hero-video" autoPlay muted loop>
          <source src={herobg} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">{t("heroTitle")}</h1>
          <h2 className="hero-subtitle">{t("heroSubtitle")}</h2>
          <Button
            className="home-btn"
            sx={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: 500,
              margin: "0 1rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              backgroundColor: "#008088",
              transition: "box-shadow 0.3s, background-color 0.3s",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#009999",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <Link to="/plan-your-vist" className="link">
              {t("planYourVisit")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
