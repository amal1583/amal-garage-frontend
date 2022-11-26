import React from 'react';
import { AuthContext } from '../../components/Auth/AuthContext';
import { Typography } from "@material-ui/core";

class NoPermissions extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Typography>Permissions required</Typography>
    );
  }
}

export default NoPermissions;
