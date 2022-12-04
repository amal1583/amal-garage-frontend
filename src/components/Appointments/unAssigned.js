import React from "react";
import {
    Paper, Checkbox, CircularProgress, Dialog, DialogActions, DialogTitle, DialogContent,
    Button, DialogContentText, FormControl, Select, MenuItem
} from "@material-ui/core";
import DataTable from "react-data-table-component";
import TableStyles from "../../style/TableStyles";
import "../../style/TableStyles.scss"
import AppointmentApis from "../../apis/AppointmentApis";
import { AuthContext } from "../Auth/AuthContext";
import RowContextMenu from "./RowContextMenu";

class UnAssignedAppointments extends React.Component {
    static contextType = AuthContext
    constructor(props) {
        super(props);
        this.state = {
            appointments_data: [],
            is_loading: false,
            // open_employee_dialog: false,
            appointment_id: "",
            // employee_id: "",
            employee_data: []
        };
    }

    tableColumn = [
        {
            name: "Category",
            selector: "category",
            sortable: true,
        },
        {
            name: "Customer ID",
            selector: "customer_id",
            sortable: false,
        },
        // {
        //     name: "Employee ID",
        //     selector: "employee_id",
        //     sortable: false,
        // },
        {
            name: "Appoint Time",
            selector: "appoint_time",
            sortable: true,
        },
        {
            cell: (row) => (
                <RowContextMenu
                    row={row}
                    searchEmployee={this.searchEmployee}
                />
            ),

            allowOverflow: true,
            button: true,
            width: "70px",
        },
    ];


    componentDidMount() {
        this.getAppointmentsData()
    }

    handleUpdate = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    getAppointmentsData = () => {
        this.setState({
            is_loading: true
        })
        let params = ""
        AppointmentApis.getUnAssignedAppointments(params).then(data => {
            this.setState({
                appointments_data: data,
                is_loading: false
            })
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
    }

    searchEmployee = (row) => {
        this.setState({
            open_employee_dialog: true,
            dialog_loading: true,
            employee_id: "",
            appointment_id: row.id,
        })
        let params = `?appointment_id=${row.id}`
        AppointmentApis.getFreeEmployees(params).then(data => {
            this.setState({
                employee_data: data,
                dialog_loading: false
            })
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
    }

    closeDialog = () => {
        this.setState({
            appointment_id: "",
            employee_id: "",
            open_employee_dialog: false
        })
    }

    assignEmployee = () => {
        this.setState({
            dialog_loading: true
        })
        let data = {
            appointment_id: this.state.appointment_id,
            employee_id: this.state.employee_id
        }
        AppointmentApis.putAssignEmployees(data).then(data => {
            this.context.handleUpdate("successMsg", "employee assigned")
            this.setState({
                dialog_loading: false,
                open_employee_dialog: false
            })
            this.getAppointmentsData()
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
    }

    render() {
        return (
            <>
                <Paper className="mt10">
                    <DataTable
                        className="table-wrapper"
                        noHeader={true}
                        subHeader
                        subHeaderAlign="left"
                        subHeaderComponent={<>

                        </>}
                        columns={this.tableColumn}
                        data={this.state.appointments_data}
                        customTheme={TableStyles}
                        striped={true}
                        progressPending={this.state.is_loading}
                        progressComponent={<CircularProgress color="primary" />}
                        pagination
                        //selectableRows
                        //selectableRowsComponent={Checkbox}
                        onSelectedRowsChange={this.handleRowSelected}
                        onRowClicked={this.onRowClick}
                        clearSelectedRows={this.state.toggleCleared}
                    />
                </Paper>

                <Dialog
                    open={this.state.open_employee_dialog}
                    onClose={this.closeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle id="alert-dialog-title">{"Available Employees"}</DialogTitle>
                    {
                        this.state.dialog_loading ?
                            <div className="tc">
                                <CircularProgress color="primary" />
                            </div>
                            :
                            <>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        <div className="tc">
                                        <FormControl className="formControl" style={{ width: "300px" }}>
                                            {/* <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={this.state.employee_id}
                                                name="employee_id"
                                                onChange={(e) => this.handleUpdate(e.target.name, e.target.value)}
                                            >
                                                {
                                                    this.state.employee_data.map(employee => (
                                                        <MenuItem key="phone" value={employee.phone}>{employee.name}</MenuItem>
                                                    ))
                                                }
                                            </Select> */}
                                        </FormControl>
                                        </div>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.closeDialog} color="primary">Cancel</Button>
                                    <Button onClick={this.assignEmployee} color="primary" autoFocus>Assign</Button>
                                </DialogActions>
                            </>
                    }
                </Dialog>
            </>
        );
    }
}

export default UnAssignedAppointments;
