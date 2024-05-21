import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchSvg from "assets/svgs/SearchSvg";

const CustomSearch = ({ sx = {}, value, onChange, name, placeholder }) => {
    return (
        <TextField
            sx={{
                maxWidth: "16.6429rem",

                "& .MuiInputBase-root": {
                    fontSize: "1rem",

                    "&:hover": {
                        borderColor: "#CBD5E1",
                    },
                    boxShadow: "0px 1px 2px 0px rgba(15, 23, 42, 0.06)",
                    borderRadius: "0.3571rem",
                    "& > input": {
                        padding: "0.4286rem 0.6429rem",
                        paddingLeft: 0,
                        fontSize: "1rem",
                        "&::placeholder": {
                            color: "#94A3B8",
                            opacity: "1",
                        },
                    },
                },
                "& fieldset": {
                    borderColor: "#CBD5E1",
                },
                ...sx,
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchSvg />
                    </InputAdornment>
                ),
            }}
            value={value}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
        />
    );
};

export default CustomSearch;
