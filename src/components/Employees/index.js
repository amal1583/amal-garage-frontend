import React from "react";
import {
  Button, Paper, Checkbox, CircularProgress
} from "@material-ui/core";
import "./index.scss";
import DataTable from "react-data-table-component";
import TableStyles from "../../style/TableStyles";
import "../../style/TableStyles.scss"
import RowContextMenu from "./RowContextMenu";
import EmployeeApis from "../../apis/EmployeeApis";
import EmployeeDetail from "./employDetail";
import { AuthContext } from "../../components/Auth/AuthContext";


class Employees extends React.Component {
  static contextType = AuthContext
  constructor(props) {
    super(props);
    this.state = {
      employee_data: [],
      is_loading: false,
      employee_id: null,
      search: '',
      is_creation: false,
      detail_toggle: false,
    };
  }

  tableColumn = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Job Title",
      selector: "job_title",
      sortable: true,
    },
    /*{
      name: "Phone",
      selector: "phone",
      sortable: true,
    },*/
    {
      name: "Phone",
      selector: "phone",
      sortable: true,
    },
    {
      name: "Created Date",
      selector: "created_at",
      sortable: true,
    },
    {
      cell: (row) => (
        <RowContextMenu
          row={row}
          handleViewEdit={this.onRowClick}
          handleViewStatusChange={this.handleViewStatusChange}
          handleViewDelete={this.deleteEmployee}
        />
      ),

      allowOverflow: true,
      button: true,
      width: "70px",
    },
  ];


  componentDidMount() {
    this.getEmployeeData();
  }

  getEmployeeData = () => {
    this.setState({
      is_loading: true
    })
    let params = ""
    EmployeeApis.getEmployees(params).then(data => {
      this.setState({
        employee_data: data,
        is_loading: false
      })
    })
      .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
  };

  deleteEmployee = (row) => {
    this.setState({
      is_loading: true
    })
    let params = `?id=${row.phone}`
    EmployeeApis.deleteEmployee(params).then(data => {
      this.context.handleUpdate("successMsg", "employee deleted successfully")
      this.getEmployeeData()
    })
      .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
  };

  onRowClick = (row) => {
    this.setState({
      is_creation: false,
      employee_id: row.phone
    }, () => this.setState({ detail_toggle: true })
    )
  };

  createEmployee = () => {
    this.setState({
      is_creation: true,
      detail_toggle: true,
    })
  }

  handleUpdate = (key, val) => {
    this.setState({
      [key]: val,
    });
  };

  render() {
    // let {  } = this.state
    return (
      <>
        {
          this.state.detail_toggle ?
            <EmployeeDetail
              employee_id={this.state.employee_id}
              is_creation={this.state.is_creation}
              handleUpdate={this.handleUpdate}
              getEmployeeData={this.getEmployeeData}
            />
            :

            <Paper className="mt10">
              <DataTable
                className="table-wrapper"
                noHeader={true}
                subHeader
                subHeaderAlign="left"
                subHeaderComponent={<>
                  <div className="header-actions my20 df">
                    <span className="mh5">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.createEmployee}
                      >
                        Create Employee
                      </Button>
                    </span>
                  </div>
                </>}
                columns={this.tableColumn}
                data={this.state.employee_data}
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
        }
      </>
    );
  }
}

export default Employees;
