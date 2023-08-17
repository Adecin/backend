import { useRouter } from "next/router";
import DynamicTable from "../table/dynamicTable";
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText } from "@mui/material";
import React from "react";

export default function UserRoleComp(props: any) {
    const router = useRouter();

    const Access_Checks = () => {

        const [state, setState] = React.useState({
            view: true,
            edit: false,
            del: false,
            print: true
        });
        const { view, edit, del, print } = state;

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setState({
                ...state,
                [event.target.name]: event.target.checked,
            });
        };


        return (
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={view} onChange={handleChange} name="View" />
                        }
                        label="View"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={edit} onChange={handleChange} name="Edit" />
                        }
                        label="Edit"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={del} onChange={handleChange} name="Delete" />
                        }
                        label="Delete"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={print} onChange={handleChange} name="Print" />
                        }
                        label="Print"
                    />
                </FormGroup>
            </FormControl>
        )
    }

    const data = [
        {
            jon_tittle: "Admin",
            farmer_master: (<Access_Checks />),
            Farmerprofile: (<Access_Checks />),
            field_officer_master: (<Access_Checks />),
            field_officer_profile: (<Access_Checks />),
            stp_survey_data: (<Access_Checks />),
            crop_monitoring_survey_data: (<Access_Checks />),
        },
        {
            jon_tittle: "Regional Manager",
            farmer_master: (<Access_Checks />),
            Farmerprofile: (<Access_Checks />),
            field_officer_master: (<Access_Checks />),
            field_officer_profile: (<Access_Checks />),
            stp_survey_data: (<Access_Checks />),
            crop_monitoring_survey_data: (<Access_Checks />),
        }, {
            jon_tittle: "District Manager",
            farmer_master: (<Access_Checks />),
            Farmerprofile: (<Access_Checks />),
            field_officer_master: (<Access_Checks />),
            field_officer_profile: (<Access_Checks />),
            stp_survey_data: (<Access_Checks />),
            crop_monitoring_survey_data: (<Access_Checks />),
        },
    ];

    return (
        <div>
            <DynamicTable data={data} classes={` text-center`} />
        </div>
    )
}