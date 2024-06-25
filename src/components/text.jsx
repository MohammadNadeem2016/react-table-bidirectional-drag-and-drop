import React from "react";
// import PropTypes from "prop-types";
import { Typography, useTheme } from "@mui/material";

const getColor = (color, theme) => {
  switch (color) {
    default:
      return color;
    case "success":
      return theme.palette.success.main;
    case "error":
      return theme.palette.error.main;
    case "info":
      return theme.palette.info.main;
    case "warning":
      return theme.palette.warning.main;
    case "secondary":
      return "GrayText";
  }
};

const Text = ({
  children,
  bold,
  semibold,
  color,
  variant,
  link,
  fontWeight,
  sx,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <Typography
      variant={
        variant === "title" ? "h6" : variant === "subtitle" ? "body2" : variant
      }
      fontWeight={
        bold ? "bold" : semibold || variant === "title" ? 600 : fontWeight
      }
      color={link ? "primary" : getColor(color, theme)}
      {...rest}
      sx={{ textDecoration: link ? "none !important" : "inherit", ...sx }}
    >
      {children}
    </Typography>
  );
};

// Text.propTypes = {
//   bold: PropTypes.bool,
//   semibold: PropTypes.bool,
//   variant: PropTypes.oneOf(["title", "subtitle"]),
// };

export default Text;
