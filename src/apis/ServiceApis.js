import Axios from "axios";
import { backendUrl } from "../utils";

let serviceUrl = "/services";


const ServiceApis = {

  getServices(params) {
    return Axios({
      url: backendUrl + serviceUrl + params,
      method: "get",
      headers: {
        "content-type": "application/json",
        // Authorization: 'token ' + accessTokenGet()
      },
    }).then((response) => response.data);
  },

  postService(data) {
    return Axios({
      url: backendUrl + serviceUrl,
      method: "post",
      data: data,
      headers: {
        "content-type": "application/json",
        // Authorization: 'token ' + accessTokenGet()
      },
    }).then((response) => response.data);
  },

  putService(data) {
    return Axios({
      url: backendUrl + serviceUrl,
      method: "put",
      data: data,
      headers: {
        "content-type": "application/json",
        // Authorization: 'token ' + accessTokenGet()
      },
    }).then((response) => response.data);
  },

  deleteService(params) {
    return Axios({
      url: backendUrl + serviceUrl + params,
      method: "delete",
      headers: {
        "content-type": "application/json",
        // Authorization: 'token ' + accessTokenGet()
      },
    }).then((response) => response.data);
  }

}

export default ServiceApis;