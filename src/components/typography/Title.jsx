import { Typography } from "@mui/material";
import React from "react";

const Title = ({ children, sx, ...otherProps }) => {
  return (
    <Typography fontWeight={600} sx={sx} {...otherProps}>
      {children}
    </Typography>
  );
};

export default Title;
