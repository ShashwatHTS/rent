import { Grid } from "@mui/material";
import React, { useState } from "react";
import PropertyCard from "../components/PropertyCard";
import { useAuthState } from "../atoms";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [properties, setProperties] = useState([]);
  const [authState, setAuthState] = useAuthState();

  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/properties", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token").slice(1, -1)
        }
      });
      const data = await response.json();
      setProperties(data.properties);
    } catch (error) {
      console.log(error);
    }
  }
  function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * properties.length);
    return properties[randomIndex];
  }

  function getRandomCardList() {
    const list = [getRandomCard(), getRandomCard(), getRandomCard()];
    const a = [...new Set(list)];
    if (a.length < 3) return getRandomCardList();
    console.log(a);
    return a;
  }

  return (
    <>
      {authState.loggedIn ? (
        <Grid container spacing={2} p={2}>
          {getRandomCardList().map((data) => (
            <Grid item xs={12} md={4}>
              <PropertyCard data={data} />
            </Grid>
          ))}
        </Grid>)
        : useNavigate("/login")}
    </>
  );
};

export default Home;
