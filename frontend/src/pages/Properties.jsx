import React, { useEffect, useState } from "react";
import properties from "../../properties.json";
import { Button, Grid, Typography } from "@mui/material";
import PropertyCard from "../components/PropertyCard";

const Properties = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [temp, setTemp] = useState(6)

  useEffect(() => {
    let start = 0;
    let end = temp;
    if (page === 1)
      start = 0
    else {
      start = temp
      setTemp(temp >= properties.length ? properties.length : temp + 6)
    };
    setData(properties.slice(start, end * page))
    console.log({ start, end ,page})
  }, [page])
  return (
    <>
      <Typography>{properties.length}</Typography>
      <Grid container spacing={2} p={2}>
        {data.map((data) => (
          <Grid item xs={12} md={4}>
            <PropertyCard data={data} />
          </Grid>
        ))}

      </Grid>
      <Button onClick={() => page > 0 && setPage(page - 1)} >Prev</Button>
      <Button onClick={() => setPage(page + 1)} >Next</Button>
    </>
  );
};

export default Properties;
