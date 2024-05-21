import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, FormLabel, Typography } from '@mui/material';
import { useField } from "formik";


export const CustomRadioButton = ({
  notFormik = false,
  value,
  menuList,
  label,
  sx,
  name,
  onChange = () => {}
}) => {
  const _sx = {
    '& .css-1ta22r5-MuiFormControlLabel-root.MuiFormControlLabel-root .css-1kahes7-MuiFormGroup-root': {
      display: "flex",
      flexDirection: 'row !important',
      width: "12.4821rem",
      padding: "0.8571rem 1.1429rem",
      alignItems: "flex-start",
      gap: "0.7143rem",
      flexShrink: "0",
      borderRadius: "0.8571rem",
      border: "1px solid var(--gray-200, #E2E8F0)",
      marginBottom: "1.4286rem",
    }
  }
  return (
    !notFormik ? (
      <FormikRadioButtonsGroup name={name} value={value} menuList={menuList} onChange={onChange} label={label} sx={_sx}  />
    ) :
      <BasicRadioButtonsGroup name={name}label={label} onChange={onChange} menuList={menuList} value={value} sx={_sx}  />
  )
}

const FormikRadioButtonsGroup = ({ menuList, sx, label, name,onChange}) => {
  const [field, meta] = useField(name);
  return (
    <FormControl style={{ fontSize: "0.9375rem" }}>
      <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={field?.value}
        onChange={(_, newValue) => {
          newValue &&
            field?.onChange({
              target: { name: name, value: newValue }
            });
          newValue && onChange(newValue);
        }}
        sx={sx}
        label={label}
        name={name}
      >
        {menuList?.map((optionItem, index) => (
          <FormControlLabel
            name={"optionItem.name"}
            value={optionItem.value}
            sx={sx || [radioButtonStyle]}
            control={<Radio sx={{ "&.Mui-checked": {} }} size="medium" />}
            label={optionItem.name}
            key={`${optionItem.name}_${index}`}
          />
        ))}
      </RadioGroup>
      {meta.touched && meta.error && (
        <Typography variant="body2" color="error">
          {meta.error}
        </Typography>
      )}

    </FormControl>
  );
}

const BasicRadioButtonsGroup = ({ value, menuList, sx,label, name, onChange }) => {
  return (
    <FormControl style={{ fontSize: "0.9375rem" }}>
      <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={value}
        onChange={
          onChange
        }
        name={name}

        sx={sx}
      >
        {menuList?.map((optionItem, index) => (
          <FormControlLabel
            name={"optionItem.name"}
            value={optionItem.name}
            sx={sx || [radioButtonStyle]}
            control={<Radio sx={{ "&.Mui-checked": {} }} size="medium" />}
            label={optionItem.name}
            key={`${optionItem.name}_${index}`}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

const radioButtonStyle = {
  ".MuiFormControlLabel-label": {
    fontSize: "0.875rem",
    color: "#344054",
    lineHeight: "1.25rem",
  },
  "&.MuiFormControlLabel-root": {
    borderRadius: "2rem",
    paddingRight: "2.1429rem",
    height: "2rem",
    backgroundColor: "#f0f1f3",
  },
};
