import Axios from "axios";
import { backendUrl } from "../utils";

let partRevenue = "/partRevenue";
let serviceRevenue = "/serviceRevenue";
let topSelling = "/topSelling";

const DashboardApis = {

  getTopSelling() {
    return Axios({
      url: backendUrl + topSelling,
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  },

  getPartRevenue(params) {
    return Axios({
      url: backendUrl + partRevenue + params,
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  },

  getServiceRevenue(params) {
    return Axios({
      url: backendUrl + serviceRevenue + params,
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  },

}

export default DashboardApis;