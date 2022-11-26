import Axios from "axios";
import { backendUrl } from "../utils";

let signinUrl = "/signin";


const AuthApis = {
  getSignin(params) {
    return Axios({
      url: backendUrl + signinUrl + params,
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.data);
  }
}

export default AuthApis;