import { useField } from "formik";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { CircularProgress, Stack, Typography } from "@mui/material";
import Title from "components/typography/Title";

export default function CustomSelectFormik({
  notFormik = false,
  noLabel = false,
  required,
  label = "Add Label",
  sx = {},
  placeholder,
  value = "Role",
  menuList = [],
  noLabelMenu,
  disabled = false,
  onChange = () => {},
  loading = true,
  name,
}) {
  const _sx = {
    position: "relative",
    top: "2px",
    mb: "1.25rem",
    borderRadius: "0.625rem",
    boxShadow: "0px 1px 2px rgba(15, 23, 42, 0.06)",
    height: "2.8571rem",
    padding: "0.7857rem",
    color: "#94A3B8",
    borderColor: "#CBD5E1",
    "& .MuiOutlinedInput-notchedOutline": {},
    "& legend": {
      display: "none",
    },

    ...sx,
  };
  return (
    <Stack spacing={0.5}>
      {!noLabel && (
        <Title fontWeight={"500"} color={"#0F172A"}>
          {label}{" "}
          <span
            style={{
              display: required ? "inline" : "none",
              color: "#EF4444",
            }}
          >
            *
          </span>
          {!menuList.length && loading && (
            <CircularProgress
              sx={{
                ml: 1,
              }}
              size={14}
            />
          )}
        </Title>
      )}
      {!notFormik ? (
        <FormikSelect
          name={name}
          placeholder={placeholder}
          noLabelMenu={noLabelMenu}
          disabled={disabled}
          sx={_sx}
          menuList={menuList}
        />
      ) : (
        <BasicSelect
          name={name}
          placeholder={placeholder}
          noLabelMenu={noLabelMenu}
          disabled={disabled}
          sx={_sx}
          menuList={menuList}
          value={value}
          onChange={onChange}
        />
      )}
    </Stack>
  );
}
const FormikSelect = ({
  defaultValue,
  noLabelMenu,
  disabled,
  placeholder,
  menuList = [],
  name,
  sx,
}) => {
  const [field, meta] = useField(name);
  return (
    <>
      <Select
        name={name}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        defaultValue={defaultValue}
        value={field?.value || ""}
        onChange={(e) => {
          field.onChange(e);
        }}
        onBlur={field.onBlur}
        error={meta.touched && meta.error ? true : false}
        sx={{
          ...sx,
          "& fieldset": {
            border: `1px ${
              meta.touched && meta.error ? "#d32f2f" : "#CBD5E1"
            } solid!important`,
          },
        }}
        disabled={disabled}
      >
        {!noLabelMenu && placeholder && (
          <MenuItem value={""}>{placeholder}</MenuItem>
        )}
        {menuList.map((menu, index) => (
          <MenuItem key={menu.id || index} value={menu.value}>
            {menu.name}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error && (
        <Typography variant="body2" color="error">
          {meta.error}
        </Typography>
      )}
    </>
  );
};

const BasicSelect = ({
  defaultValue,
  noLabelMenu,
  disabled,
  placeholder,
  menuList = [],
  name,
  sx,
  value = "",
  onChange,
}) => {
  return (
    <>
      <Select
        name={name}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        sx={sx}
        disabled={disabled}
      >
        {!noLabelMenu && placeholder && (
          <MenuItem value={""}>{placeholder}</MenuItem>
        )}
        {menuList.map((menu, index) => (
          <MenuItem key={menu.id || index} value={menu.value}>
            {menu.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
