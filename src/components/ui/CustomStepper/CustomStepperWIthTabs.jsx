import React from "react";
import CustomStepper from "./index";
import { Box } from "@mui/material";
import TabPanel from "../TabPanel";

const CustomStepperWIthTabs = ({
    activeStep = 0,
    onChange = () => {},
    steps = [],
    isTab = false,
}) => {
    return (
        <div>
            {" "}
            <CustomStepper
                steps={steps.map((step) => step.label)}
                activeStep={activeStep}
                onChange={onChange}
                isTab={isTab}
            />
            <Box
                sx={{
                    height: "30rem",
                    position: "relative",
                }}
            >
                {steps.map(({ component }, index) => (
                    <TabPositionWrapper key={index}>
                        <TabPanel index={index} key={index} value={activeStep}>
                            {component}
                        </TabPanel>
                    </TabPositionWrapper>
                ))}
            </Box>
        </div>
    );
};

const TabPositionWrapper = (props) => (
    <Box
        sx={{
            display: "grid",
            placeContent: "center",
            height: "30rem",
            position: "absolute",
            width: "100%",
        }}
        children={props.children}
    />
);

export default CustomStepperWIthTabs;
