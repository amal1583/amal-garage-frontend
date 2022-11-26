import React, { Component } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { createBrowserHistory } from "history";
import variables from './style/variables.scss';
import Routing from './Routes';
import { AuthContext } from './components/Auth/AuthContext';
import PublicRoutes from './PublicRoute';


export const history = createBrowserHistory();
history.listen((location, action) => {
  if (["PUSH"].includes(action)) {
    window.scroll({
      behavior: "smooth",
      top: 0
    });
  }
});

const theme = createTheme({
  palette: {
    primary: {
      main: variables.primaryMain,
      light: "#7DC3F6",
      dark: "#3077A9",
      contrastText: "#fff"
    },
    secondary: {
      main: variables.secondaryMain,
      light: "#77EC89",
      dark: "#2AA03D",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.80)",
      secondary: "rgba(0, 0, 0, 0.55)",
      disabled: "rgba(0, 0, 0, 0.40)"
    }
  },
  typography: {
    fontFamily: "Lato, sans-serif"
  }
});


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount = () => {
  }

  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <AuthContext.Consumer>
              {({ token }) =>
                !token ?
                  <PublicRoutes></PublicRoutes>
                  :
                  <Routing></Routing>
              }
            </AuthContext.Consumer>
          </Router>
        </ThemeProvider>
      </div>
    )
  }
}

