import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import { useState } from "react";
import Title from "components/typography/Title";
import { Stack } from "../../../node_modules/@mui/material/index";

const DateRangePicker = ({
    setFrom = () => {},
    setTo = () => {},
    fromDate = "",
    toDate = "",
    defaultValue = false,
}) => {
    const date = new Date();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [clearEndDate, setClearEndDate] = useState(false);
    const [clearStartDate, setClearStartDate] = useState(false);
    const [dateFrom, setDateFrom] = useState(
        dayjs(new Date(date?.getFullYear(), date?.getMonth(), 1))
    );
    const [dateTo, setDateTo] = useState(dayjs());

    React.useEffect(() => {
        if (clearEndDate) {
            setTo("");
            setEndDate("");
            const timeout = setTimeout(() => {
                setClearEndDate(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        if (clearStartDate) {
            setFrom("");
            setStartDate("");
            const timeout = setTimeout(() => {
                setClearStartDate(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => {};
    }, [clearEndDate, clearStartDate]);

    return (
        <Box
            sx={{
                "& > .MuiStack-root": {
                    padding: "0",
                    margin: "0",
                    overflow: "unset",
                    minWidth: "0",
                },
                "& .MuiStack-root> .MuiTextField-root": { minWidth: "0" },
            }}
            display={"flex"}
            flexDirection={"row"}
            gap={"0.7143rem"}
        >
            <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                    sx={{
                        "&  > .MuiInputBase-root": {
                            height: "2.6429rem",
                            width: "15rem",
                        },
                    }}
                    value={defaultValue ? dateFrom : startDate}
                    label="From"
                    onChange={(e) => {
                        setStartDate(dayjs(e).format("YYYY-MM-DD"));
                        setFrom(dayjs(e).format("YYYY-MM-DD"));
                    }}
                    slotProps={{
                        field: {
                            clearable: true,
                            onClear: () => setClearStartDate(true),
                        },
                        textField: {
                            size: "small",
                            error: false,
                        },
                    }}
                />
            </DemoContainer>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                    sx={{
                        "&  > .MuiInputBase-root": {
                            height: "2.6429rem",
                            width: "15rem",
                        },
                    }}
                    label="To"
                    value={defaultValue ? dateTo : endDate}
                    minDate={dayjs(startDate)}
                    disabled={!startDate && !defaultValue ? true : false}
                    onChange={(e) => {
                        setEndDate(dayjs(e).format("YYYY-MM-DD"));
                        setTo(dayjs(e).format("YYYY-MM-DD"));
                    }}
                    slotProps={{
                        field: {
                            clearable: true,
                            onClear: () => setClearEndDate(true),
                        },
                        textField: {
                            size: "small",
                            error: false,
                        },
                    }}
                />
            </DemoContainer>
        </Box>
    );
};

export default DateRangePicker;

export const CustomDatePicker = ({
    value,
    onChange = () => {},
    onClear = () => {},
    label = "",
    sx,
}) => {
    const _sx = {
        position: "relative",
        top: "2px",
        mb: "1.25rem",
        borderRadius: "0.625rem",
        color: "#5F6368",
        "& legend": {
            display: "none",
        },

        ...sx,
    };
    return (
        <Stack spacing={1.7}>
            <Title fontWeight={"400"} color={"#5F6368"}>
                {label}{" "}
            </Title>
            <DatePicker
                sx={{
                    "& .MuiInputBase-root": {
                        position: "relative",
                        top: "-2px",
                        height: "2.1429rem",
                        borderRadius: "0.625rem",
                        borderColor: "#CBD5E1",
                        "&:hover": {},
                        boxShadow: "0px 1px 2px 0px rgba(15, 23, 42, 0.06)",

                        "& > input": {
                            padding: "0.7857rem",
                            paddingBottom: "1rem",
                            "&::placeholder": {
                                color: " #94A3B8",
                                opacity: "1",
                            },
                        },
                    },
                    ..._sx,
                }}
                value={value}
                onChange={(e) => {
                    onChange(e);
                }}
                slotProps={{
                    field: {
                        clearable: true,
                        onClear: () => onClear(),
                    },
                    textField: {
                        size: "small",
                        error: false,
                    },
                }}
            />
        </Stack>
    );
};
