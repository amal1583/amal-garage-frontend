import React from 'react';
import { NavLink } from 'react-router-dom';
import { RouteStrings } from '../../Routes';
import './NavBar.scss';
import { history } from '../../App';
import { AuthContext } from '../../components/Auth/AuthContext';

class NavBar extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  logout = () => {
    this.context.redirectToSignin()
  }

  render() {
    return (
      <nav id="navbar">
        <AuthContext.Consumer>
          {({ activePermissions }) =>
            <ul>
              {
                !activePermissions ?
                  this.context.redirectToSignin(() => {
                    history.push(RouteStrings.signin)
                  })
                  : null
              }
              {
                activePermissions && activePermissions.dashboard ?
                  <li><NavLink to={RouteStrings.dashboard} activeClassName="active">Dashboard</NavLink></li>
                  : null
              }
              {
                activePermissions && activePermissions.partsPrediction ?
                  <li><NavLink to={RouteStrings.partsSalePrediction} activeClassName="active">Parts Prediction</NavLink></li>
                  : null
              }
              {
                activePermissions && activePermissions.servicesPrediction ?
                  <li><NavLink to={RouteStrings.servicesSalePrediction} activeClassName="active">Services Prediction</NavLink></li>
                  : null
              }
              {
                activePermissions && activePermissions.employees ?
                  <li><NavLink to={RouteStrings.employees} activeClassName="active">Employees</NavLink></li>
                  : null
              }
              {
                activePermissions && activePermissions.services ?
                  <li><NavLink to={RouteStrings.services} activeClassName="active">Services</NavLink></li>
                  : null
              }
              {
                activePermissions && activePermissions.parts ?
                  <li><NavLink to={RouteStrings.parts} activeClassName="active">Parts</NavLink></li>
                  : null
              }
              {
                activePermissions && activePermissions.appointments ?
                  <li><NavLink to={RouteStrings.appointments} activeClassName="active">Appointments</NavLink></li>
                  : null
              }
              {
                activePermissions && activePermissions.customer_appointments ?
                  <li><NavLink to={RouteStrings.customerAppointments} activeClassName="active">Appointments</NavLink></li>
                  : null
              }
              <li><NavLink to={RouteStrings.signin} onClick={this.logout} activeClassName="active">Logout</NavLink></li>
            </ul>
          }
        </AuthContext.Consumer>
      </nav>
    );
  }
}

export default NavBar;
