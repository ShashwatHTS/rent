import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import SideNavbar from "./SideNavbar";

const LayoutWrapper = ({
    children,
    showHeader = true,
    showSidebar = true,
    noLayout = false,
    brand,
    navLinks,
    NavBarPosition,
    profile,
    menuList = [],
}) => {
    const matches = useMediaQuery("(max-width: 1200px)");
    const [open, setOpen] = useState(false);

    return (
        <>
            {!noLayout && showHeader && (
                <Header
                    brand={brand}
                    navLinks={navLinks}
                    profile={profile}
                    sideBarHandler={() => setOpen(!open)}
                    NavBarPosition={NavBarPosition}
                />
            )}
            <Box
                display={"flex"}
                flexDirection={"row"}
                flexWrap={"nowrap"}
                flex={1}
                overflow={"hidden"}
            >
                {!noLayout && showSidebar && !matches ? (
                    <SideNavbar menuList={menuList} />
                ) : (
                    <Drawer
                        anchor={"left"}
                        open={open}
                        onClose={() => setOpen(!open)}
                        sx={{
                            "& .css-oe3u8g-MuiStack-root": { width: "28rem" },
                        }}
                    >
                        <SideNavbar
                            menuList={menuList}
                            sideBarHandler={() => setOpen(!open)}
                        />
                    </Drawer>
                )}
                <Box
                    overflow={"auto"}
                    flex={1}
                    sx={{
                        p: 4,
                    }}
                    display={"flex"}
                    flexDirection={"column"}
                >
                    {children}
                </Box>
            </Box>
        </>
    );
};

export default LayoutWrapper;
