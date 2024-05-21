import { FormControlLabel, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";

const CustomSwitch = ({
  value = false,
  onChange,
  label,
  isInternalSetState = true,
  name,
}) => {
  const [state, setState] = useState (value || false);

  useEffect(() => {
    setState(value || false);
  }, [value]);

  return (
    <FormControlLabel
      control={
        <Switch
          focusVisibleClassName=".Mui-focusVisible"
          name={name}
          checked={state}
          onChange={(e) => {
            if (isInternalSetState) {
              setState(e.target.checked);
            }
            onChange?.(e);
          }}
        />
      }
      label={typeof label === "string" ? label : label?.(state)}
    />
  );
};

export default CustomSwitch;
