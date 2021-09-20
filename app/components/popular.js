import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "./utils/api";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from "react-icons/fa";
import Card from "./card";
import Loading from "./loading";
import Tooltip from "./tooltip";
import { ThemeConsumer } from "../context/theme";

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "Python", "C", "Java", "CSS"];
  return (
    <ThemeConsumer>
      {theme => {
        return (<ul className="flex-center">
          {languages.map(l => (<li key={l}>
            <button className={`btn-clear nav-link text-${theme}`} style={l === selected ? { color: "#EB965A" } : {}} onClick={() => onUpdateLanguage(l)}>
              {l}
            </button>
          </li>))}
        </ul>);
      }}
    </ThemeConsumer>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues
        } = repo;
        const { login, avatar_url } = owner;
        const redirect = () => {
          window.open(`https://github.com/${login}`, "_blank");
        };

        return (
          <li key={html_url}>
            <Card
              header={`${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text="Github username">
                    <FaUser color="rgb(255,191,116" size={22} />
                    <span onClick={redirect}>{login}</span>
                  </Tooltip>
                </li>
                <li className="default-cursor">
                  <FaStar color="rgb(255,215,0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li className="default-cursor">
                  <FaCodeBranch color="rgb(129,195,245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li className="default-cursor">
                  <FaExclamationTriangle color="rgb(241,138,147)" size={22} />
                  {open_issues.toLocaleString()} open issues
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

export default class Popular extends React.Component {
  state = {
    selectedLanguage: "All",
    repos: {},
    error: null
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = selectedLanguage => {
    this.setState({
      selectedLanguage,
      error: null
    });

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }));
        })
        .catch(error => {
          console.warn("Error fetching repos: ", error);

          this.setState({
            error: `There was an error fetching the repositories.`
          });
        });
    }
  };

  isLoading = () => {
    const { selectedLanguage, repos, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  };

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <React.Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <div className="loader"></div>}
        {/* custom loading component */}
        {/* {this.isLoading() && <Loading text="loading" loaderSign="." />} */}

        {error && <p className="center-text error">{error}</p>}

        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </React.Fragment>
    );
  }
}
