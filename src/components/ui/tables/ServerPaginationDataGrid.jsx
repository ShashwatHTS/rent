import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Box, LinearProgress, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import CustomDialog from "../CustomDialog";
import StackRow from "../StackRow";
import CustomButton from "components/form/CustomButton";
import CustomMenu from "components/form/CustomMenu";
import EditSvg from "assets/svgs/EditSvg";
import DeleteSvg from "assets/svgs/DeleteSvg";
import NoRowsSvg from "assets/svgs/NoRowsSvg";
import Text from "components/typography/Text";
import { errorToast, successToast } from "utils/toast";
import PaperBox from "../PaperBox";
import { Grid } from "../../../../node_modules/@mui/material/index";
import InfiniteScroll from "../../../../node_modules/react-infinite-scroll-component/dist/index";
import Title from "components/typography/Title";
/**
 * DOCUMENTATION: Props for ServerPaginationDataGrid
 *
 * name {string} - (Required) Used for caching with recognition.
 *
 * labelName {string} - Adds a label to the data.
 *
 * columns {array} - Represents the headers of the table.
 *
 * URL {string} - Used to fetch data for the table.
 *
 * rowId {string} - Distinguishes rows from each other to perform various tasks.
 *
 * query {object} - Pass an object here to include a query in the URL for data fetching.
 *
 * height {string} - Specifies the height of the table.
 *
 * sx {object} - Styling object to customize the appearance of the table.
 *
 * dummyRows {array} - Dummy rows used to check if everything is working fine.
 *
 * noActions {boolean} - If set to true, disables actions like edit or delete.
 *
 * deleteUrl {string} - Required URL if you want to delete a row from the table.
 *
 * mappingRows {function} - Function to map and transform data. Useful for customizing data fields.
 *   Example: (data) => data
 *
 * pageSize {number} - Default is 10. If you want to change the number of rows per page, specify it here.
 *   Example: pageSize={20}
 *
 * headerComponent {function} - Function to render a custom header component. Default is an empty function.
 */

const ServerPaginationDataGrid = ({
    name,
    labelName,
    columns,
    url,
    rowId = "id",
    query: _query = null,
    sx = {},
    height,
    dummyRows,
    noActions = false,
    deleteUrl = "",
    mappingRows = (data) => data,
    pageSize = null,
    headerComponent = () => {},
    mode = "table",
    cardComponent = () => <PaperBox>Add cardComponent prop</PaperBox>,
}) => {
    const navigate = useNavigate();
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });
    useEffect(() => {
        if (pageSize)
            setPaginationModel({
                page: 0,
                pageSize,
            });
    }, [pageSize]);

    const [rowCount, setRowCount] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [rowsData, setRowsData] = React.useState([]);
    useEffect(() => {
        setRowsData([]);
        setPaginationModel({
            page: 0,
            pageSize,
        });
    }, [name, _query, mode]);
    const [row, setRow] = React.useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const URL = `${url}?page=${paginationModel.page + 1}&perPage=${
        pageSize || paginationModel.pageSize
    }&${queryString.stringify(_query || {})}`;
    const { isLoading, isFetching, refetch } = useQuery(
        [name, paginationModel.page, _query, mode],
        () => {
            return axios.get(URL);
        },
        {
            onSuccess: (res) => {
                setRowCount(res?.data?.meta?.totalCount);
                setTotalPages(res?.data?.meta?.totalPages);
                setRows(res?.data?.data);
                if (mode === "card")
                    setRowsData((data) => [...data, ...res?.data?.data]);
            },
        }
    );
    const { mutate } = useMutation(
        () => {
            return axios.post(deleteUrl + row[rowId]);
        },
        {
            onSuccess: () => {
                refetch();
                setShowDeleteModal(false);
                successToast("Deleted Successfully");
            },
            onError: () => {
                errorToast("Something Went Wrong");
            },
        }
    );

    const _menuList = [
        {
            id: 1,
            icon: <EditSvg />,
            label: "Edit",
        },
    ];
    if (deleteUrl) {
        _menuList.push({
            id: 2,
            icon: <DeleteSvg />,
            label: "Delete",
        });
    }
    const isDataFetching = isLoading || isFetching;
    const isLoad =
        !isDataFetching && (rows?.length === 0 || dummyRows?.length === 0);

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
                    menuList={_menuList}
                    menuOnClick={({ id: _id }) => {
                        if (_id === 1) {
                            navigate(String(row[rowId]));
                        }
                        if (_id === 2) {
                            setShowDeleteModal(true);
                            setRow(row);
                        }
                    }}
                />
            ),
        });
    }
    const _sx = {
        height: height || "42.8571rem",
        border: "none",
        ...sx,
        "&  .MuiDataGrid-menuIcon,.MuiDataGrid-columnSeparator": {
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
    };

    return (
        <div style={{}}>
            {headerComponent({ refetch, rowCount })}
            {isLoad ? (
                <NoData name={labelName} />
            ) : (
                <>
                    {mode === "card" ? (
                        <>
                            <Grid item xs={12}>
                                <LinearProgress
                                    sx={{
                                        opacity: isDataFetching ? "1" : "0",
                                        transition: "0.4s",
                                    }}
                                    variant={"indeterminate"}
                                />
                            </Grid>

                            <div
                                id="scrollableDiv"
                                style={{
                                    height: height || "50rem",
                                    overflow: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <InfiniteScroll
                                    dataLength={rowsData.length}
                                    next={() => {
                                        setPaginationModel((prevObj) => ({
                                            ...prevObj,
                                            page: prevObj.page + 1,
                                        }));
                                    }}
                                    hasMore={Boolean(
                                        rowCount > rowsData.length
                                    )}
                                    loader={
                                        <h4>
                                            Loading (page:{" "}
                                            {paginationModel.page + 1}/
                                            {totalPages}){rowsData.length}/
                                            {rowCount}...
                                        </h4>
                                    }
                                    scrollableTarget="scrollableDiv"
                                >
                                    <Grid container spacing={2}>
                                        {rowsData.map((row, index) => (
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
                                </InfiniteScroll>
                            </div>
                        </>
                    ) : (
                        <DataGrid
                            disableRowSelectionOnClick
                            getRowId={(row) => row[rowId]}
                            slots={{
                                loadingOverlay: LinearProgress,
                            }}
                            localeText={{
                                noRowsLabel: labelName
                                    ? `No ${labelName} available`
                                    : "No Data Available",
                            }}
                            loading={isDataFetching}
                            sx={_sx}
                            rows={mappingRows(dummyRows || rows || [])}
                            columns={_columns}
                            paginationMode="server"
                            rowCount={rowCount || 0}
                            pageSizeOptions={[10]}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                        />
                    )}
                    {showDeleteModal && (
                        <CustomDialog
                            open={showDeleteModal}
                            onClose={() => setShowDeleteModal(false)}
                            height="35.7143rem"
                        >
                            <Box>
                                <Stack gap={"1rem"}>
                                    <Text>
                                        Are you sure do you want to delete?
                                    </Text>
                                    <StackRow isFlexEnd>
                                        <CustomButton
                                            variant="outlined"
                                            sx={{
                                                color: "var(--gray-700, #334155)",
                                                fontFamily: "Inter",
                                                fontSize: "1rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "1.42857rem",
                                                letterSpacing: "-0.01rem",
                                                borderRadius: "0.57143rem",
                                                border: "1px solid var(--gray-300, #CBD5E1)",
                                                background:
                                                    "var(--generic-white, #FFF)",
                                                marginRight: "1rem",
                                            }}
                                            onClick={() =>
                                                setShowDeleteModal(false)
                                            }
                                        >
                                            Cancel
                                        </CustomButton>
                                        <CustomButton
                                            sx={{
                                                borderRadius: "0.57143rem",
                                                background:
                                                    "var(--primary-600, #4F46E5)",
                                                boxShadow:
                                                    "0px 1px 2px 0px rgba(15, 23, 42, 0.06)",
                                                color: "var(--generic-white, #FFF)",
                                                fontFamily: "Inter",
                                                fontSize: "1rem",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "1.42857rem",
                                                letterSpacing: "-0.01rem",
                                            }}
                                            onClick={() => mutate()}
                                        >
                                            Delete
                                        </CustomButton>
                                    </StackRow>
                                </Stack>
                            </Box>
                        </CustomDialog>
                    )}
                </>
            )}
        </div>
    );
};

const NoData = ({ name = "Item" }) => {
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
                <Text variant={"h3"}>Create your first {name} now</Text>
            </Stack>
        </Box>
    );
};

export default ServerPaginationDataGrid;
