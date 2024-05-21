import {
    Skeleton,
    Step,
    StepConnector,
    StepLabel,
    Stepper,
    Zoom,
    stepConnectorClasses,
    styled,
} from "@mui/material";
import ActivePng from "assets/icons/Active.png";
import StepperNotActiveSvg from "assets/svgs/StepperNotActiveSvg";
import StepperActivatedSvg from "assets/svgs/StepperActivatedSvg";
import { Tab, Tabs } from "../../../../node_modules/@mui/material/index";
import { tabsClasses } from "@mui/material/Tabs";

const CustomStepper = ({
    activeStep,
    onChange,
    steps: _steps = ["Add *steps* prop"],
    loading = false,
    sx,
    isTab = false,
}) => {
    if (isTab)
        return (
            <CustomTabStepper
                steps={_steps}
                activeStep={activeStep}
                onChange={onChange}
            />
        );
    return (
        <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<QontoConnector />}
            sx={{
                "& .MuiStepLabel-label": {
                    fontSize: "1rem",
                    color: "#64748B",
                    "&.Mui-active": {
                        fontWeight: "600",
                        color: "#0F172A",
                    },
                },
                ...sx,
            }}
        >
            {_steps.map((label, index) => {
                let _label = typeof label == "string" ? label : label.label;
                let _index = typeof label == "string" ? index : label.index;
                return (
                    <Step key={_label} onClick={() => onChange?.(_index)}>
                        <StepLabel StepIconComponent={QontoStepIcon}>
                            {loading ? (
                                <Skeleton
                                    height={"2ch"}
                                    width={120}
                                    sx={{
                                        transform: "scale(1)",
                                        transformOrigin: "0",
                                        mb: 1,
                                        m: "auto",
                                    }}
                                    animation="wave"
                                />
                            ) : (
                                _label
                            )}
                        </StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
};

export default CustomStepper;

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            <Zoom in={!active}>
                <div
                    style={{
                        position: "absolute",
                    }}
                >
                    <div
                        style={{
                            transform: "scale(0.9)",
                        }}
                    >
                        <StepperNotActiveSvg />
                    </div>
                </div>
            </Zoom>
            {/* <Zoom in={!!completed} out={completed ? false : true}> */}
            <Zoom in={!!completed}>
                <div
                    style={{
                        position: "absolute",
                    }}
                >
                    <StepperActivatedSvg />
                </div>
            </Zoom>
            <Zoom in={active}>
                <div
                    style={{
                        position: "absolute",
                    }}
                >
                    <div
                        style={{
                            transform: "scale(0.9)",
                            backgroundImage: `url(${ActivePng})`,
                            backgroundSize: "contain",
                            height: "2.2857rem",
                            aspectRatio: "1",
                        }}
                    >
                        {/* <StepperActiveSvg /> */}
                    </div>
                </div>
            </Zoom>

            {/* <Zoom in={active} out={!active}>
        <div>
          <StepperNotActiveSvg />
        </div>
      </Zoom> */}
        </QontoStepIconRoot>
    );
}

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    // cursor: "pointer",
    transition: "0.3s",
    borderRadius: "50%",
    // overflow: "hidden",
    transform: "scale(1)",
    aspectRatio: "1",
    // "&:active": {
    //   transform: "scale(0)",
    //   backgroundColor: "whitesmoke",
    //   boxShadow: "0 0 0 rgba(0,0,0,0.1)",
    // },
    // "&:hover": {
    //   boxShadow: "0 0 16px rgba(10,30,200,0.1)",
    // },
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
        color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
        color: "#784af4",
        zIndex: 1,
        fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor",
    },
}));

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#784af4",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#784af4",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderTopWidth: 1,
        borderRadius: 1,
        transition: "1s",
    },
}));

export const CustomTabStepper = ({
    activeStep,
    onChange = (e) => console.log(e),
    steps = [],
}) => (
    <Tabs
        value={activeStep}
        onChange={(_, value) => onChange(value,steps[value])}
        aria-label="basic tabs example"
        scrollButtons="auto"
        allowScrollButtonsMobile
        variant="scrollable"
        sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
            },
        }}
    >
        {steps.map((tab, index) => (
            <Tab
                key={index}
                label={tab}
                style={{ fontSize: "1rem" }}
                {...a11yProps(index)}
            />
        ))}
    </Tabs>
);
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
