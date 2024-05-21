import React, { useEffect, useState } from "react";
import NoInternetPng from "assets/images/no-internet.png";
import { Stack } from "@mui/material";
import Text from "components/typography/Text";
import CustomDialog from "./CustomDialog";

function InternetStatusChecker() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <div>
            {!isOnline ? (
                <CustomDialog
                    dontClose
                    open={true}
                    sx={{ width: "38.21429rem" }}
                >
                    <Stack alignItems={"center"}>
                        <img
                            alt="No Internet"
                            src={NoInternetPng}
                            style={{ width: "23.85714rem" }}
                        />
                        <Text
                            fontSize={"1.2rem"}
                            fontWeight={600}
                            color={"#000"}
                            sx={{ textAlign: "center", fontSize: "1.3rem" }}
                        >
                            Oops Can't Move Forward
                        </Text>
                        <Text
                            fontSize={"1.2rem"}
                            fontWeight={600}
                            color={"#000"}
                            sx={{ textAlign: "center" }}
                        >
                            It seems your Internet is slow or not working{" "}
                        </Text>
                    </Stack>
                </CustomDialog>
            ) : (
                <></>
            )}
        </div>
    );
}

export default InternetStatusChecker;
