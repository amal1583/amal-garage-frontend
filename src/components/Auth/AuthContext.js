import { createContext } from "react";
import * as React from "react";
import "./index.scss"
import { CircularProgress, Backdrop } from "@material-ui/core";
import MySnackbar from "../Toast";
import { Cookies } from "../../utils";
import { history } from "../../App";
import { RouteStrings } from '../../Routes';


export const AuthContext = createContext();
export class AuthContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: "",
      errorMsg: "",
      token: Cookies.get('authtoken') ? Cookies.get('authtoken') : null,
      usertype: Cookies.get('usertype') ? Cookies.get('usertype') : null,
      userid: Cookies.get('userid') ? Cookies.get('userid') : null,
      signin: this.signinUser,
      handleUpdate: this.handleUpdate,
      handleCatch: this.handleCatch,
      redirectToSignin: this.redirectToSignin,
      activePermissions: JSON.parse(localStorage.getItem("activePermissions")),
    };
  }


  signinUser = (data, call, firstTime) => {
    Cookies.set('authtoken', data['token'], 365);
    Cookies.set('usertype', data['usertype'], 365);
    Cookies.set('userid', data['userid'], 365);
    let token = data['token']
    let activePermissions = data['permissions']
    localStorage.setItem('activePermissions', JSON.stringify(activePermissions))
    this.setState({
      token: data.token,
      usertype: data.usertype,
      userid: data['usertype'],
      activePermissions: activePermissions
    }, () => {
      if (call !== undefined) {
        call(token)
      }
    });
  }

  signoutUser = (call) => {
    if (Cookies.get('authtoken')) {
      Cookies.delete('authtoken')
      this.setState({
        token: null,
      }, () => {
        if (call !== undefined)
          call()
      });
    }
  }

  redirectToSignin = () => {
    if (Cookies.get('authtoken')) {
      Cookies.delete('authtoken')
      Cookies.delete('usertype')
      Cookies.delete('userid')
      localStorage.removeItem('activePermissions')
      this.setState({
        token: null,
        usertype: null,
        userid: null
      });
    }

    // setTimeout(() => {
    //   this.signoutUser(() => {
    //     history.push(RouteStrings.signin)
    //   })
    // }, 1000);
  }

  handleUpdate = (key, val, call) => {
    this.setState({
      [key]: val
    }, () => {
      if (call !== undefined) {
        call()
      }
    })
  }

  handleCatch = (e, call) => {
    if (e.response) {
      this.setState({
        errorMsg: e.response.data ? e.response.data.detail ? e.response.data.detail : "Something went wrong" : "Something went wrong"
      })
    } else {
      this.setState({
        errorMsg: e.message
      })
    }
    if (call !== undefined) {
      call()
    }
  }

  componentDidMount() {

  }

  render() {
    let { isLoading, errorMsg, successMsg } = this.state
    return (
      <>
        {isLoading ?
          <Backdrop className="dackdrop" open={isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          :
          <>
            {
              errorMsg.length > 0 ?
                <MySnackbar open openFlag="errorMsg" type="error" msg={errorMsg}
                  handleUpdate={this.handleUpdate.bind(this)}
                />
                : null
            }
            {
              successMsg.length > 0 ?
                <MySnackbar open openFlag="successMsg" type="success" msg={successMsg}
                  handleUpdate={this.handleUpdate.bind(this)}
                />
                : null
            }
            <AuthContext.Provider value={this.state}>
              {this.props.children}
            </AuthContext.Provider>
          </>
        }
      </>
    );
  }
}