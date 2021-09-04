import React from "react";
import PropTypes from "prop-types";

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

export default class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }
  mouseOver() {
    this.setState({
      hovering: true
    });
  }

  mouseOut() {
    this.setState({
      hovering: false
    });
  }
  render() {
    const { text, children } = this.props;
    const { hovering } = this.state;
    return (
      <div
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
        style={styles.tooltipContainer}
      >
        {hovering === true && <div style={styles.tooltip}>{text}</div>}
        <div className="card-list-li">{children}</div>
      </div>
    );
  }
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired
};
