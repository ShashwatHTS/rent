import { Grid } from "@mui/material";
import CustomAutoComplete from "components/form/CustomAutoComplete";
import CustomButton from "components/form/CustomButton";
import CustomCheckbox from "components/form/CustomCheckbox";
import CustomImageInput from "components/form/CustomImageInput";
import { CustomRadioButton } from "components/form/CustomRadioButton";
import CustomSelectFormik from "components/form/CustomSelect";
import CustomSwitch from "components/form/CustomSwitch";
import CustomTextField from "components/form/CustomTextField";
import DateRangePicker, {
    CustomDatePicker,
} from "components/form/DateRangePicker";
import Text from "components/typography/Text";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

const FormInputs = () => {
    const initialValues = {
        name: "",
        phone: "",
        age: "",
        check: true,
    };
    const handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(false);
        // Add your form submission logic here
    };
    const [state, setState] = useState(0);
  

    return (
        <div>
            <Text variant={"h2"}>Formik + Basic</Text>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <Grid
                        container
                        spacing={2}
                        my={2}
                        p={2}
                        sx={{
                            border: "1px grey solid",
                            borderRadius: "0.8571rem",
                        }}
                    >
                        <Grid item xs={6}>
                            <CustomTextField name="name" label="Name" />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField name="phone" label="Phone" />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomSelectFormik
                                name="age"
                                label="Age"
                                menuList={[
                                    {
                                        id: "1",
                                        value: "MALE",
                                        name: "Male",
                                    },
                                    {
                                        id: "2",
                                        value: "FEMALE",
                                        name: "Female",
                                    },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomAutoComplete
                                isClearDisabled
                                label="AutoComplete"
                                name="see"
                                menuList={[
                                    { id: 1, value: 1, name: "One" },
                                    { id: 2, value: 2, name: "Two" },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomCheckbox name="check" label="is Checked ?" />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomRadioButton
                                name="age"
                                label="Gender"
                                menuList={[
                                    {
                                        id: "1",
                                        value: "MALE",
                                        name: "Male",
                                    },
                                    {
                                        id: "2",
                                        value: "FEMALE",
                                        name: "Female",
                                    },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomButton type="submit">Submit</CustomButton>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
            <Text variant={"h2"}>Basic</Text>

            <Grid
                container
                spacing={2}
                my={2}
                p={2}
                sx={{
                    border: "1px grey solid",
                    borderRadius: "0.8571rem",
                }}
            >
                <Grid item xs={6}>
                    <DateRangePicker
                    // setFrom={setStartDate}
                    // setTo={setEndDate}
                    // fromDate={startDate}
                    // toDate={endDate}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomDatePicker
                    // setFrom={setStartDate}
                    // setTo={setEndDate}
                    // fromDate={startDate}
                    // toDate={endDate}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField name="name" label="Name" notFormik />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField name="phone" label="Phone" notFormik />
                </Grid>
                <Grid item xs={6}>
                    <CustomSelectFormik
                        notFormik
                        name="age"
                        // value={state}
                        // onChange={(e) => setState(e.target.value)}
                        label="Age"
                        menuList={[
                            {
                                id: "1",
                                value: "MALE",
                                name: "Male",
                            },
                            {
                                id: "2",
                                value: "FEMALE",
                                name: "Female",
                            },
                        ]}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomAutoComplete
                        notFormik
                        isClearDisabled
                        value={state}
                        onChange={(e) => setState(e)}
                        label="AutoComplete"
                        name="see"
                        menuList={[
                            { value: 1, label: "One" },
                            { value: 2, label: "Two" },
                        ]}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomCheckbox
                        notFormik
                        name="check"
                        label="isCHecked ?"
                        // checked={state}
                        // onChange={(e) => {
                        // 	console.log(e.target.checked);
                        // 	setState(e.target.checked);
                        // }}
                    />
                    <CustomSwitch label="Toggle" />
                </Grid>
                <Grid item xs={6}>
                    <CustomRadioButton
                        notFormik
                        name="age"
                        // value={state}
                        // onChange={(e) => setState(e.target.value)}
                        label="Gender"
                        menuList={[
                            {
                                id: "1",
                                value: "MALE",
                                name: "Male",
                            },
                            {
                                id: "2",
                                value: "FEMALE",
                                name: "Female",
                            },
                        ]}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomImageInput onChange={(e) => console.log(e)} />
                </Grid>
                <Grid item xs={12}>
                    <CustomButton type="submit">Submit</CustomButton>
                </Grid>
            </Grid>
        </div>
    );
};

export default FormInputs;
