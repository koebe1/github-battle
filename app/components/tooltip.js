import React from "react";
import PropTypes from "prop-types";
import withHover from "./withHover";

const styles = {
  tooltipContainer: {
    position: "relative",
    display: "flex"
  },
  tooltip: {
    boxSizing: "border-box",
    position: "absolute",
    width: "160px",
    bottom: "100%",
    left: "50%",
    marginLeft: "-80px",
    borderRadius: "3px",
    backgroundColor: "rgba(255,255,255, 0.8)",
    padding: "7px",
    marginBottom: "5px",
    color: "#000",
    texAlign: "center",
    fontSize: "14px",
    WebkitTextFillColor: "black"
  }
};

function Tooltip({ text, children, hovering }) {
  return (
    <div style={styles.tooltipContainer}>
      {hovering === true && <div style={styles.tooltip}>{text}</div>}
      <div className="card-list-li">{children}</div>
    </div>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  hovering: PropTypes.bool.isRequired
};

export default withHover(Tooltip);
