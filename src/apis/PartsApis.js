import Axios from "axios";
import { backendUrl } from "../utils";

let partsUrl = "/parts";


const PartsApis = {

  getParts(params) {
    return Axios({
      url: backendUrl + partsUrl + params,
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  },

  postParts(data) {
    return Axios({
      url: backendUrl + partsUrl,
      method: "post",
      data: data,
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  },

  putParts(data) {
    return Axios({
      url: backendUrl + partsUrl,
      method: "put",
      data: data,
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  },

  deleteParts(params) {
    return Axios({
      url: backendUrl + partsUrl + params,
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  }

}

export default PartsApis;