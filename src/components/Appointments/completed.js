import React from "react";
import {
    Paper,
    Checkbox,
    CircularProgress,
} from "@material-ui/core";
import DataTable from "react-data-table-component";
import TableStyles from "../../style/TableStyles";
import "../../style/TableStyles.scss"
import AppointmentApis from "../../apis/AppointmentApis";
import { AuthContext } from "../Auth/AuthContext";


class CompletedAppointments extends React.Component {
    static contextType = AuthContext
    constructor(props) {
        super(props);
        this.state = {
            appointments_data: [],
            is_loading: false,
        };
    }

    tableColumn = [
        {
            name: "Category",
            selector: "category",
            sortable: true,
        },
        {
            name: "Amount",
            selector: "amount",
            sortable: true,
        },
        {
            name: "Service Name",
            selector: "service_name",
            sortable: true,
        },
        {
            name: "Service Price",
            selector: "service_price",
            sortable: true,
        },
        {
            name: "Customer ID",
            selector: "customer_id",
            sortable: false,
        },
        {
            name: "Customer name",
            selector: "customer_name",
            sortable: false,
        },
        {
            name: "Employee ID",
            selector: "employee_id",
            sortable: false,
        },
        {
            name: "Assigned",
            selector: "assigned",
            cell: row => row.status.assigned,
            sortable: false,
        },
        {
            name: "In Progress",
            selector: "in_progress",
            cell: row => row.status.in_progress,
            sortable: false,
        },
        {
            name: "Completed",
            selector: "completed",
            cell: row => row.status.completed,
            sortable: false,
        }
    ];


    componentDidMount() {
        this.getAppointmentsData()
    }

    getAppointmentsData = () => {
        this.setState({
            is_loading: true
        })
        let params = ""
        AppointmentApis.getInCompletedAppointments(params).then(data => {
            this.setState({
                appointments_data: data,
                is_loading: false
            })
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
                        selectableRows
                        selectableRowsComponent={Checkbox}
                        onSelectedRowsChange={this.handleRowSelected}
                        onRowClicked={this.onRowClick}
                        clearSelectedRows={this.state.toggleCleared}
                    />
                </Paper>
            </>
        );
    }
}

export default CompletedAppointments;
