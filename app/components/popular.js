import React from "react";

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
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python "];
    return (
      <ul className="flex-center">
        {languages.map(l => (
          <li key={l}>
            <button
              className="btn-clear nav-link"
              style={
                l === this.state.selectedLanguage ? { color: "#9E9E9E" } : null
              }
              onClick={() => this.updateLanguage(l)}
            >
              {l}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
