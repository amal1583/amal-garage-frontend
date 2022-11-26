import React from 'react';
import './index.scss';
import { Container, Typography, Grid, Paper, CircularProgress, Button, TextField, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import { AuthContext } from "../Auth/AuthContext";
import CustomerAppointmentApis from '../../apis/CustomerAppointmentApis';
import PartsApis from '../../apis/PartsApis';
import ServiceApis from '../../apis/ServiceApis';

class AppointmentsCreationForm extends React.Component {
    static contextType = AuthContext
    state = {
        is_loading: false,
        parts_data: [],
        services_data: [],
        appointments_data: {
            amount: 0,
            appoint_time: "2022-06-30T18:34",
            category: "",
            customer_id: "",
            pr_id: [],
            sr_id: ""
        }
    }

    componentDidMount() {
        this.setState({
            is_loading: true,
        })

        PartsApis.getParts("").then(data => {
            this.setState({
                parts_data: data,
            })
        })
            .catch(error => this.context.handleCatch(error))


        ServiceApis.getServices("").then(data => {
            this.setState({
                services_data: data,
            })
        })
            .catch(error => this.context.handleCatch(error))

        this.setState({
            is_loading: false
        })
    }

    handleUpdate = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    updateFields = (key, value) => {
        let { appointments_data, services_data } = this.state

        appointments_data[key] = value
        this.setState({
            appointments_data: appointments_data
        })
    }

    handleBack = () => {
        this.props.handleUpdate("appointment_creation_toggle", false)
    }


    render() {
        let { appointments_data } = this.state
        console.log(":::::::", appointments_data)
        return (
            <div className='mt20'>
                <Container maxWidth="md">
                    {
                        this.state.is_loading ?
                            <div className='tc'>
                                <CircularProgress color='primary' />
                            </div>
                            :
                            <>
                                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                                    <Grid item>
                                        <h3>Create Appointment</h3>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="text" color="primary" onClick={this.handleBack}>Cancel</Button>
                                        <Button disabled variant="contained" color="primary" onClick={this.createAutomation}>Save</Button>
                                    </Grid>
                                </Grid>
                                <Container maxWidth="md">
                                    <Paper elevation={1} className='creation-paper-size'>
                                        <Grid container direction='row' spacing={3}>
                                            <Grid item>
                                                <TextField variant='standard' label="Category" name="category" value={appointments_data.category} onChange={(e) => this.updateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            <Grid item>
                                                <TextField type="datetime-local" variant='standard' label="Appoint Time" name="appoint_time" value={appointments_data.appoint_time} onChange={(e) => this.updateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            <Grid item>
                                                <TextField disabled variant='standard' label="Phone" name="phone" value={this.context.userid} />
                                            </Grid>
                                            <Grid item>
                                                <FormControl className="formControl" style={{ width: "150px" }}>
                                                    <InputLabel id="demo-simple-select-filled-label">Service</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={appointments_data.sr_id}
                                                        name="sr_id"
                                                        onChange={(e) =>
                                                            this.updateFields(e.target.name, e.target.value)
                                                        }
                                                    >
                                                        {this.state.services_data.map(service => (
                                                            <MenuItem value={service.name}>
                                                                {service.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Container>
                            </>
                    }
                </Container>

            </div >
        )
    }
}
export default AppointmentsCreationForm;