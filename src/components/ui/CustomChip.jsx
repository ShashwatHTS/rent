import * as React from "react";
import Chip from "@mui/material/Chip";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

let chipSxObj = {
    paid: {
        color: "#15803D",
        iconColor: "#22C55E",
        bgColor: "#F0FDF4",
    },
    pending: {
        color: "#B45309",
        iconColor: "#F59E0B",
        bgColor: "#FFFBEB",
    },
    failed: {
        color: "#B91C1C",
        iconColor: "#F59E0B",
        bgColor: "#FEF2F2",
    },
    gray: {
        color: "#334155",
        bgColor: "#F1F5F9",
    },
    blue: {
        color: "#1347CC",
        bgColor: "#EEF2FF",
    },
    orange: {
        color: "red",
        bgColor: "#EEF2FF",
    },
};

const getChipThemeSx = (themeName = "gray") => {
    const theme = chipSxObj[themeName];
    return {
        mr: 1,
        minWidth: "4.5rem",
        backgroundColor: theme?.bgColor,
        color: theme?.color,
        fontSize: "1.2rem",
        fontWeight: "500",
        "& .MuiChip-icon": {
            color: theme?.iconColor,
            ml: "0.7143rem",
        },
    };
};

export default function CustomChip({
    sx = {},
    dotted = false,
    theme = "grey",
    label = "",
    backgroundColor,
    textColor,
    ...otherProps
}) {
    return (
        <Chip
            label={
                label[0]?.toUpperCase() + label?.slice(1, label.length) || label
            }
            sx={{
                transition: "0.3s",
                ...getChipThemeSx(theme),
                height: "2rem",
                py: "0.5714rem",
                // backgroundColor: backgroundColor,
                // color: textColor,
                ...sx,
            }}
            icon={
                dotted ? (
                    <FiberManualRecordIcon sx={{ fontSize: "0.5rem" }} />
                ) : null
            }
            {...otherProps}
        />
    );
}
