import React, { useEffect, useMemo } from "react";

import LayoutWrapper from "components/ui/LayoutWrapper";
import "./App.css";
import DashboardSvg from "assets/svgs/DashboardSvg";
import FormInputs from "features/docs/FormInputs";
import { errorToast, successToast } from "utils/toast";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Typography from "features/docs/Typography";
import Tables from "features/docs/Tables";
import Auth from "features/docs/Auth";
import { Modal } from "features/docs/Modal";
import Chips from "features/docs/Chips";
import { ReactQueryDevtools } from "react-query/devtools";
import ProtectedRoutes from "components/PrivateRoutes";
import StepperWithTabs from "features/docs/StepperWithTabs";
import InternetStatusChecker from "components/ui/InternetStatusChecker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SplashScreen from "pages/SplashScreen";
import NestedRoutes, { Child, SubChild } from "features/docs/NestedRoutes";

// import "./utils/axiosInterceptors"; if using expiry-token

const theme = createTheme({
    typography: {
        // fontSize : 16,
        fontFamily: "Inter",
    },
    palette: {
        primary: {
            main: "#4F46E5",
            contrastText: "#fff",
        },
        secondary: {
            main: "#4F46E5",
            contrastText: "#fff",
        },

        text: {
            primary: "#0F172A",
        },
    },
});
const array = [
    {
        label: 1,
        children: [
            {
                label: 11,
                children: [
                    { label: 111 },
                    {
                        label: 112,

                        children: [{ label: 1121 }],
                    },
                ],
            },
            { label: 12 },
        ],
    },
];

function reccur(value) {
    console.log("label: ", value.label);

    if (value.children?.length) {
        value.children.forEach((elt) => reccur(elt));
    }
}
array.forEach((elt) => reccur(elt));

function App() {
    const profile = {
        title: "Abhishek Katore",
        lead: "Admin",
        avatar: "https://res.cloudinary.com/practicaldev/image/fetch/s--G5AWXQ2H--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/i/v4y43jjfj7u5r8to8qdu.png",
        menuList: [
            {
                id: 1,
                label: "My Account",
                onClick: () => alert("You clicked 'My Account'"),
            },
            {
                id: 2,
                label: "Settings",
                onClick: () => alert("You clicked Settings"),
            },
        ],
    };
    const menuList = [
        {
            id: 10,
            icon: DashboardSvg,
            name: "Dashboard",
            onClick: () => {
                alert(
                    "You clicked on Dashboad, this page dosen't exist due to 'noLink: true'"
                );
            },
            noLink: true,
        },
        {
            id: 1,
            name: "Components",
            children: [
                {
                    id: 1,
                    name: "Typography",
                },
                {
                    id: 2,
                    name: "Form Inputs",
                },
                {
                    id: 3,
                    name: "Tables",
                },
                {
                    id: 4,
                    name: "Auth",
                },
                {
                    id: 5,
                    name: "Modal",
                },
                {
                    id: 6,
                    name: "Chips",
                },
                {
                    id: 7,
                    name: "Stepper With Tabs",
                },
                {
                    id: 8,
                    name: "Nested Routes",
                },
            ],
        },
    ];
    useEffect(() => {
        0 && errorToast("Error");
        successToast("React JS Structure");
    }, []);
    const ctx = useSelector((state) => state.auth);
    const routers = useMemo(
        () => [
            {
                path: "/components/typography",
                element: <Typography />,
            },
            {
                path: "/components/form-inputs",
                element: <FormInputs />,
            },
            {
                path: "/components/tables",
                element: <Tables />,
            },
            {
                path: "/components/auth",
                element: <Auth />,
            },
            {
                path: "/components/modal",
                element: <Modal />,
            },
            {
                path: "/components/chips",
                element: <Chips />,
            },
            {
                path: "/components/stepper-with-tabs",
                element: <StepperWithTabs />,
            },

            {
                path: "/components/nested-routes",
                element: <NestedRoutes />,
                children: [
                    {
                        path: "/child",
                        element: <Child />,
                        children: [
                            {
                                path: "/sub-child",
                                element: <SubChild />,
                            },
                        ],
                    },
                ],
            },
        ],
        []
    );
    function updatePaths(routes, parentPath = "") {
        return routes.map((route) => {
            const newPath = `${parentPath}${route.path}`;

            const updatedRoute = {
                ...route,
                path: newPath,
            };

            if (route.children) {
                updatedRoute.children = updatePaths(
                    route.children,
                    `${newPath}`
                );
            }

            return updatedRoute;
        });
    }
    function generateRoutes(routes) {
        return routes.map(({ path, element, children }) => {
            const nestedRoutes = (parentPath) =>
                children ? generateRoutes(children, parentPath) : null;
            console.log("path", path);
            return (
                <>
                    <Route key={path} path={path} element={element} />
                    {nestedRoutes(path)}
                </>
            );
        });
    }

    console.log(updatePaths(routers));

    return (
        <div className="App">
            <SplashScreen />
            <ReactQueryDevtools />
            <ThemeProvider theme={theme}>
                <InternetStatusChecker />
                <LayoutWrapper
                    noLayout={!ctx?.isAuthenticated}
                    brand={
                        "https://cdn3d.iconscout.com/3d/free/thumb/free-react-9294867-7578010.png?f=webp"
                    }
                    navLinks={[
                        { title: "Typography", path: "/components/typography" },
                        {
                            title: "Form Inputs",
                            path: "/components/form-inputs",
                        },
                        { title: "Tables", path: "/components/tables" },
                    ]}
                    NavBarPosition={"center"}
                    profile={profile}
                    menuList={menuList}
                >
                    <Routes>
                        <Route path="/components/auth" element={<Auth />} />

                        <Route
                            path="/"
                            element={<ProtectedRoutes to="/components/auth" />}
                        >
                            {generateRoutes(updatePaths(routers))}
                        </Route>
                    </Routes>
                </LayoutWrapper>
            </ThemeProvider>
        </div>
    );
}

export default App;
