import Axios from "axios";
import { backendUrl } from "../utils";

let employeeUrl = "/employees";
let employeeJobsUrl = "/employeeJobs";


const EmployeeApis = {

  getEmployees(params) {
    return Axios({
      url: backendUrl + employeeUrl + params,
      method: "get",
      headers: {
        "content-type": "application/json",
        // Authorization: 'token ' + accessTokenGet()
      },
    }).then((response) => response.data);
  },

  postEmployee(data) {
    return Axios({
      url: backendUrl + employeeUrl,
      method: "post",
      data: data,
      headers: {
        "content-type": "application/json",
        // Authorization: 'token ' + accessTokenGet()
      },
    }).then((response) => response.data);
  },

  putEmployee(data) {
    return Axios({
      url: backendUrl + employeeUrl,
      method: "put",
      data: data,
      headers: {
        "content-type": "application/json",
        // Authorization: 'token ' + accessTokenGet()
      },
    }).then((response) => response.data);
  },

  deleteEmployee(params) {
    return Axios({
      url: backendUrl + employeeUrl + params,
      method: "delete",
      headers: {
        "content-type": "application/json",
        // Authorization: 'token ' + accessTokenGet()
      },
    }).then((response) => response.data);
  },

  getEmployeeJobs(params) {
    return Axios({
      url: backendUrl + employeeJobsUrl + params,
      method: "get",
      headers: {
        "content-type": "application/json",
        // Authorization: 'token ' + accessTokenGet()
      },
    }).then((response) => response.data);
  },

}

export default EmployeeApis;