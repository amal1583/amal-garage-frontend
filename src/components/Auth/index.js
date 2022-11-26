import React from "react";
import { AuthContext } from './AuthContext';
import AuthApis from '../../apis/AuthApis';
import './index.scss';
// import logo from '../../../assets/images/logo.png';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { RouteStrings } from '../../Routes';
import { Cookies } from "../../utils";
import { history } from "../../App";

class Signin extends React.Component {
  static contextType = AuthContext

  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
      formError: "",
      fromResetPassword: false,
      isLoading: false
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  componentDidMount() {
    if (Cookies.get('authtoken') !== null) {
      if (Cookies.get('usertype') === "admin") {
        window.location.reload(false);
        history.push(RouteStrings.dashboard)
      }
      else if (Cookies.get('usertype') === "customer") {
        window.location.reload(false);
        history.push(RouteStrings.customerAppointments)
      }
    }
  }

  handleUpdate(key, value) {
    this.setState({
      [key]: value
    })
  }

  handleOnSubmit(e) {
    e.preventDefault()
    const signin = {
      phone: this.state.phone,
      password: this.state.password
    }
    if (this.state.phone === '' || this.state.password === '') {
    } else {
      this.setState({
        isLoading: true,
        formError: ''
      })

      let params = `?phone=${this.state.phone}&password=${this.state.password}`
      AuthApis.getSignin(params).then(data => {
        this.setState({ isLoading: false })
        this.context.signin(data,
          (active) => {
            let activePermissions = null
            if (active) {
              activePermissions = active
            } else {
              activePermissions = this.context.activePermissions
            }
            activePermissions && activePermissions.dashboard ?
              this.props.history.push(RouteStrings.dashboard)
              : activePermissions && activePermissions.partsPrediction ?
                this.props.history.push(RouteStrings.partsSalePrediction)
                : activePermissions && activePermissions.servicesPrediction ?
                  this.props.history.push(RouteStrings.servicesSalePrediction)
                  : activePermissions && activePermissions.employee ?
                    this.props.history.push(RouteStrings.employees)
                    : activePermissions && activePermissions.parts ?
                      this.props.history.push(RouteStrings.parts)
                      : activePermissions && activePermissions.services ?
                        this.props.history.push(RouteStrings.services)
                        : activePermissions && activePermissions.appointments ?
                          this.props.history.push(RouteStrings.appointments)
                          : activePermissions && activePermissions.customer_appointments ?
                            this.props.history.push(RouteStrings.customerAppointments)
                            : this.props.history.push(RouteStrings.dashboard)
          }
        )
      })
        .catch(error => this.context.handleCatch(error, () => this.setState({ isLoading: false })))
    }

  }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-container">
          {/* <img className="auth-logo" alt="Ginkgo" src={logo} /> */}

          <div className="auth-form-wrapper">
            <h1>Sign In</h1>
            {
              this.state.formError.length > 0 ?
                <p className="form-error">{this.state.formError}</p>
                : null
            }
            <form onSubmit={this.handleOnSubmit}>
              <TextField
                label="Phone Number"
                onChange={(e) => this.handleUpdate(e.target.name, e.target.value)}
                margin="normal"
                name="phone"
                required
              />
              <TextField
                label="Password"
                onChange={(e) => this.handleUpdate(e.target.name, e.target.value)}
                margin="normal"
                type="password"
                name="password"
                required
              />
              {/* <div className="forgot-password-wrapper">
                <Link to={RouteStrings.forgotPassword} className="forgot-password">Forgot password?</Link>
              </div> */}

              {this.state.isLoading ?
                <CircularProgress className="form-loading" color="secondary" />
                :
                <Button variant="contained" color="primary" className="form-submit" type="submit">Continue</Button>
              }
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Signin;
