import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import Text from "components/typography/Text";
import { Link, useLocation } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";

const SideNavbar = ({ sideBarHandler = () => {}, menuList = [] }) => {
    const location = useLocation();
    const matches = useMediaQuery("(max-width: 1200px)");
    const [data] = useState(menuList);

    return (
        <Stack
            sx={{
                flex: matches ? "1" : "0 0 20rem",
                borderRight: "1px #E2E8F0 solid",
                height: "initial",
                display:
                    location.pathname === "/outlets/onboard" ? "none" : "flex",
            }}
        >
            <Stack px={"0.9rem"} py={"0.7143rem"} gap="0.4286rem" sx={{ height: "100%" }}>
                {data.map((item) => {
                    const getLink = (name) =>
                        name.toLowerCase().replaceAll(" ", "-") || "";
                    const itemLink = `/${getLink(item.name)}`;

                    return item?.noLink ? (
                        <SideNavbarItem
                            key={item.id}
                            {...item}
                            link={itemLink}
                            sx={{
                                marginTop: item.id === 8 ? "auto" : 0,
                            }}
                        />
                    ) : !item.children ? (
                        <Link
                            to={itemLink}
                            onClick={sideBarHandler}
                            key={item.id}
                            style={{ textDecoration: "none" }}
                        >
                            <SideNavbarItem
                                key={item.id}
                                {...item}
                                link={itemLink}
                                sx={{
                                    marginTop: item.id === 8 ? "auto" : 0,
                                }}
                            />
                        </Link>
                    ) : (
                        <SideNavbarAccordionItem
                            item={item}
                            key={item?.id}
                            getLink={getLink}
                            sideBarHandler={sideBarHandler}
                        />
                    );
                })}
            </Stack>
        </Stack>
    );
};

export default SideNavbar;

const SideNavbarItem = ({ icon: Icon, name, sx = {}, link, onClick }) => {
    const location = useLocation();
    const isCurrentPage = location.pathname === link;
    return (
        <Box
            onClick={() => onClick?.()}
            display="flex"
            px={"0.9rem"}
            py="0.5714rem"
            gap={"0.9rem"}
            alignItems={"center"}
            className="sidebar_item"
            sx={{
                transition: "0.3s",
                cursor: "pointer",
                borderRadius: "0.5714rem",
                backgroundColor: isCurrentPage ? "#EEF2FF" : "transparent",

                ...sx,
            }}
        >
            {Icon && <Icon color={isCurrentPage ? "#6366F1" : "#64748B"} />}
            <Text
                // color={"#64748B"}
                fontWeight={500}
                sx={{
                    textDecoration: "none",
                    cursor: "pointer",
                    fontWeight: isCurrentPage ? "600" : "400",
                    color: isCurrentPage ? "#6366F1" : "#64748B",
                }}
            >
                {name}
            </Text>
        </Box>
    );
};

const SideNavbarAccordionItem = ({ item, getLink, sideBarHandler }) => {
    const location = useLocation();
    const isActive = item.children.some(
        (c) => `/${getLink(item.name)}/${getLink(c.name)}` === location.pathname
    );
    const [isExpanded, setIsExpanded] = useState(false);
    useEffect(() => {
        if (isActive) {
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }
    }, [location.pathname]);
    return (
        <Accordion
            onClick={() => setIsExpanded((e) => !e)}
            expanded={isExpanded}
            key={item.id}
            sx={{
                // "& > .sidebar_item": {
                //     backgroundColor: isExpanded ? "#EEF2FF" : "white",
                // },
                boxShadow: "none",
                "&.Mui-expanded": {
                    m: 0,
                    "& svg + p": {
                        fontWeight: "600",
                        color: "#6366F1",
                    },
                    "& svg": {
                        fill: "#6366F1",
                    },
                },
                "& .MuiAccordionSummary-content": {
                    m: 0,
                    p: 0,
                    "&.Mui-expanded": { m: 0 },
                },
                "& .MuiAccordionSummary-root": {
                    p: 0,
                    minHeight: 0,
                },
                "&:before": {
                    backgroundColor: "none",
                    position: "relative",
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                key={item.id}
            >
                <SideNavbarItem
                    key={item.id}
                    onClick={item.onClick}
                    {...item}
                    sx={{
                        marginTop: item.id === 8 ? "auto" : 0,
                        flex: 1,
                        backgroundColor: isExpanded ? "#EEF2FF" : "transparent",
                        "& .MuiTypography-root": {
                            //

                            fontWeight: isExpanded ? "500" : "400",
                            color: isExpanded ? "#6366F1" : "#64748B",
                        },
                    }}
                />
            </AccordionSummary>
            <AccordionDetails>
                {item.children.map((c) => {
                    const cLink = `/${getLink(item.name)}/${getLink(c.name)}`;
                    return (
                        <Link
                            onClick={sideBarHandler}
                            to={cLink}
                            key={c.id}
                            style={{ textDecoration: "none" }}
                        >
                            <SideNavbarItem
                                key={c.id}
                                {...c}
                                link={cLink}
                                sx={{
                                    marginTop: c.id === 8 ? "auto" : 0,
                                    marginBottom: 1,
                                }}
                            />
                        </Link>
                    );
                })}
            </AccordionDetails>
        </Accordion>
    );
};
