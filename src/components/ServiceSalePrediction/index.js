import React from 'react';
import './index.scss';
import { TextField, Button, CircularProgress, Grid, Paper, Typography, Container } from '@material-ui/core';
import { AuthContext } from "../Auth/AuthContext";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import DashboardApis from '../../apis/DashboardApis';
import DataTable from "react-data-table-component";
import TableStyles from "../../style/TableStyles";
import "../../style/TableStyles.scss";
import ServicesPredictionApis from '../../apis/ServiceSalePrediction';

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

let updatedData = {
    labels: ['Home', 'Garage'],
    datasets: [
      {
        label: 'Services',
        data: [12, 19],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
        ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
        borderWidth: 1,
      },
    ],
  };

class ServiceSalePrediction extends React.Component {
    static contextType = AuthContext
    state = {
        previous_loading: false,
        future_loading: false,
        data: []
    }

    componentDidMount() {
        this.getPreviousSale()
        this.getFutureSale()
        this.getServiceDonutChartSale();
    }

    getPreviousSale = () => {
        this.setState({
            previous_loading: true
        })
        ServicesPredictionApis.getPreviousSale().then(data => {
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
        ServicesPredictionApis.getFutureSale().then(data => {
            future_graph_data.labels = data.map(duration => duration.date)
            future_graph_data.datasets[0].data = data.map(sale => sale.sale)
            this.setState({
                ...this.state,
                future_loading: false
            })
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ future_loading: false })))
    }

    getServiceDonutChartSale = ()=>{
        ServicesPredictionApis.getServiceDonutChartSale().then(data=>{
            this.setState({
                ...this.state,
                data:data
            })
        }).catch(error => this.context.handleCatch(error, () => this.setState({ data: [] })))

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
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
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
                        <Grid item xs={4}>
                            <Paper style={{minHeight:"93%"}} className='graph-card'>
                                {
                                    this.state.data.length!==0 
                                    &&
                                    <Doughnut data={this.state.data} />
                                    ||
                                    <div className="tc">
                                        <CircularProgress color="primary" />
                                    </div>  
                                }
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
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
export default ServiceSalePrediction;