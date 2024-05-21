import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { Box, LinearProgress, Stack } from "@mui/material";
import NoRowsSvg from "assets/svgs/NoRowsSvg";

import axios from "axios";
import CustomMenu from "components/form/CustomMenu";
import EditSvg from "assets/svgs/EditSvg";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import Text from "components/typography/Text";
import { Grid } from "../../../../node_modules/@mui/material/index";
import PaperBox from "../PaperBox";
/**
 * DOCUMENTATION: Props for CustomDataGrid
 *
 * name {string} - (Required) Used for caching with recognition.
 *
 * labelName {string} - Adds a label to the data.
 *
 * columns {array} - Represents the headers of the table.
 *
 * url {string} - Used to fetch data for the table.
 *
 * rowId {string} - Distinguishes rows from each other to perform various tasks. Default is "id".
 *
 * query {object} - Pass an object here to include a query in the URL for data fetching. Default is an empty object.
 *
 * height {string} - Specifies the height of the table.
 *
 * sx {object} - Styling object to customize the appearance of the table.
 *
 * dummyRows {array} - Dummy rows used to check if everything is working fine.
 *
 * mappingRows {function} - Function to map and transform data. Useful for customizing data fields. Default is (data) => data.
 *   Example: (data) => data
 *
 * noActions {boolean} - If set to true, disables actions like edit or delete. Default is false.
 *
 * getLoading - Function to get loading state.
 *
 * getData {function} - Function to get data. Default is an empty function.
 *
 * headerComponent {function} - Function to render a custom header component. Default is an empty function.
 */

const CustomDataGrid = ({
    name,
    labelName,
    columns,
    url,
    rowId = "id",
    query: _query = null,
    height,
    sx = {},
    dummyRows,
    mappingRows = (data) => data,
    noActions = false,
    getLoading,
    getData = () => {},
    headerComponent = () => {},
    mode = "table",
    cardComponent = () => <PaperBox>Add cardComponent prop</PaperBox>,
}) => {
    if (!name) alert("Pass name prop in CustomDataGrid");
    const navigate = useNavigate();
    const { data, isLoading, isFetching, refetch } = useQuery(
        [name, mode],
        () =>
            url
                ? axios.get(`${url}?${queryString.stringify(_query || {})}`)
                : undefined,
        {
            onSuccess: (res) => getData(res?.data?.data),
        }
    );

    useEffect(() => {
        getLoading?.(isLoading || isFetching);
    }, [isLoading, isFetching]);
    const isLoad =
        !isLoading &&
        (data?.data?.data?.length === 0 ||
            (dummyRows && dummyRows.length === 0));
    // if (isLoad) return <NoData name={labelName} />;
    const _columns = [...columns];
    if (!noActions) {
        _columns.push({
            field: "action",
            headerName: " ",
            minWidth: 80,
            sortable: false,
            renderCell: ({ row }) => (
                <CustomMenu
                    width={"10rem"}
                    menuList={[
                        {
                            id: 1,
                            icon: <EditSvg />,
                            label: "Edit",
                        },
                    ]}
                    menuOnClick={({ id }) => {
                        if (id === 1) {
                            navigate(String(row[rowId]));
                        }
                    }}
                />
            ),
        });
    }
    return (
        <div style={{ width: "100%" }}>
            {headerComponent({ refetch })}
            {isLoad ? (
                <NoData name={labelName} />
            ) : (
                <>
                    {mode === "card" ? (
                        <>
                            <Grid item xs={12}>
                                <LinearProgress
                                    sx={{
                                        opacity:
                                            isLoading || isFetching ? "1" : "0",
                                        transition: "0.4s",
                                    }}
                                    variant={"indeterminate"}
                                />
                            </Grid>

                            <Grid container spacing={2}>
                                {mappingRows(
                                    dummyRows || data?.data?.data || []
                                ).map((row, index) => (
                                    <Grid item xs={12} md={6}>
                                        {cardComponent({ row, index })}
                                    </Grid>
                                ))}
                            </Grid>
                            {/* {rowsData.map((_, index) => (
                                        <div
                                            style={{ height: "400px" }}
                                            key={index}
                                        >
                                            div - #{index}
                                        </div>
                                    ))} */}
                        </>
                    ) : (
                        <DataGrid
                            getRowId={(row) => row[rowId] || "id"}
                            loading={isLoading || isFetching}
                            rows={mappingRows(
                                dummyRows || data?.data?.data || []
                            )}
                            columns={_columns}
                            disableRowSelectionOnClick
                            slots={{
                                loadingOverlay: LinearProgress,
                            }}
                            sx={{
                                height: height || "41.4286rem",
                                border: "none",
                                ...sx,
                                "&  .MuiDataGrid-menuIcon,.MuiDataGrid-columnSeparator":
                                    {
                                        display: "none",
                                        cursor: "none",
                                    },
                                "& .MuiDataGrid-columnHeaders": {
                                    border: "1px #E2E8F0 solid",
                                    borderRadius: "0.6429rem",
                                    background: "#F8FAFC",
                                    color: "#64748B",
                                    fontSize: "1rem",
                                },
                                "& .MuiDataGrid-virtualScrollerRenderZone": {
                                    "& .MuiDataGrid-row": {
                                        borderBottom: "1px solid #EAECF0",
                                        background: "#FFFFFF",
                                        borderRadius: "1rem",
                                    },
                                    "& .MuiDataGrid-row.Mui-selected:hover": {
                                        borderBottom: "1px solid #EAECF0",
                                        backgroundColor: "#FFFFFF",
                                    },
                                },
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
};

const NoData = ({ name = "add in prop 'name'" }) => {
    return (
        <Box
            sx={{
                display: "grid",
                placeContent: "center",
                height: "70vh",
            }}
        >
            <Stack spacing={0} alignItems={"center"}>
                <NoRowsSvg />
                <Text variant={"h3"}>No {name} for now</Text>
            </Stack>
        </Box>
    );
};

export default CustomDataGrid;
