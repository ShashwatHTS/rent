import React from "react";
import { LoadingButton } from "@mui/lab";

const CustomButton = ({
    children,
    sx,
    bgColor,
    borderColor,
    textColor,
    textContent,
    disabled = false,
    loading = false,
    type = "button", // Set a default value if needed
    variant = "contained",
    onClick = () => {},
    startIcon = null,
    endIcon = null
}) => {
    return (
        <LoadingButton
            type={type}
            variant={variant}
            sx={{
                borderColor: borderColor,
                background: bgColor,
                color: textColor,
                boxShadow: "none",
                ...sx,
            }}
            disabled={disabled}
            loading={loading}
            onClick={() => onClick()}
            startIcon={startIcon}
            endIcon={endIcon}
        >
            {textContent || children}
        </LoadingButton>
    );
};

export default CustomButton;
