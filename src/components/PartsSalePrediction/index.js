import React from 'react';
import './index.scss';
import { TextField, Button, CircularProgress, Grid, Paper, Typography, Container } from '@material-ui/core';
import { AuthContext } from "../Auth/AuthContext";
import { Bar, Line } from "react-chartjs-2";
import DashboardApis from '../../apis/DashboardApis';
import DataTable from "react-data-table-component";
import TableStyles from "../../style/TableStyles";
import "../../style/TableStyles.scss";
import PartsPredictionApis from '../../apis/PartsSalePrediction';


const previous_graph_data = {
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

const previous_graph_options = {
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



const future_graph_data = {
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

const future_graph_options = {
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

class PartsSalePrediction extends React.Component {
    static contextType = AuthContext
    state = {
        previous_loading: false,
        future_loading: false
    }

    componentDidMount() {
        this.getPreviousSale()
        this.getFutureSale()
    }

    getPreviousSale = () => {
        this.setState({
            previous_loading: true
        })
        PartsPredictionApis.getPreviousSale().then(data => {
            previous_graph_data.labels = data.map(duration => duration.date)
            previous_graph_data.datasets[0].data = data.map(sale => sale.sale)
            this.setState({
                previous_loading: false
            })
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ previous_loading: false })))
    }

    getFutureSale = () => {
        this.setState({
            future_loading: true
        })
        PartsPredictionApis.getFutureSale().then(data => {
            future_graph_data.labels = data.map(duration => duration.date)
            future_graph_data.datasets[0].data = data.map(sale => sale.sale)
            this.setState({
                future_loading: false
            })
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ future_loading: false })))
    }

    handleUpdate = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    render() {

        return (
            <>
                <div className='mt30'>
                    <Grid container direction='column' spacing={3}>
                        <Grid item>
                            <Paper className='graph-card'>
                                {
                                    this.state.previous_loading ?
                                        <div className="tc">
                                            <CircularProgress color="primary" />
                                        </div>
                                        :
                                        <>
                                            <Typography className="heading">Previous Sale</Typography>
                                            <Line height={200} width={570} data={previous_graph_data} options={previous_graph_options} />
                                        </>
                                }
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper className='graph-card'>
                                {
                                    this.state.future_loading ?
                                        <div className="tc">
                                            <CircularProgress color="primary" />
                                        </div>
                                        :
                                        <>
                                            <Typography className="heading">Future Prediction</Typography>
                                            <Line height={200} width={570} data={future_graph_data} options={future_graph_options} />
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
export default PartsSalePrediction;