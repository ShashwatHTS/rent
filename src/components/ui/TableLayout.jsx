import { Box } from "@mui/material";
import CustomSearch from "components/form/CustomSearch";
import StatusFilter from "components/form/StatusFilter";
import PageHeader from "components/ui/PageHeader";
import StackRow from "components/ui/StackRow";
import ServerPaginationDataGrid from "components/ui/tables/ServerPaginationDataGrid";
import React, { useState } from "react";
import CustomDataGrid from "./tables/CustomDataGrid";
import CustomMenu from "components/form/CustomMenu";
import CustomButton from "components/form/CustomButton";

const TableLayout = ({
    name,
    labelName,
    columns = [],
    url,
    rowId,
    query = {},
    height,
    pageSize = null,
    sx = {},
    dummyRows = null,
    noServerPagination = false,
}) => {
    const [search, setSearch] = useState("");

    return (
        <>
            <ServerPaginationDataGrid
                name={name}
                labelName={labelName}
                columns={columns}
                url={url}
                rowId={rowId}
                query={query}
                height={height}
                pageSize={pageSize}
                // height={"200px"}
                // pageSize={2}
                sx={sx}
                dummyRows={dummyRows}
                // mappingRows={(rows) =>
                //     rows.map((row) => {
                //         row.email = "email@.com";
                //         return row;
                //     })
                // }
                // noActions
                deleteUrl="https://wwww.delete.url/here"
                headerComponent={({ refetch }) => (
                    <PageHeader
                        showBack
                        secondary
                        title={`Items`}
                        subTitle={"View and update your store details"}
                        rightUi={
                            <StackRow gap={"0.7143rem"} center>
                                <CustomSearch
                                    placeholder="Search Item"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
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
            />
        </>
    );
};

export default TableLayout;
