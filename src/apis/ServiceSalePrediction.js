import Axios from "axios";
import { backendUrl } from "../utils";

let previousURL = "/historicServicesSale";
let futureURL = "/futureServicesSale";
let serviceDonutChart = "/serviceDonutChart";



const ServicesPredictionApis = {
    getPreviousSale() {
        return Axios({
            url: backendUrl + previousURL,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => response.data);
    },

    getFutureSale() {
        return Axios({
            url: backendUrl + futureURL,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => response.data);
    },
    getServiceDonutChartSale() {
        return Axios({
            url: backendUrl + serviceDonutChart,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => response.data);
    },
}

export default ServicesPredictionApis;