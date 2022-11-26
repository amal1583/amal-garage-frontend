import React from 'react';
import './index.scss';
import { Tabs, Tab, Button } from '@material-ui/core';
import { AuthContext } from "../Auth/AuthContext";
import PendingCustomerAppointments from './pending';
import CompletedCustomerAppointments from './completed';
import AppointmentsCreationForm from './appointmentCreation';


const tabs = {
    pending: "Pending",
    completed: "Completed",
}

class CustomerAppointments extends React.Component {
    static contextType = AuthContext
    state = {
        currentTab: 0,
        currentTabName: tabs.pending,
        appointment_creation_toggle: false
    }

    componentDidMount() {
    }

    handleUpdate = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    handleTabChange = (e, newTab) => {
        let currentTabName = e.currentTarget.textContent
        this.setState({
            currentTabName,
            currentTab: newTab,
        })
    }

    createAppointment = () => {
        this.setState({
            appointment_creation_toggle: true
        })
    }

    render() {
        const { currentTabName } = this.state;

        return (
            <>
                {
                    this.state.appointment_creation_toggle ?
                        <AppointmentsCreationForm
                            handleUpdate={this.handleUpdate}
                        />
                        :
                        <>

                            <Button color='primary' variant='contained' style={{ float: 'right' }} onClick={this.createAppointment}>Create Appointment</Button>
                            <Tabs
                                className="mb20"
                                value={this.state.currentTab}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={this.handleTabChange}
                            >
                                <Tab label={tabs.pending} />
                                <Tab label={tabs.completed} />
                            </Tabs>
                            {
                                currentTabName === tabs.pending ?
                                    <PendingCustomerAppointments />
                                    : currentTabName === tabs.completed ?
                                        <CompletedCustomerAppointments />
                                        : null
                            }
                        </>
                }
            </>
        )
    }
}
export default CustomerAppointments;