import React, { Component } from 'react'
import { Route, Routes } from "react-router-dom";
import Employees from './components/Employees';
import Parts from './components/Parts';
import Services from './components/Services';
import Appointments from './components/Appointments';
import { Container } from "@material-ui/core";
import NavBar from './components/NavBar/index.js'
import Signin from './components/Auth';
import Dashboard from './components/Dashboard';
import PartsSalePrediction from './components/PartsSalePrediction';
import ServiceSalePrediction from './components/ServiceSalePrediction';
import NoPermissions from './components/NoPermissions';
import CustomerAppointments from './components/CustomerAppointments';
import { Cookies } from "./utils";
import { history } from "./App";
import { AuthContext } from "./components/Auth/AuthContext";

export const RouteStrings = {
    signin: '/',
    employees: '/employees',
    services: '/services',
    parts: '/parts',
    appointments: '/appointments',
    dashboard: '/dashboard',
    partsSalePrediction: '/partsSalePrediction',
    servicesSalePrediction: '/servicesSalePrediction',
    customerAppointments: '/customerAppointments'
}


export default class Routing extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <NavBar />
                <br />
                <Container>
                    <AuthContext.Consumer>
                        {({ activePermissions }) =>
                            <Routes>
                                <Route path={RouteStrings.signin} element={<Signin />} />
                                <Route
                                    path={RouteStrings.employees}
                                    element={
                                        activePermissions && activePermissions.employees ?
                                            <Employees />
                                            : <NoPermissions />
                                    }
                                />
                                <Route
                                    path={RouteStrings.parts}
                                    element={
                                        activePermissions && activePermissions.parts ?
                                            <Parts />
                                            : <NoPermissions />
                                    }
                                />
                                <Route
                                    path={RouteStrings.services}
                                    element={
                                        activePermissions && activePermissions.services ?
                                            <Services />
                                            : <NoPermissions />
                                    }
                                />
                                <Route
                                    path={RouteStrings.appointments}
                                    element={
                                        activePermissions && activePermissions.appointments ?
                                            <Appointments />
                                            : <NoPermissions />
                                    }
                                />
                                <Route
                                    path={RouteStrings.dashboard}
                                    element={
                                        activePermissions && activePermissions.dashboard ?
                                            <Dashboard />
                                            : <NoPermissions />
                                    }
                                />
                                <Route
                                    path={RouteStrings.partsSalePrediction}
                                    element={
                                        activePermissions && activePermissions.partsPrediction ?
                                            <PartsSalePrediction />
                                            : <NoPermissions />
                                    }
                                />
                                <Route
                                    path={RouteStrings.servicesSalePrediction}
                                    element={
                                        activePermissions && activePermissions.servicesPrediction ?
                                            <ServiceSalePrediction />
                                            : <NoPermissions />
                                    }
                                />
                                <Route
                                    path={RouteStrings.customerAppointments}
                                    element={
                                        activePermissions && activePermissions.customer_appointments ?
                                            <CustomerAppointments />
                                            : <NoPermissions />
                                    }
                                />
                            </Routes>
                        }
                    </AuthContext.Consumer>
                </Container>

            </>
        )
    }
}
