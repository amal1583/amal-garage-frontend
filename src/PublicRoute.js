import React, { Component } from 'react';
import Signin from './components/Auth';
import { CircularProgress } from '@material-ui/core';
import { RouteStrings } from './Routes';
import { Route, Routes } from "react-router-dom";
import { Cookies } from "./utils";
import { history } from "./App";


export default class PublicRoutes extends Component {

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
                <Routes>
                    <Route path={RouteStrings.signin} element={<Signin />} />
                </Routes>
            </>
        )
    }
}







// function PublicRoutes() {
//     return (
//         <>
//             <Routes>
//                 <Route path={RouteStrings.signin} element={<Signin />} />
//             </Routes>
//         </>
//     );
// }
// export default PublicRoutes;
