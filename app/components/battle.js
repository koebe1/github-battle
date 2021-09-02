import React from "react";
import { FaUserFriends, FaTrophy, FaTimesCircle } from "react-icons/fa";
import { RiSwordFill } from "react-icons/ri";
import PropTypes from "prop-types";

// INSTRUCTIONS
function Instructions() {
  return (
    <div className="instructions-container">
      <h1 className="center-text header-lg">Instructions</h1>
      <ol className="container-sm grid center-text battle-instructions">
        <li>
          <h3 className="header-sm">Enter two Github users</h3>
          <FaUserFriends
            className="bg-light"
            color="#rgb(255,191,116)"
            size={140}
          />
        </li>
        <li>
          <h3 className="header-sm">Battle</h3>
          <RiSwordFill className="bg-light" color="#727272" size={140} />
        </li>
        <li>
          <h3 className="header-sm">See the winner</h3>
          <FaTrophy className="bg-light" color="rgb(255,215,0)" size={140} />
        </li>
      </ol>
    </div>
  );
}

// PLAYER INPUT
class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  }
  handleChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  render() {
    return (
      <form className="column player" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="player-label">
          {this.props.label}
        </label>
        <div className="row player-inputs">
          <input
            type="text"
            id="username"
            className="input-light"
            placeholder="github username"
            autoComplete="off"
            // controlled component -> value = state
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button className="btn dark-btn" disabled={!this.state.username}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

// PLAYER PREVIEW
function PlayerPreview({ username, onReset, label }) {
  return (
    <div className="column player">
      <h3 className="player-label">{label}</h3>
      <div className="row bg-light">
        <div className="player-info">
          <img
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
            className="avatar-small"
          />
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            className="link"
          >
            {username}
          </a>
        </div>
        <button className="btn-clear flex-center" onClick={onReset}>
          <FaTimesCircle className="cross" color="rgb(194, 57,42)" size={26} />"
        </button>
      </div>
    </div>
  );
}

PlayerPreview.prototype = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

// BATTLE
export default class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, player) {
    this.setState({
      [id]: player
    });
  }

  handleReset(id) {
    this.setState({
      [id]: null
    });
  }

  render() {
    const { playerOne, playerTwo } = this.state;
    return (
      <React.Fragment>
        <Instructions />

        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="form-container row space-around">
            {/* player 1 */}

            {playerOne === null ? (
              <PlayerInput
                onSubmit={player => this.handleSubmit("playerOne", player)}
                label="Player One"
              />
            ) : (
              <PlayerPreview
                username={playerOne}
                label="Player One"
                onReset={() => this.handleReset("playerOne")}
              />
            )}
            {/* player 2 */}
            {playerTwo === null ? (
              <PlayerInput
                onSubmit={player => this.handleSubmit("playerTwo", player)}
                label="Player Two"
              />
            ) : (
              <PlayerPreview
                username={playerTwo}
                label="Player Two"
                onReset={() => this.handleReset("playerTwo")}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
