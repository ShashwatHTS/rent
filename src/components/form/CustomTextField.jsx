import { InputAdornment, Stack, TextField } from "@mui/material";
import Title from "components/typography/Title";
import { useField } from "formik";

const CustomTextField = ({
  notFormik = false,
  required,
  value,
  onChange,
  name,
  label = "",
  startAdornment = null,
  sx,
  inputSx,
  disabled = false,
}) => {
  const _sx = {
    "& .MuiInputBase-root": {
      "&:hover": {
        borderColor: "#CBD5E1",
      },
      boxShadow: "0px 1px 2px 0px rgba(15, 23, 42, 0.06)",
      borderRadius: "0.7143rem",
      "& > input": {
        padding: "0.7857rem",
        "&::placeholder": {
          color: " #94A3B8",
          opacity: "1",
        },
      },
      ...inputSx,
    },
    "& fieldset": {
      borderColor: "#CBD5E1",
    },
    ...sx,
  };

  return (
    <Stack spacing={0.5}>
      {label && (
        <Title fontWeight={"500"} color={"#0F172A"}>
          {label}
          <span
            style={{
              display: required ? "inline" : "none",
              color: "#EF4444",
            }}
          >
            *
          </span>
        </Title>
      )}
      {!notFormik ? (
        <FormikInput
          name={name}
          label={label}
          startAdornment={startAdornment}
          sx={_sx}
          disabled={disabled}
        />
      ) : (
        <BasicInput
          name={name}
          label={label}
          startAdornment={startAdornment}
          sx={_sx}
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
      )}
    </Stack>
  );
};

const FormikInput = ({ name, startAdornment, sx, disabled }) => {
  const [field, meta] = useField(name);
  const errorText = meta.touched && meta.error ? meta.error : "";
  const formikProps = {
    helperText: errorText,
    error: meta.touched && meta.error ? true : false,
    ...field,
  };
  return (
    <TextField
      autoComplete="off"
      InputProps={{
        startAdornment: startAdornment && (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
      }}
      sx={sx}
      disabled={disabled}
      {...formikProps}
    />
  );
};

const BasicInput = ({
  name,
  startAdornment,
  sx,
  disabled,
  value,
  onChange,
}) => {
  return (
    <TextField
      name={name}
      autoComplete="off"
      InputProps={{
        startAdornment: startAdornment && (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
      }}
      sx={sx}
      disabled={disabled}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomTextField;
