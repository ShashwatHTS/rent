import { Box } from "@mui/material";
import StackRow from "./StackRow";
import { useNavigate } from "react-router-dom";
import LeftArrowSvg from "assets/svgs/LeftArrowSvg";
import Text from "components/typography/Text";
import Title from "components/typography/Title";

const PageHeader = ({
    showBack,
    subTitle,
    title,
    rightUi,
    bottomBorder = "",
    mb,
    secondary,
    sx = {},
    onClose = null,
}) => {
    const navigate = useNavigate();
    return (
        <StackRow
            alignItems="center"
            sx={{
                marginBottom: mb || "1rem",
                cursor: showBack ? "pointer" : "default",
                width: "100%",
                "& .back-wrapper svg": {
                    transition: "0.3s",
                    position: "relative",
                    left: "-0",
                },
                "&:hover .back-wrapper svg": {
                    left: "-0.2857rem",
                },
                pb: "1.1429rem",
                borderBottom:
                    bottomBorder || "1px solid var(--gray-200, #E2E8F0)",
                ...sx,
            }}
        >
            {showBack && (
                <StackRow
                    onClick={() => showBack && navigate(-1)}
                    className="back-wrapper"
                    gap={1}
                    sx={{
                        alignSelf: "flex-start",
                        paddingTop: "0.2857rem",
                    }}
                >
                    <LeftArrowSvg />
                    {!title && <Text variant={"h5"}>Back</Text>}
                </StackRow>
            )}
            <Box onClick={() => showBack && navigate(-1)}>
                <Text
                    variant={"h5"}
                    component="p"
                    sx={{
                        fontWeight: secondary ? "600" : "700",
                        fontSize: secondary ? "20" : "30",
                    }}
                >
                    {title}
                </Text>
                <Text component="span" fontSize={secondary ? 14 : 16}>
                    {subTitle}
                </Text>
                <img
                    alt="Close"
                    onClick={() => onClose?.()}
                    src={require("assets/images/close.png")}
                    style={{
                        width: "2rem",
                        position: "absolute",
                        top: "1.5rem",
                        right: "1.5rem",
                        cursor: "pointer",
                        display:
                            typeof onClose == "function" ? "block" : "none",
                    }}
                />
            </Box>
            <Box ml="auto">{rightUi}</Box>
        </StackRow>
    );
};

export default PageHeader;
