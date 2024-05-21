import { Button, Stack } from "@mui/material";
import React, { useState } from "react";


const NavBarButton= ({ children, onClick, state, id }) => {
	const sxHoverObj = {
		borderColor: "#E2E8F0",
		background: "white",
		color: "#0F172A",
		boxShadow:
			"0px 1px 3px rgba(15, 23, 42, 0.08), 0px 1px 2px -1px rgba(15, 23, 42, 0.1)"
	};
	let sxActiveObj = {};
	if (state === id) sxActiveObj = sxHoverObj;
	const sxObj = {
		height: "100%",
		fontSize: "0.875rem",
		color: "#64748B",
		textAlign: "center",
		transition: "0.3s",
		cursor: "pointer",
		display: "grid",
		placeContent: "center",
		borderRadius: 2,
		border: "1px solid transparent",
		textTransform: "inherit",
		"&:hover": sxHoverObj
	};

	return (
		<Button sx={{ ...sxObj, ...sxActiveObj }} onClick={onClick}>
			{children}
		</Button>
	);
};

const HeaderNavbar= () => {
	const [state, setState] = useState<number>(0);
	const navList= [
		{ id: 1, name: "Dashboard" },
		{ id: 2, name: "Restaurants" },
		{ id: 3, name: "Payments" },
		{ id: 4, name: "Users" },
		{ id: 5, name: "Configuration" }
	];

	return (
		<Stack
			direction="row"
			alignItems="center"
			spacing={0.5}
			sx={{
				background: "#F8FAFC",
				borderRadius: 2,
				border: "1px solid #F1F5F9",
				p: 0.5,
				height: "2.125"
			}}
		>
			{navList.map((elt, index) => (
				<NavBarButton
					key={index}
					id={index}
					state={state}
					onClick={() => setState(index)}
				>
					{elt.name}
				</NavBarButton>
			))}
		</Stack>
	);
};

export default HeaderNavbar;
