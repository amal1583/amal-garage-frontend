import React from 'react';
import './index.scss';
import { TextField, Button, CircularProgress, Grid, Paper, Typography, Container } from '@material-ui/core';
import { AuthContext } from "../Auth/AuthContext";
import { Bar, Line } from "react-chartjs-2";
import DashboardApis from '../../apis/DashboardApis';
import DataTable from "react-data-table-component";
import TableStyles from "../../style/TableStyles";
import "../../style/TableStyles.scss"


const parts_graph_data = {  // for parts sale graph
    labels: [],
    datasets: [
        {
            data: [],
            label: "Sale",
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#8575FE',
            borderColor: '#8575FE',
            // borderWidth: 2,

        }
    ]
};

const parts_graph_options = {  // for parts sale graph
    responsive: false,
    legend: {
        display: false,
    },
    borderRadius: 5,
    scales: {
        xAxes: [{
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true,
                precision: 0
            }
        }]
    }
};



const services_graph_data = {  // for services sale graph
    labels: [],
    datasets: [
        {
            data: [],
            label: "Sale",
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#8575FE',
            borderColor: '#8575FE',
            // borderWidth: 2,

        }
    ]
};

const services_graph_options = {  // for services sale graph
    responsive: false,
    legend: {
        display: false,
    },
    borderRadius: 5,
    scales: {
        xAxes: [{
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true,
                precision: 0
            }
        }]
    }
};

class Dashboard extends React.Component {
    static contextType = AuthContext
    state = {
        start_date: '',
        end_date: '',
        parts_data: [],
        service_data: [],

        parts_loading: false,
        service_loading: false
    }

    partsColumn = [
        {
            name: "Name",
            selector: "name",
            sortable: true,
        },
        {
            name: "Price (PKR)",
            selector: "price",
            sortable: true,
        },
        {
            name: "Parts Sold",
            selector: "part_sold",
            sortable: true,
        }
    ];

    servicesColumn = [
        {
            name: "Name",
            selector: "name",
            sortable: true,
        },
        {
            name: "Price (PKR)",
            selector: "price",
            sortable: true,
        },
        {
            name: "Services Avail",
            selector: "service_avail",
            sortable: true,
        }
    ];

    componentDidMount() {
        this.setState({
            is_loading: true
        })
        DashboardApis.getTopSelling().then(data => {
            this.setState({
                parts_data: data['parts'],
                service_data: data['services'],
                is_loading: false
            })
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
    }

    startFetchingData = () => {
        this.getPartsData()
        this.getServicesData()
    }

    getPartsData = () => {
        this.setState({
            parts_loading: true
        })
        let { start_date, end_date } = this.state
        let params = `?start_date=${start_date}&end_date=${end_date}`
        DashboardApis.getPartRevenue(params).then(data => {
            parts_graph_data.labels = data.map(duration => duration.date)
            parts_graph_data.datasets[0].data = data.map(sale => sale.sale)
            this.setState({
                parts_loading: false
            })
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ parts_loading: false })))
    }

    getServicesData = () => {
        this.setState({
            service_loading: true
        })
        let { start_date, end_date } = this.state
        let params = `?start_date=${start_date}&end_date=${end_date}`
        DashboardApis.getServiceRevenue(params).then(data => {
            services_graph_data.labels = data.map(duration => duration.date)
            services_graph_data.datasets[0].data = data.map(sale => sale.sale)
            this.setState({
                service_loading: false
            })
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ service_loading: false })))
    }

    handleUpdate = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    render() {
        let { start_date, end_date } = this.state;

        return (
            <>
                <Grid container direction='row' spacing={2}>
                    <Grid item xs={6}>
                        <Typography className='heading'>Top Selling Parts</Typography>
                        <Paper className="mt10">
                            <DataTable
                                className="table-wrapper"
                                noHeader={true}
                                subHeader={false}
                                subHeaderAlign="left"
                                subHeaderComponent={<>
                                    <div className="header-actions my20 df">
                                    </div>
                                </>}
                                columns={this.partsColumn}
                                data={this.state.parts_data}
                                customTheme={TableStyles}
                                striped={true}
                                progressPending={this.state.is_loading}
                                progressComponent={<CircularProgress color="primary" />}
                                // pagination
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className='heading'>Top Selling Services</Typography>
                        <Paper className="mt10">
                            <DataTable
                                className="table-wrapper"
                                noHeader={true}
                                subHeader={false}
                                subHeaderAlign="left"
                                subHeaderComponent={<>
                                    <div className="header-actions my20 df">
                                    </div>
                                </>}
                                columns={this.servicesColumn}
                                data={this.state.service_data}
                                customTheme={TableStyles}
                                striped={true}
                                progressPending={this.state.is_loading}
                                progressComponent={<CircularProgress color="primary" />}
                                // pagination
                            />
                        </Paper>
                    </Grid>
                </Grid>

                <Container maxWidth="sm" className='mt30'>
                    <Grid container direction='row' spacing={5}>
                        <Grid item>
                            <TextField
                                id="date"
                                label="Start Date"
                                type="date"
                                name="start_date"
                                value={start_date}
                                onChange={(e) => this.handleUpdate(e.target.name, e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="date"
                                label="End Date"
                                type="date"
                                name="end_date"
                                value={end_date}
                                onChange={(e) => this.handleUpdate(e.target.name, e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant='contained' color='primary' onClick={this.startFetchingData}>Get Data</Button>
                        </Grid>
                    </Grid>
                </Container>

                <div className='mt30'>
                    <Grid container direction='row' spacing={3}>
                        <Grid item xs={6}>
                            <Paper className='graph-card'>
                                {
                                    this.state.parts_loading ?
                                        <div className="tc">
                                            <CircularProgress color="primary" />
                                        </div>
                                        :
                                        <>
                                            <Typography className="heading">Parts Sale Data</Typography>
                                            <Line height={200} width={570} data={parts_graph_data} options={parts_graph_options} />
                                        </>
                                }
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className='graph-card'>
                                {
                                    this.state.service_loading ?
                                        <div className="tc">
                                            <CircularProgress color="primary" />
                                        </div>
                                        :
                                        <>
                                            <Typography className="heading">Services Sale Data</Typography>
                                            <Line height={200} width={570} data={services_graph_data} options={services_graph_options} />
                                        </>
                                }
                            </Paper>

                        </Grid>
                    </Grid>
                </div>
            </>
        )
    }
}
export default Dashboard;