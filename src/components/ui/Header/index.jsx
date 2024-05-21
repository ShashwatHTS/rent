import {
    AppBar,
    Avatar,
    Box,
    Chip,
    IconButton,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Title from "components/typography/Title";
import { useNavigate } from "react-router-dom";
import CustomMenu from "components/form/CustomMenu";

const Header = ({
    sideBarHandler = () => {},
    brand = "",
    navLinks: _navLink = [],
    profile = null,
    NavBarPosition = "center",
}) => {
    const [navLink] = useState(_navLink || []);
    const navigate = useNavigate();
    const matches = useMediaQuery("(max-width: 1200px)");
    return (
        <AppBar
            position="static"
            sx={{
                boxShadow: "none",
                background: "white",
                color: "#0F172A",
                px: "2.2857rem",
                marginLeft: "auto",
                borderBottom: " 1px #E2E8F0 solid",
                position: "sticky",
                top: 0,
                zIndex: 30,
            }}
        >
            <Toolbar
                disableGutters
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <IconButton
                    onClick={() => sideBarHandler()}
                    sx={{ mr: 2, display: matches ? "flex" : "none" }}
                >
                    <MenuIcon fontSize="large" />
                </IconButton>
                <Box display={"flex"} flexDirection={"row"} sx={{}}>
                    <img
                        alt="React JS"
                        src={
                            brand ||
                            "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
                        }
                        style={{
                            width: "auto",
                            height: "2.2857rem",
                            objectFit: "contain",
                            marginBottom: "1.1429rem",
                            marginTop: "1.1429rem",
                            // marginLeft: "-8px",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/")}
                    />
                </Box>

                <Box
                    sx={{
                        py: 1,
                        flex: "1",
                        display: "flex",
                        justifyContent: `${NavBarPosition}`,
                        margin: "auto",
                    }}
                >
                    {navLink?.map((element) => (
                        <Title
                            key={element?.path}
                            color="#334155"
                            sx={{ margin: "0.7143rem", cursor: "pointer" }}
                            fontSize="1rem"
                            textAlign={"center"}
                            onClick={() => navigate(element?.path)}
                        >
                            {element?.title}
                        </Title>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <CustomMenu
                        ButtonComp={(props) => (
                            <Chip
                                deleteIcon={<ExpandMoreIcon />}
                                onDelete={(e) => {
                                    props.onClick(e);
                                }}
                                avatar={
                                    <Avatar
                                        src={profile?.avatar}
                                        sx={{
                                            height: "3.3rem",
                                            width: "3.3rem",
                                            color: "white",
                                        }}
                                    >
                                        {profile?.title?.[0]}
                                    </Avatar>
                                }
                                {...props}
                                sx={{
                                    "& .MuiAvatar-root": {
                                        height: "2rem",
                                        width: "2rem",
                                    },
                                    background: "#F8FAFC",
                                    height: "2.5rem",
                                }}
                            />
                        )}
                        menuList={profile?.menuList || []}
                        menuOnClick={(e) => {
                            console.log(e);
                        }}
                    >
                        <Stack direction={"row"} spacing={2} mb={"1.25rem"}>
                            <Avatar src={profile?.avatar} sx={{}}>
                                {profile?.title?.[0]}
                            </Avatar>
                            <Stack>
                                <Typography
                                    sx={{
                                        color: "#334155",
                                        fontWeight: "500",
                                    }}
                                >
                                    {profile?.title}
                                </Typography>
                                <Title>{profile?.lead}</Title>
                            </Stack>
                        </Stack>
                    </CustomMenu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
