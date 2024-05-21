import { Box, Paper } from "@mui/material";
import React from "react";

const PaperBox = ({
  children,
  sx,
  boxSx,
  shadowed,
  noBorder,
  padding,
  ...otherProps
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${noBorder ? "transparent" : "#E2E8F0"}`,
        boxShadow: shadowed
          ? "0px 0.7499714493751526px 11.999543190002441px 0px #E2E8F0"
          : "none",
        borderRadius: "0.8571rem",
        ...sx,
      }}
      {...otherProps}
    >
      <Box p={padding || 4} sx={boxSx}>
        {children}
      </Box>
    </Paper>
  );
};

export default PaperBox;
