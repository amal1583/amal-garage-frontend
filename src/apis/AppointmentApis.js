import Axios from "axios";
import { backendUrl } from "../utils";

let allAppointmentsUrl = "/appointments";
let unAssignedAppointmentsUrl = "/unassigned";
let pendingAppointmentsUrl = "/pending";
let inProgressAppointmentsUrl = "/in_progress";
let completedAppointmentsUrl = "/sales";
let freeEmployeeUrl = "/freeEmployees";
let assignEmployeeUrl = "/assignEmployee";


const AppointmentApis = {

  getAllAppointments(params) {
    return Axios({
      url: backendUrl + allAppointmentsUrl + params,
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  },

  getUnAssignedAppointments(params) {
    return Axios({
      url: backendUrl + unAssignedAppointmentsUrl + params,
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  },

  getPendingAppointments(params) {
    return Axios({
      url: backendUrl + pendingAppointmentsUrl + params,
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  },

  getInProgressAppointments(params) {
    return Axios({
      url: backendUrl + inProgressAppointmentsUrl + params,
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  },

  getInCompletedAppointments(params) {
    return Axios({
      url: backendUrl + completedAppointmentsUrl + params,
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  },

  getFreeEmployees(params) {
    return Axios({
      url: backendUrl + freeEmployeeUrl + params,
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  },

  putAssignEmployees(data) {
    return Axios({
      url: backendUrl + assignEmployeeUrl ,
      method: "put",
      data: data,
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  },

}

export default AppointmentApis;