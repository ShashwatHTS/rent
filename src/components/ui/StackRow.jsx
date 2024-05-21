import { Stack } from "@mui/material";
import React from "react";

const StackRow = ({
  children,
  between,
  isFlexEnd,
  center,
  onClick = () => {},
  marginBottom = "0px",
  sx = {},
}) => {
  return (
    <Stack
      marginBottom={marginBottom}
      onClick={onClick}
      flexDirection={"row"}
      alignItems={center ? "center" : "flex-start"}
      justifyContent={
        isFlexEnd ? "flex-end" : between ? "space-between" : "flex-start"
      }
      gap={"0.2857rem"}
      sx={sx}
    >
      {children}
    </Stack>
  );
};

export default StackRow;
