import React from "react";
import { battle } from "./utils/api";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser
} from "react-icons/fa";
import Card from "./card";
import PropTypes from "prop-types";
import Tooltip from "./tooltip";
import Loading from "./loading";
import { ThemeConsumer } from "../context/theme";

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239,115,115" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li className="default-cursor">
          <Tooltip className="tool-tip" text="User's location">
            <FaCompass color="rgb(144,115,255)" size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li className="default-cursor">
          <Tooltip className="tool-tip" text="User's company">
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li className="default-cursor">
        <FaUsers color="rgb(129,195,245" size={22} />
        {profile.followers.toLocaleString()}
      </li>
      <li className="default-cursor">
        <FaUserFriends color="rgb(64,183,95" size={22} />
        {profile.following.toLocaleString()}
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
};

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }
  // lifecycle method to fetch the data once  the component gets created
  componentDidMount() {
    const { playerOne, playerTwo } = this.props;
    battle([playerOne, playerTwo])
      .then(players => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        });
      })
      .catch(message => {
        this.setState({
          error: message,
          loading: false
        });
      });
  }
  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading === true) {
      return <div className="loader"></div>;
      // custom loader
      // return <Loading text="battling" loaderSign="_" />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            <div className="grid space-around container-sm">
              <Card
                header={winner.score === loser.score ? "Tie" : "Winner"}
                subheader={`Score ${winner.score.toLocaleString()}`}
                avatar={winner.profile.avatar_url}
                href={winner.profile.html_url}
                name={winner.profile.login}
              >
                <ProfileList profile={winner.profile} />
              </Card>

              <Card
                header={loser.score === winner.score ? "Tie" : "Loser"}
                subheader={`Score ${loser.score.toLocaleString()}`}
                avatar={loser.profile.avatar_url}
                href={loser.profile.html_url}
                name={loser.profile.login}
              >
                <ProfileList profile={loser.profile} />
              </Card>
            </div>
            <button
              className={`btn btn-${theme} btn-space`}
              onClick={this.props.onReset}
            >
              Reset
            </button>
          </React.Fragment>
        )}
      </ThemeConsumer>
    );
  }
}

Results.proTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
};
