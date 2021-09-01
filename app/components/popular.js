import React from "react";
import PropTypes from "prop-types";

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python "];
  return (
    <ul className="flex-center">
      {languages.map(l => (
        <li key={l}>
          <button
            className="btn-clear nav-link"
            style={l === selected ? { color: "#9E9E9E" } : null}
            onClick={() => onUpdateLanguage(l)}
          >
            {l}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All"
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage = selectedLanguage => {
    this.setState({
      selectedLanguage
    });
  };

  render() {
    const { selectedLanguage } = this.state;
    return (
      <React.Fragment>
        <LanguagesNav
          selected={this.state.selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
      </React.Fragment>
    );
  }
}
