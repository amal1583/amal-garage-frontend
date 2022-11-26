import React from "react";
import {
  Button,
  Paper,
  Checkbox,
  CircularProgress,
  TextField, IconButton
} from "@material-ui/core";
import "./index.scss";
import DataTable from "react-data-table-component";
import TableStyles from "../../style/TableStyles";
import "../../style/TableStyles.scss"
import RowContextMenu from "./RowContextMenu";
import PartsApis from "../../apis/PartsApis";
import PartDetail from "./partDetail";
import { AuthContext } from "../../components/Auth/AuthContext";


class Parts extends React.Component {
  static contextType = AuthContext
  constructor(props) {
    super(props);
    this.state = {
      parts_data: [],
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
      name: "Price",
      selector: "price",
      sortable: true,
    },
    {
      name: "Quantity",
      selector: "quantity",
      sortable: true,
    },
    {
      name: "Parts Sold",
      selector: "part_sold",
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
          editPart={this.onRowClick}
          deletePart={this.deletePart}
        />
      ),

      allowOverflow: true,
      button: true,
      width: "70px",
    },
  ];


  componentDidMount() {
    this.getPartsData()
  }

  getPartsData = () => {
    this.setState({
      is_loading: true
    })
    let params = ""
    PartsApis.getParts(params).then(data => {
      this.setState({
        parts_data: data,
        is_loading: false
      })
    })
      .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
  };

  deletePart = (row) => {
    this.setState({
      is_loading: true
    })
    let params = `?id=${encodeURIComponent(row.id)}`
    PartsApis.deleteParts(params).then(data => {
      this.context.handleUpdate("successMsg", "part deleted successfully")
      this.getPartsData()
    })
      .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
  };

  onRowClick = (row) => {
    this.setState({
      is_creation: false,
      part_id: row.id
    }, () => this.setState({ detail_toggle: true })
    )
  };

  createPart = () => {
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
            <PartDetail
              part_id={this.state.part_id}
              is_creation={this.state.is_creation}
              handleUpdate={this.handleUpdate}
              getPartsData={this.getPartsData}
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
                        onClick={this.createPart}
                      >
                        Create Part
                      </Button>
                    </span>
                  </div>
                </>}
                columns={this.tableColumn}
                data={this.state.parts_data}
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

export default Parts;
