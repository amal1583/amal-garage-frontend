import React from 'react';
import './index.scss';
import { Container, Typography, Grid, Paper, CircularProgress } from '@material-ui/core';
import { AuthContext } from "../Auth/AuthContext";
import CustomerAppointmentApis from '../../apis/CustomerAppointmentApis';


class CompletedCustomerAppointments extends React.Component {
    static contextType = AuthContext
    state = {
        is_loading: false,
        appointments_data: []
    }

    componentDidMount() {
        this.setState({
            is_loading: true
        })
        let params = `?id=${this.context.userid}`
        CustomerAppointmentApis.getCompletedAppointments(params).then(data => {
            this.setState({
                appointments_data: data,
                is_loading: false
            })
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
    }

    handleUpdate = (key, val) => {
        this.setState({
            [key]: val
        })
    }


    render() {
        const { appointments_data } = this.state;

        return (
            <div className='mt20'>
                <Container maxWidth="md">
                    {
                        this.state.is_loading ?
                            <div className='tc'>
                                <CircularProgress color='primary' />
                            </div>
                            :
                            <Grid container direction='row' spacing={3}>
                                {
                                    appointments_data.map(appointment => (
                                        <Grid item>
                                            <Paper elevation={10} className="paper-size">
                                                <Grid container direction='column' spacing={0}>
                                                    <Grid item>
                                                        <Grid container direction='row' spacing={2}>
                                                            <Grid item xs={6}>
                                                                <Typography className='weight-600 font-12'>Category</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography className='font-12'>{appointment.category}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item>
                                                        <Grid container direction='row' spacing={2}>
                                                            <Grid item xs={6}>
                                                                <Typography className='weight-600 font-12'>Amount</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography className='font-12'>{appointment.amount}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container direction='row' spacing={2}>
                                                            <Grid item xs={6}>
                                                                <Typography className='weight-600 font-12'>Service</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography className='font-12'>{appointment.sr_id}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container direction='row' spacing={2}>
                                                            <Grid item xs={6}>
                                                                <Typography className='weight-600 font-12'>Appoint</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography className='font-12'>{appointment.appoint_time}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container direction='row' spacing={2}>
                                                            <Grid item xs={6}>
                                                                <Typography className='weight-600 font-12'>Completed</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography className='font-12'>{appointment.status.completed}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                    }
                </Container>

            </div>
        )
    }
}
export default CompletedCustomerAppointments;