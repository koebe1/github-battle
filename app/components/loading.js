import React from "react";
import PropTypes from "prop-types";

export default class Loading extends React.Component {
  state = {
    loaderCount: 0
  }

  
  componentDidMount() {
    this.interval = setInterval(() => {
      this.state.loaderCount === 5
        ? this.setState({
            loaderCount: 0
          })
        : this.setState(({ loaderCount }) => ({
            loaderCount: loaderCount + 1
          }));
    }, 300);
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const { text, loaderSign } = this.props;
    return (
      <p className="loading">
        {text}

        {loaderSign.repeat(this.state.loaderCount)}
      </p>
    );
  }
}

Loading.propTypes = {
  text: PropTypes.string,
  loaderSign: PropTypes.any
};

Loading.defaultProps = {
  text: "loading",
  loaderSign: "."
};
