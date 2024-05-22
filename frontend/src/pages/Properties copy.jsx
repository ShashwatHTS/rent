import React from "react";
import properties from "../../properties.json";
import { Grid } from "@mui/material";
import PropertyCard from "../components/PropertyCard";

const Properties = () => {
  
  return (
    <>
      <Grid container spacing={2} p={2}>
        {properties.map((data) => (
          <Grid item xs={12} md={4}>
            <PropertyCard data={data} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Properties;
