import React from "react";
import {
    Button,
    Paper,
    CircularProgress,
    TextField, Container, Grid, Checkbox, Typography
} from "@material-ui/core";
import "./index.scss";
import EmployeeApis from "../../apis/EmployeeApis";
import MySnackbar from "../Toast";
import { AuthContext } from "../../components/Auth/AuthContext";
import DataTable from "react-data-table-component";
import TableStyles from "../../style/TableStyles";
import "../../style/TableStyles.scss"


class EmployeeDetail extends React.Component {
    static contextType = AuthContext
    constructor(props) {
        super(props);
        this.state = {
            employee_data: {
                name: "",
                phone: "",
                cnic: "",
                address: "",
                DoB: "",
                job_title: "",
                password: ""
            },
            is_loading: false,
            message: "",
            openFlag: "",
            messageType: "",

            jobs_data: [],
            table_loading: false
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
            name: "Employee ID",
            selector: "employee_id",
            sortable: true,
        },
        {
            name: "Created Date",
            selector: "created_at",
            sortable: true,
        },
        {
            name: "Appoint Time",
            selector: "appoint_time",
            sortable: true,
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
            cell: row => row.status.in_progress,
            sortable: false,
        }
    ];


    componentDidMount() {
        if (this.props.is_creation === false) {
            this.getEmployeeData()
            this.getEmployeeJobs()
        }
    }

    getEmployeeData = () => {
        this.setState({
            is_loading: true
        })
        let params = `?id=${this.props.employee_id}`
        EmployeeApis.getEmployees(params).then(data => {
            this.setState({
                employee_data: data,
                is_loading: false
            })
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
    }

    getEmployeeJobs = () => {
        this.setState({
            table_loading: true
        })
        let params = `?id=${this.props.employee_id}`
        EmployeeApis.getEmployeeJobs(params).then(data => {
            this.setState({
                jobs_data: data,
                table_loading: false
            })
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ table_loading: false })))
    }


    createEmployee = () => {
        this.setState({
            is_loading: true
        })
        EmployeeApis.postEmployee(this.state.employee_data).then(data => {
            this.context.handleUpdate("successMsg", "employee created")
            this.props.handleUpdate("detail_toggle", false)
            this.props.getEmployeeData()
            this.setState({
                is_loading: false
            })
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
    }

    updateEmployee = () => {
        this.setState({
            is_loading: true
        })
        EmployeeApis.putEmployee(this.state.employee_data).then(data => {
            this.context.handleUpdate("successMsg", "employee updated")
            this.props.handleUpdate("detail_toggle", false)
            this.props.getEmployeeData()
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
    }

    handleUpdateFields = (key, value) => {
        let { employee_data } = this.state
        employee_data[key] = value
        this.setState({
            employee_data: employee_data,
        });
    };

    handleBack = () => {
        this.props.handleUpdate("detail_toggle", false)
    }

    render() {
        let { employee_data } = this.state
        let { is_creation } = this.props
        return (
            <>
                <Container maxWidth="md">
                    {
                        this.state.is_loading ?
                            <div className="tc">
                                <CircularProgress color="primary" />
                            </div>
                            :
                            <>
                                <Grid item xs={12}>
                                    {
                                        this.props.is_creation === true ?
                                            <Grid container direction="row" justify="space-between" alignItems="flex-start">
                                                <Grid item>
                                                    <h4>Create Employee</h4>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="standard" color="primary" onClick={this.handleBack} >Cancel</Button>
                                                    <Button variant="contained" color="primary" onClick={this.createEmployee}>Save</Button>
                                                </Grid>
                                            </Grid>
                                            :
                                            <Grid container direction="row" justify="space-between" alignItems="flex-start">
                                                <Grid item>
                                                    <h4>Update Employee</h4>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="standard" color="primary" onClick={this.handleBack} >Cancel</Button>
                                                    <Button variant="contained" color="primary" onClick={this.updateEmployee}>Save</Button>
                                                </Grid>
                                            </Grid>
                                    }
                                </Grid>
                                <Grid item xs={7}>
                                    <Paper className="mt10 detail-card">
                                        <Grid container direction="row" spacing={3}>
                                            <Grid item>
                                                <TextField id="standard-basic" label="Name" variant="standard" name="name" value={employee_data.name} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            <Grid item>
                                                <TextField type="number" disabled={is_creation === false} id="standard-basic" label="Phone" variant="standard" name="phone" value={employee_data.phone} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            <Grid item>
                                                <TextField type="number" id="standard-basic" label="CNIC" variant="standard" name="cnic" value={employee_data.cnic} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            <Grid item>
                                                <TextField id="standard-basic" label="Address" variant="standard" name="address" value={employee_data.address} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            <Grid item>
                                                <TextField id="standard-basic" label="Dob" variant="standard" name="DoB" value={employee_data.DoB} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            <Grid item>
                                                <TextField id="standard-basic" label="Job Title" variant="standard" name="job_title" value={employee_data.job_title} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            <Grid item>
                                                <TextField id="standard-basic" label="Password" variant="standard" name="password" value={employee_data.password} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </>
                    }
                </Container>

                {/* employee jobs */}
                <Typography style={{fontSize: '14px', fontWeight: '600'}}>Employee Jobs</Typography>
                <Paper className="mt10">
                    <DataTable
                        className="table-wrapper"
                        noHeader={true}
                        subHeader
                        subHeaderAlign="left"
                        subHeaderComponent={<>
                            <div className="header-actions my20 df">
                                <span className="mh5">
                                </span>
                            </div>
                        </>}
                        columns={this.tableColumn}
                        data={this.state.jobs_data}
                        customTheme={TableStyles}
                        striped={true}
                        progressPending={this.state.table_loading}
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

export default EmployeeDetail;
