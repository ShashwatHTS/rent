import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CustomMenu from "./CustomMenu";
import StackRow from "components/ui/StackRow";
import DownSvg from "assets/svgs/DownSvg";
import Title from "components/typography/Title";

const StatusFilter = ({
  sx,
  label = "",
  onClick = () => {},
  menuList: _menuList = null,
  width,
  labelWidth,
  defaultValue = null,
}) => {
  const [menuList, setMenuList] = useState(
    _menuList || [
      { id: 1, label: "A to Z" },
      { id: 2, label: "Z to A" },
    ]
  );

  useEffect(() => {
    _menuList && setMenuList(_menuList);
  }, [_menuList]);

  const [value, setValue] = useState(menuList[0].label);

  useEffect(() => {
    defaultValue && setValue(defaultValue);
  }, [defaultValue]);

  return (
    <CustomMenu
      width={width || "7.1429rem"}
      ButtonComp={(props) => (
        <StackRow
          between={true}
          component={Button}
          center
          sx={{
            border: "1px #CBD5E1 solid",
            padding: "5px 0.8571rem",
            borderRadius: "0.4286rem",
            width: labelWidth,
            ...sx,
          }}
          onClick={(e) => props.onClick(e)}
        >
          <Title
            color="#334155"
            fontWeight={500}
            sx={{
              textTransform: "capitalize",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {label} {value && !label ? `${value || label}` : `: ${value || ""}`}
          </Title>
          <DownSvg />
        </StackRow>
      )}
      menuList={menuList}
      menuOnClick={({ label, id }) => {
        onClick(label, id);
        setValue(label);
      }}
    />
  );
};

export default StatusFilter;
