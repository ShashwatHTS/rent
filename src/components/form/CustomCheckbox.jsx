import { Field } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";


const CustomCheckbox = ({
	label = "Add label prop",
	labelSx,
	name,
	notFormik = false,
	checked = false,
	onChange
}) => {
	const _sx = {
		"& .MuiTypography-root": {
			color: "#334155",
			fontWeight: "500",
			...labelSx
		}
	};
	return !notFormik ? (
		<FromikCheckbox name={name} label={label} sx={_sx} />
	) : (
		<BasicCheckbox
			name={name}
			label={label}
			sx={_sx}
			checked={checked}
			onChange={onChange}
		/>
	);
};

const FromikCheckbox = ({ name, label, sx }) => {
	return (
		<Field name={name}>
			{({ field }) => (
				<FormControlLabel
					sx={sx}
					control={<Checkbox {...field} checked={field.checked} />}
					label={label}
				/>
			)}
		</Field>
	);
};

const BasicCheckbox = ({ name, label, sx, checked = false, onChange }) => {
	return (
		<FormControlLabel
			sx={sx}
			control={
				<Checkbox name={name} checked={checked} onChange={onChange} />
			}
			label={label}
		/>
	);
};

export default CustomCheckbox;
