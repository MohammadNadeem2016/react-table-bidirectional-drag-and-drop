import React from "react";
import { Menu, MenuItem, IconButton, Box, Divider, Grid } from "@mui/material";
import { FiMoreHorizontal } from "react-icons/fi";
import Text from "./text.jsx";

const ITEM_HEIGHT = 500;

/**
 *
 * @param {{
 *  options: Array<{
 *    name: String | Number,
 *    displayName: String,
 *    onClick: (name: String | Number, optionId: String | Number) => void,
 *    visibility?: boolean,
 *    divider?: boolean
 *  }>,
 *  optionId?: String | Number,
 * }} props
 * @description
 *  options: provide this object in an array for options
 *  {
 *      name, displayName , onClick, visibility, divider
 *  }
 * name: name for Menuoption it will act like ID
 * displayname: To display name
 * onClick: Accepts a callbac function, this function will provide name in parameter
 * visibility: (optional) if set to false, the option will be disabled
 * divider: (optional) if set to true, a divider line will be displayed after the MenuItem
 *
 * optionId: Provide an option ID to get it as 2nd parameter of callback function
 * @returns An option component
 */

const OptionMenu = ({ options, optionId = null }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (callback) => {
    handleClose();
    callback();
  };

  return (
    <>
      <Box>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <FiMoreHorizontal color="#44409A" />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "27ch",
            },
          }}
        >
          {options?.map((option, index) => (
            <div key={option.name}>
              <MenuItem
                disabled={option.visibility === false}
                onClick={() => {
                  handleMenuItemClick(() =>
                    option?.onClick(option.name, optionId)
                  );
                }}
              >
                <Grid container alignItems="center">
                  <div>{option.icon && <Box mr={1}>{option.icon}</Box>}</div>
                  <Text style={{ display: "flex", flexWrap: "wrap" }}>
                    {option?.displayName}
                  </Text>
                </Grid>
              </MenuItem>
              {option.divider && index < options.length - 1 && <Divider />}
            </div>
          ))}
        </Menu>
      </Box>
    </>
  );
};

export default OptionMenu;
