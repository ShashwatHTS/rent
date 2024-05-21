import { Stack } from "@mui/material";
import Text from "components/typography/Text";
import React from "react";
import { Link } from "react-router-dom";

const NestedRoutes = () => {
    return (
        <Stack gap={2}>
            <Text variant="h2">Parent</Text>
            <Link to="child">To Child</Link>
        </Stack>
    );
};
export const Child = () => {
    return (
        <Stack gap={2}>
            <Text variant="h2">Child</Text>
            <Link to="sub-child">To SubChild</Link>
        </Stack>
    );
};

export const SubChild = () => {
    return (
        <Stack gap={2}>
            <Text variant="h2">SubChild</Text>
        </Stack>
    );
};

export default NestedRoutes;
