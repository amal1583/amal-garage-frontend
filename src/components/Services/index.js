import React from "react";
import {
  Button, Paper, Checkbox, CircularProgress, TextField
} from "@material-ui/core";
import "./index.scss";
import DataTable from "react-data-table-component";
import TableStyles from "../../style/TableStyles";
import "../../style/TableStyles.scss"
import RowContextMenu from "./RowContextMenu";
import { AuthContext } from "../../components/Auth/AuthContext";
import ServiceApis from "../../apis/ServiceApis";
import ServiceDetail from './serviceDetail';


class Services extends React.Component {
  static contextType = AuthContext
  constructor(props) {
    super(props);
    this.state = {
      services_data: [],
      is_loading: false,
      service_id: null,
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
      name: "Price",
      selector: "price",
      sortable: true,
    },
    {
      name: "Service Avail",
      selector: "service_avail",
      sortable: true,
    },
    {
      name: "Estimated Time",
      selector: "estimated_time",
      sortable: true,
    },
    {
      cell: (row) => (
        <RowContextMenu
          row={row}
          editService={this.onRowClick}
          deleteService={this.deleteService}
        />
      ),
      allowOverflow: true,
      button: true,
      width: "70px",
    },
  ];


  componentDidMount() {
    this.getServicesData()
  }

  getServicesData = () => {
    this.setState({
      is_loading: true
    })
    let params = ""
    ServiceApis.getServices(params).then(data => {
      this.setState({
        services_data: data,
        is_loading: false
      })
    })
      .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
  };


  deleteService = (row) => {
    this.setState({
      is_loading: true
    })
    let params = `?id=${row.id}`
    ServiceApis.deleteService(params).then((data) => {
      this.context.handleUpdate("successMsg", "record deleted")
      this.getServicesData()
      this.setState({
        is_loading: false
      });
    })
      .catch(error => this.context.handleCatchWithFieldsV2(error, () => this.setState({ tableLoading: false })))
  };


  onRowClick = (row) => {
    this.setState({
      is_creation: false,
      service_id: row.id
    }, () => this.setState({ detail_toggle: true })
    )
  };

  createService = () => {
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
    return (
      <>
        {
          this.state.detail_toggle ?
            <ServiceDetail
              service_id={this.state.service_id}
              is_creation={this.state.is_creation}
              handleUpdate={this.handleUpdate}
              getServicesData={this.getServicesData}
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
                        onClick={this.createService}
                      >
                        Create Service
                      </Button>
                    </span>
                  </div>
                </>}
                columns={this.tableColumn}
                data={this.state.services_data}
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

export default Services;
