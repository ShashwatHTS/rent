import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Button, IconButton, Stack } from "@mui/material";

export default function CustomMenu({
    ButtonComp,
    children,
    menuList = [],
    menuOnClick = () => {},
    width,
    className = "",
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        if (event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const sxStyles = {
        menu: {
            "& .MuiPaper-root": {
                borderRadius: "0.75rem",
                p: "0.75rem",
                boxShadow: "0px 1px 1rem #E2E8F0",
                border: "1px solid #E2E8F0",
                width: width || "15.25rem",
            },
        },
        menuItem: {
            borderRadius: "0.875rem",
            mt: 1,
        },
        menuItemSpan: {
            fontSize: "0.875rem",
            fontWeight: "500",
        },
    };

    const buttonCompProps = {
        onClick: handleClick,
    };

    return (
        <Box className={className} sx={{}}>
            {ButtonComp ? (
                <Button
                    sx={{
                        padding: 0,
                    }}
                >
                    {ButtonComp(buttonCompProps)}
                </Button>
            ) : (
                <IconButton {...buttonCompProps}>
                    <MoreHorizIcon />
                </IconButton>
            )}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                sx={sxStyles.menu}
            >
                {children}
                {menuList.map(
                    ({ icon, label, id, className, onClick = () => {} }) => (
                        <MenuItem
                            key={id}
                            onClick={() => {
                                handleClose();
                                menuOnClick({ label, id });
                                onClick();
                            }}
                            sx={sxStyles.menuItem}
                            className={className}
                        >
                            <Stack
                                direction="row"
                                gap={1}
                                alignItems={"center"}
                            >
                                {icon}
                                <span style={sxStyles.menuItemSpan}>
                                    {label}
                                </span>
                            </Stack>
                        </MenuItem>
                    )
                )}
            </Menu>
        </Box>
    );
}
