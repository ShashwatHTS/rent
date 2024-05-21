import React, { useMemo, useState } from "react";
import Text from "components/typography/Text";
import CustomStepper from "components/ui/CustomStepper/index";
import { Box } from "@mui/material";
import TabPanel from "components/ui/TabPanel";
import StackRow from "components/ui/StackRow";
import CustomButton from "components/form/CustomButton";
import CustomStepperWIthTabs from "components/ui/CustomStepper/CustomStepperWIthTabs";

const StepperWithTabs = () => {
    const [state, setState] = useState(0);
    const [id, setId] = useState("1");
    const steps = useMemo(
        () => [
            { label: "Tab 0", component: <Comp1 id={id} /> },
            { label: "Tab 1", component: <Comp2 /> },
        ],
        [id]
    );
    return (
        <Box sx={{ maxWidth: "71.4286rem", m: "auto", mt: "3.4286rem" }}>
            <Text
                variant={"h2"}
                sx={{
                    textAlign: "center",
                }}
            >
                Stepper With Tabs
            </Text>
            <br />
            <CustomStepperWIthTabs
                isTab
                activeStep={state}
                onChange={setState}
                steps={steps}
            />
            <StackRow>
                <CustomButton
                    disabled={state === 0}
                    onClick={() => setState(state - 1)}
                >
                    Prev
                </CustomButton>
                <CustomButton
                    disabled={state === 2}
                    onClick={() => {
                        setState(state + 1);
                        setId(id + 1);
                    }}
                >
                    Next
                </CustomButton>
            </StackRow>
        </Box>
    );
};

export default StepperWithTabs;

const Comp1 = () => {
    return (
        <Text
            variant={"h2"}
            sx={{
                textAlign: "center",
            }}
        >
            Tab 0
        </Text>
    );
};

const Comp2 = () => (
    <Text
        variant={"h2"}
        sx={{
            textAlign: "center",
        }}
    >
        Tab 1
    </Text>
);
