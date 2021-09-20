import React, { useState, useContext } from "react";
import { FaUserFriends, FaTrophy, FaTimesCircle } from "react-icons/fa";
import { RiSwordFill } from "react-icons/ri";
import PropTypes from "prop-types";
import ThemeContext, { ThemeConsumer } from "../context/theme";
import { Link } from "react-router-dom";

// INSTRUCTIONS
function Instructions() {
  const theme = useContext(ThemeContext);
  return (
    <div className="instructions-container">
      <h1 className={`center-text header-lg text-${theme}`}>Instructions</h1>
      <ol className="container-sm grid center-text battle-instructions">
        <li>
          <h3 className={`header-sm text-${theme}`}>Enter two Github users</h3>
          <FaUserFriends
            className={`bg-${theme}`}
            color="#rgb(255,191,116)"
            size={140}
          />
        </li>
        <li>
          <h3 className={`header-sm text-${theme}`}>Battle</h3>
          <RiSwordFill className={`bg-${theme}`} color="#727272" size={140} />
        </li>
        <li>
          <h3 className={`header-sm text-${theme}`}>See the winner</h3>
          <FaTrophy
            className={`bg-${theme}`}
            color="rgb(255,215,0)"
            size={140}
          />
        </li>
      </ol>
    </div>
  );
}

// PLAYER INPUT

function PlayerInput({ onSubmit, label }) {
  const [username, setUsername] = useState("");

  const theme = useContext(ThemeContext);

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(username);
  };

  const handleChange = event => {
    setUsername(event.target.value);
  };

  return (
    <form className="column player" onSubmit={handleSubmit}>
      <label htmlFor="username" className={`player-label text-${theme}`}>
        {label}
      </label>
      <div className="row player-inputs">
        <input
          type="text"
          id="username"
          className={`input-${theme}`}
          placeholder="github username"
          autoComplete="off"
          // controlled component -> value = state
          value={username}
          onChange={handleChange}
        />
        <button className={`btn btn-${theme}`} disabled={!username}>
          Submit
        </button>
      </div>
    </form>
  );
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

// PLAYER PREVIEW
function PlayerPreview({ username, onReset, label }) {
  const theme = React.useContext(ThemeContext);

  return (
    <div className="column player">
      <h3 className={`player-label text-${theme}`}>{label}</h3>
      <div className={`row bg-${theme}`}>
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
          <FaTimesCircle className="cross" color="rgb(194, 57,42)" size={26} />
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

export default function Battle() {
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);

  const theme = React.useContext(ThemeContext);

  const handleSubmit = (id, player) => {
    if (id === "playerOne") {
      setPlayerOne(player);
    } else if (id === "playerTwo") {
      setPlayerTwo(player);
    }
  };

  const handleReset = id => {
    if (id === "playerOne") {
      setPlayerOne(null);
    } else if (id === "playerTwo") {
      setPlayerTwo(null);
    }
  };

  return (
    <>
      <Instructions />
      <div className="players-container">
        <h1 className="center-text header-lg">Players</h1>
        <div className="form-container row space-around">
          {/* player 1 */}

          {playerOne === null ? (
            <PlayerInput
              onSubmit={player => handleSubmit("playerOne", player)}
              label="Player One"
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              label="Player One"
              onReset={() => handleReset("playerOne")}
            />
          )}
          {/* player 2 */}
          {playerTwo === null ? (
            <PlayerInput
              onSubmit={player => handleSubmit("playerTwo", player)}
              label="Player Two"
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              label="Player Two"
              onReset={() => handleReset("playerTwo")}
            />
          )}
        </div>
        {playerOne && playerTwo && (
          <Link
            className={`btn btn-${theme} btn-space`}
            to={{
              pathname: "/battle/results",
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </>
  );
}
