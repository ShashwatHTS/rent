import React from "react";
import { Typography } from "@mui/material";

/**
 * @typedef {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'} TextComponent
 */

/**
 * @param {Object} props - The component props.
 * @param {string} [props.variant] - The text variant.
 * @param {TextComponent} [props.component] - The HTML tag for the text.
 * @param {boolean} [props.pointer] - Whether the text has a pointer cursor.
 * @param {React.ReactNode} props.children - The text content.
 * @param {boolean} [props.bold] - Whether the text is bold.
 * @param {object} [props.sx] - Additional styling using the MUI sx prop.
 * @returns {JSX.Element} The Text component.
 */
const Text = ({ variant, component, pointer, children, bold, sx }) => {
    return (
        <Typography
            variant={variant || ""}
            component={component || "p"}
            color={bold ? "#0F172A" : ""}
            sx={{ cursor: pointer ? "pointer" : "default", ...sx }}
            fontWeight={bold ? 500 : ""}
        >
            {children}
        </Typography>
    );
};

export default Text;
