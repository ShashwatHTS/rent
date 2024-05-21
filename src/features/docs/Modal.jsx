import CustomButton from "components/form/CustomButton";
import Text from "components/typography/Text";
import CustomDialog from "components/ui/CustomDialog";
import { Delete } from "../../../node_modules/@mui/icons-material/index";
import { IconButton } from "../../../node_modules/@mui/material/index";
import StackRow from "components/ui/StackRow";
import Logo from "assets/logo.svg";
export const Modal = () => {
    return (
        <>
            <br />

            <Text variant={"h2"}>Custom Dialog</Text>
            <br />
            <CustomDialog
                buttonComp={(props) => (
                    <CustomButton onClick={props.onClick}>Basic</CustomButton>
                )}
            >
                <img alt="Hello React" src={Logo} />
                <Text>Hello React!</Text>
            </CustomDialog>
            <AlertCustomDialog
                title="Delete this User?"
                subTitle="This User will be permanently deleted from the storage"
            />
        </>
    );
};

const AlertCustomDialog = (props) => (
    <CustomDialog
        sx={{
            "& .MuiPaper-root": {
                background: "linear-gradient(0deg, #dcfcff, white)",
            },
        }}
        buttonComp={(props) => (
            <IconButton onClick={props.onClick}>
                <Delete />
            </IconButton>
        )}
    >
        {({ onClose }) => (
            <>
                <Text
                    sx={{
                        fontWeight: "500",
                    }}
                >
                    {props.title}
                </Text>
                <Text>{props.subTitle}</Text>
                <StackRow sx={{ mt: 2, gap: 2 }}>
                    <CustomButton variant="outlined" onClick={onClose}>
                        Discard
                    </CustomButton>
                    <CustomButton onClick={onClose}>Sure</CustomButton>
                </StackRow>
            </>
        )}
    </CustomDialog>
);
