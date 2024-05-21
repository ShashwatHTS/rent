import CustomButton from "components/form/CustomButton";
import CustomMenu from "components/form/CustomMenu";
import CustomSearch from "components/form/CustomSearch";
import Text from "components/typography/Text";
import PageHeader from "components/ui/PageHeader";
import StackRow from "components/ui/StackRow";
import TableLayout from "components/ui/TableLayout";
import CustomDataGrid from "components/ui/tables/CustomDataGrid";
import ServerPaginationDataGrid from "components/ui/tables/ServerPaginationDataGrid";
import { useState } from "react";
import {
    ButtonGroup,
    Tooltip,
} from "../../../node_modules/@mui/material/index";
import PaperBox from "components/ui/PaperBox";
import {
    TableRows,
    ViewAgenda,
} from "../../../node_modules/@mui/icons-material/index";

const Tables = () => {
    const columns = [
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            minWidth: 180,
            sortable: false,
        },
        {
            field: "mobile",
            headerName: "Mobile Number",
            flex: 1,
            minWidth: 180,
            sortable: false,
            renderCell: ({ row }) => (
                <p>{row.mobile || row.parentCategoryName}</p>
            ),
        },
        {
            field: "status",
            headerName: "Campus",
            flex: 1,
            minWidth: 180,
            sortable: false,
            renderCell: ({ row }) => <p>{row.campusname}</p>,
        },
        {
            field: "city",
            headerName: "City",
            flex: 0,
            minWidth: 100,
            sortable: false,
            renderCell: ({ row }) => <p>{row.city}</p>,
        },
    ];
    const [search, setSearch] = useState("");
    const [mode, setMode] = useState("table");

    return (
        <div>
            <br />
            <ServerPaginationDataGrid
                name={"customer-table"}
                labelName={"Customers"}
                columns={columns}
                // dummyRows={[
                //     { customerauthuid: 1, city: "Pune" },
                //     { customerauthuid: 2, city: "Kanpur" },
                // ]}
                url={
                    "https://mealpe-testing-api.onrender.com/customer/getCustomer/08d06cbe-27d1-4f4b-87e8-38e341622625"
                }
                rowId={"customerauthuid"}
                query={{
                    isSort: true,
                    searchText: search,
                    startDate: "12-12-20",
                }}
                pageSize={10}
                // height="400px"
                // sx={{
                //     backgroundColor: "royalblue",
                // }}
                // mappingRows={(rows) =>
                //     rows.map((row) => {
                //         row.email = "email@.com";
                //         return row;
                //     })
                // }
                // noActions
                deleteUrl="https://wwww.delete.url/here"
                headerComponent={({ refetch, rowCount }) => (
                    <PageHeader
                        showBack
                        secondary
                        title={`Items (${rowCount})`}
                        subTitle={"View and update your store details"}
                        rightUi={
                            <StackRow gap={"0.7143rem"} center>
                                <CustomSearch
                                    placeholder="Search Item"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Tooltip
                                    title={`Selected Mode: ${
                                        mode === "table" ? "Table" : "Card"
                                    }`}
                                >
                                    <ButtonGroup variant="outlined">
                                        <CustomButton
                                            onClick={() => setMode("table")}
                                            variant={
                                                mode === "table"
                                                    ? "contained"
                                                    : "outlined"
                                            }
                                        >
                                            <TableRows />
                                        </CustomButton>
                                        <CustomButton
                                            onClick={() => setMode("card")}
                                            variant={
                                                mode !== "table"
                                                    ? "contained"
                                                    : "outlined"
                                            }
                                        >
                                            <ViewAgenda />
                                        </CustomButton>
                                    </ButtonGroup>
                                </Tooltip>

                                <CustomMenu
                                    stepGuide
                                    className="menu"
                                    width={"15.7143rem"}
                                    menuList={[
                                        {
                                            id: 3,
                                            label: "Add items",
                                            className: "custom-menu-item-3",
                                        },
                                        {
                                            id: 1,
                                            label: "Fetch Menu From Petpooja",
                                            className: "custom-menu-item-1",
                                        },
                                        {
                                            id: 4,
                                            label: "Upload Excel",
                                            className: "custom-menu-item-4",
                                        },
                                    ]}
                                    onClick={() => true}
                                    menuOnClick={({ label, id: _id }) => {}}
                                />
                                <CustomButton onClick={() => refetch()}>
                                    Refetch Items
                                </CustomButton>
                            </StackRow>
                        }
                    />
                )}
                mode={mode}
                cardComponent={({ row }) => (
                    <PaperBox
                        shadowed
                        key={row.customerauthuid}
                        sx={{ height: "17.8571rem" }}
                    >
                        {row.customerauthuid}: {row.city}
                    </PaperBox>
                )}
            />
            {/* <CustomDataGrid
                name={"customer-table"}
                labelName={"Customers"}
                columns={columns}
                url="https://mealpe-testing-api.onrender.com/outlet/menu/getParentCategory/08d06cbe-27d1-4f4b-87e8-38e341622625"
                rowId={"customerauthuid"}
                query={{ searchText: search }}
                // height={"200px"}
                // sx={{
                //     backgroundColor: "royalblue",
                // }}
                // dummyRows={[
                //     { customerauthuid: 1, city: "Pune" },
                //     { customerauthuid: 2, city: "Kanpur" },
                // ]}
                mappingRows={(rows) =>
                    rows
                        .map((row) => {
                            row.email = "email@.com";
                            return row;
                        })
                        .filter((row) =>
                            row?.parentCategoryName?.includes(search)
                        )
                }
                noActions
                deleteUrl="https://wwww.delete.url/here"
                getLoading={(isLoading) => console.log({ isLoading })}
                getData={(data) => console.log({ data })}
                headerComponent={({ refetch, rowCount }) => (
                    <PageHeader
                        showBack
                        secondary
                        title={`Items (${rowCount})`}
                        subTitle={"View and update your store details"}
                        rightUi={
                            <StackRow gap={"0.7143rem"} center>
                                <CustomSearch
                                    placeholder="Search Item"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Tooltip
                                    title={`Selected Mode: ${
                                        mode === "table" ? "Table" : "Card"
                                    }`}
                                >
                                    <ButtonGroup variant="outlined">
                                        <CustomButton
                                            onClick={() => setMode("table")}
                                            variant={
                                                mode === "table"
                                                    ? "contained"
                                                    : "outlined"
                                            }
                                        >
                                            <TableRows />
                                        </CustomButton>
                                        <CustomButton
                                            onClick={() => setMode("card")}
                                            variant={
                                                mode !== "table"
                                                    ? "contained"
                                                    : "outlined"
                                            }
                                        >
                                            <ViewAgenda />
                                        </CustomButton>
                                    </ButtonGroup>
                                </Tooltip>

                                <CustomMenu
                                    stepGuide
                                    className="menu"
                                    width={"15.7143rem"}
                                    menuList={[
                                        {
                                            id: 3,
                                            label: "Add items",
                                            className: "custom-menu-item-3",
                                        },
                                        {
                                            id: 1,
                                            label: "Fetch Menu From Petpooja",
                                            className: "custom-menu-item-1",
                                        },
                                        {
                                            id: 4,
                                            label: "Upload Excel",
                                            className: "custom-menu-item-4",
                                        },
                                    ]}
                                    onClick={() => true}
                                    menuOnClick={({ label, id: _id }) => {}}
                                />
                                <CustomButton onClick={() => refetch()}>
                                    Refetch Items
                                </CustomButton>
                            </StackRow>
                        }
                    />
                )}
                mode={mode}
                cardComponent={({ row }) => (
                    <PaperBox shadowed key={row.email} sx={{ height: "250px" }}>
                        {row.email}: {row.city}
                    </PaperBox>
                )}
            /> */}
        </div>
    );
};

export default Tables;

// if (1)
// return (
//     <div>
//         <Text variant={"h4"}>With ServerPaginationDataGrid</Text>
//         <br />
//         <TableLayout
//             name={"customer-table"}
//             labelName={"Customers"}
//             columns={columns}
//             url={
//                 "https://mealpe-testing-api.onrender.com/customer/getCustomer/08d06cbe-27d1-4f4b-87e8-38e341622625"
//             }
//             rowId={"customerauthuid"}
//             query={{
//                 sort: "asc",
//                 searchText: search,
//             }}
//             // height={"400px"}
//             pageSize={2}
//             sx={{
//                 backgroundColor: "royalblue",
//             }}
//             dummyRows={[
//                 { customerauthuid: 1, city: "Pune" },
//                 { customerauthuid: 2, city: "Kanpur" },
//             ]}
//         />
//     </div>
// );
