import { Box, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import PaperBox from "./PaperBox";

const CustomDialog = ({
    open: _open = false,
    setOpen: _setOpen = () => {},
    buttonComp,
    width,
    children,
    onClose = () => {},
    sx = {},
    dontClose = false,
    height,
}) => {
    const [open, setOpen] = useState(_open || false);

    useEffect(() => {
        setOpen(_open);
    }, [_open]);

    const handleClose = () => {
        !dontClose && setOpen(!open);
        !dontClose && _setOpen(!open);
        onClose?.();
    };
    const childrenProps = {
        onClose: () => {
            setOpen(!open);
            _setOpen(!open);
        },
    };
    return (
        <Box>
            <Dialog
                height={height}
                open={open}
                onClose={() => handleClose()}
                sx={{
                    "& .MuiDialog-paper": {
                        background: "transparent",
                        width: width || "auto",
                        ...sx,
                    },
                }}
            >
                <PaperBox
                    boxSx={{
                        p: 3,
                    }}
                >
                    {typeof children === "function"
                        ? children(childrenProps)
                        : children}
                </PaperBox>
            </Dialog>
            {buttonComp?.({
                onClick: () => {
                    setOpen(!open);
                    _setOpen(!open);
                },
            })}
        </Box>
    );
};

export default CustomDialog;
