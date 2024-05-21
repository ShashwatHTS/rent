import { Button, Stack } from "@mui/material";
import { authLogin, logout } from "Redux Store/Slices/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
    const ctx = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const authLoginHandler = () =>
        dispatch(
            authLogin({
                name: "John Doe",
                role: "Admin",
            })
        );

    return (
        <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{
                width: "100%",
            }}
        >
            <div>{JSON.stringify(ctx)}</div>

            <Button
                variant="contained"
                onClick={() =>
                    ctx?.isAuthenticated
                        ? dispatch(logout())
                        : authLoginHandler()
                }
            >
                {ctx?.isAuthenticated ? "Logout" : "Login"}
            </Button>
        </Stack>
    );
};

export default Auth;
