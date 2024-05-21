import { Grid } from "@mui/material";
import React, { useState } from "react";
import PropertyCard from "../components/PropertyCard";
import properties from "../../properties.json";

const Home = () => {
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
      <Grid container spacing={2} p={2}>
        {getRandomCardList().map((data) => (
          <Grid item xs={12} md={4}>
            <PropertyCard data={data} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
