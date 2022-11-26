import React from 'react';
import './index.scss';
import { Tabs, Tab } from '@material-ui/core';
import { AuthContext } from "../Auth/AuthContext";
import AllAppointments from './allApointments';
import UnAssignedAppointments from './unAssigned';
import PendingAppointments from './pending';
import InProgressAppointments from './inProgress';
import CompletedAppointments from './completed';

const tabs = {
    allAppointments: "All Appointments",
    unAssigned: "Un Assigned",
    pending: "Pending",
    inprogress: 'In Progress',
    completed: 'Completed'
}

class Appointments extends React.Component {
    static contextType = AuthContext
    state = {
        currentTab: 0,
        currentTabName: tabs.allAppointments,
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

    render() {
        const { currentTabName } = this.state;

        return (
            <>
                <Tabs
                    className="mb20"
                    value={this.state.currentTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleTabChange}
                >
                    <Tab label={tabs.allAppointments} />
                    <Tab label={tabs.unAssigned} />
                    <Tab label={tabs.pending} />
                    <Tab label={tabs.inprogress} />
                    <Tab label={tabs.completed} />
                </Tabs>
                {
                    currentTabName === tabs.allAppointments ?
                        <AllAppointments />
                        : currentTabName === tabs.unAssigned ?
                            <UnAssignedAppointments />
                            : currentTabName === tabs.pending ?
                                <PendingAppointments />
                                : currentTabName === tabs.inprogress ?
                                    <InProgressAppointments />
                                    : currentTabName === tabs.completed ?
                                        <CompletedAppointments />
                                        : null
                }
            </>
        )
    }
}
export default Appointments;