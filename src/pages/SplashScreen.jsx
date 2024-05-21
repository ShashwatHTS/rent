import { LinearProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Logo from "../assets/logo.svg";

const SplashScreen = () => {
    const [show, setShow] = useState(true);
    let ref = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 1000);

        setTimeout(() => {
            if (ref.current) {
                ref.current.style.display = "none";
            }
        }, 1500);
    }, []);
    return (
        <div
            ref={ref}
            style={{
                opacity: show ? "1" : "0",
                transition: "1s",
                position: "fixed",
                zIndex: "999",
                width: "100vw",
                height: "100vh",
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                objectFit: "contain",
            }}
        >
            <div
                style={{
                    position: "relative",
                    display: "grid",
                    placeContent: "center",
                }}
            >
                <img
                    src={Logo}
                    style={{
                        margin: "auto",
                        left: 0,
                        borderRadius: "100%",
                        width: "90%",
                        height: "90%",
                    }}
                />
                <LinearProgress />
            </div>
        </div>
    );
};

export default SplashScreen;
