import { Box, Fade } from "@mui/material";
import React from "react";

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <Fade in={value === index} timeout={500}>
            <div
                role="tabpanel"
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
            >
                <div>
                    <Box>
                        <Box>{children}</Box>
                    </Box>
                </div>
            </div>
        </Fade>
    );
}
export default TabPanel;
