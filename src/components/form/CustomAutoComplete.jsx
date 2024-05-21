import React, { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Stack, Typography } from "@mui/material";
import { useField } from "formik";



export default function CustomAutoComplete({
	notFormik = false,
	noLabel = false,
	required,
	label = "Add Label",
	sx = {},
	menuList = [],
	disabled = false,
	name = "",
	value = { id: "", value: "", name: "" },
    isClearDisabled = false,
	onChange = () => {}
}) {
	const _sx = {
		position: "relative",
		top: -1,
		"& .MuiInputBase-root": {
			height: "3.2857rem",

			py: 0,
			borderRadius: "0.7143rem",
			"&:hover": {
				borderColor: "#CBD5E1"
			},
			boxShadow: "0px 1px 2px 0px rgba(15, 23, 42, 0.06)",
			"& > input": {
				padding: "0.7857rem",
				"&::placeholder": {
					color: " #94A3B8",
					opacity: "1"
				}
			}
		},
		"& fieldset": {
			borderColor: "transparent",
			"&:hover": {
				borderColor: "transparent!important"
			},
			display: "none!important"
		},
		"& .MuiFormControl-root": {
			border: "1px #CBD5E1 solid",
			borderRadius: "0.7857rem"
		},
		"& .MuiFormLabel-root, & .legend": {
			display: "none!important"
		},
		'& .MuiAutocomplete-clearIndicator': {
            display: isClearDisabled  ? 'none' : ""
        },
		...sx
	};
	return (
		<Stack spacing={0.5}>
			{!noLabel && (
				<Typography
					sx={{
						mb: "0.4286rem"
					}}
					fontWeight={"500"}
					color={"#0F172A"}
				>
					{label}{" "}
					<span
						style={{
							display: required ? "inline" : "none",
							color: "#EF4444"
						}}
					>
						*
					</span>
				</Typography>
			)}
			{!notFormik ? (
				<FormikAutoComplete
					name={name}
					sx={_sx}
					menuList={menuList}
					label={label}
					onChange={onChange}
					disabled={disabled}
				/>
			) : (
				<BasicAutoComplete
					sx={_sx}
					menuList={menuList}
					label={label}
					value={value}
					onChange={onChange}
					disabled={disabled}
				/>
			)}
		</Stack>
	);
}

const FormikAutoComplete = ({
	name = "",
	sx,
	menuList = [],
	label,
	onChange = () => {},
	disabled = false
}) => {
	const [field, meta] = useField(name);

	useEffect(() => {
		field.onChange({
			target: { id: "", name: name, value: "" }
		});
	}, []);
	const isError = meta.touched && meta.error ? true : false;
	return (
		<Autocomplete
			sx={sx}
			options={menuList}
			getOptionLabel={(option) => option.name || ""}
			value={field?.value}
			onChange={(_, newValue) => {
				newValue &&
					field.onChange({
						target: { name: name, value: newValue }
					});
				newValue && onChange(newValue);
			}}
			onBlur={field.onBlur}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					variant="outlined"
					error={isError}
					disabled={disabled}
					sx={sx}
					helperText={isError ? meta.error : ""}
				/>
			)}
		/>
	);
};

const BasicAutoComplete = ({
	sx,
	menuList = [],
	label,
	value = { id: "", value: "", name: "" },
	onChange = () => {},
	disabled = false
}) => {
	return (
		<Autocomplete
			sx={sx}
			key={value}
			options={menuList}
			getOptionLabel={(option) => option?.label || ""}
			value={menuList.find((opt) => opt.value === value)}

			onChange={(event, value) =>
				onChange(value?.value)
			}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					variant="outlined"
					disabled={disabled}
					sx={sx}
				/>
			)}
		/>
	);
};
