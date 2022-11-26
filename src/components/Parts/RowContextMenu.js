import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (action) => {
    if (action === "edit") {
      props.editPart(props.row);
    } else if (action === "delete") {
      props.deletePart(props.row);
    }
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelect("edit")}>Edit</MenuItem>
        <MenuItem onClick={() => handleSelect("delete")}>Delete</MenuItem>
      </Menu>
    </>
  );
};
