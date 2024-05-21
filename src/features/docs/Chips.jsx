import Text from "components/typography/Text";
import CustomChip from "components/ui/CustomChip";
import StackRow from "components/ui/StackRow";
import React from "react";

const Chips = () => {
    return (
        <div>
            <Text variant={"h2"}>Chips</Text>
            <StackRow sx={{ mt: 2 }}>
                <CustomChip label="Chip (default)" />
                <CustomChip theme="failed" label="failed" />
                <CustomChip theme="pending" label="Pending" />
                <CustomChip theme="gray" label="gray" />
                <CustomChip theme="blue" label="blue" />
                <CustomChip theme="orange" label="orange" />
                <CustomChip label="Dotted" dotted />
            </StackRow>
        </div>
    );
};

export default Chips;
