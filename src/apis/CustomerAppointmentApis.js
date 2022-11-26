import Axios from "axios";
import { backendUrl } from "../utils";

let completedUrl = "/customerCompletedAppointments";
let pendingUrl = "/customerPendingAppointments";



const CustomerAppointmentApis = {

    getCompletedAppointments(params) {
        return Axios({
            url: backendUrl + completedUrl + params,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => response.data);
    },

    getPendingAppointments(params) {
        return Axios({
            url: backendUrl + pendingUrl + params,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => response.data);
    },



}

export default CustomerAppointmentApis;