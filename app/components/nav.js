import React from "react";
import { ThemeConsumer } from "../context/theme";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
          <ul className="row nav">
            <li>
              <NavLink
                exact
                activeStyle={{ color: "#EB965A" }}
                className={`nav-link text-${theme}`}
                to="/"
              >
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink
                activeStyle={{ color: "#EB965A" }}
                className={`nav-link text-${theme}`}
                to="/battle"
              >
                Battle
              </NavLink>
            </li>
          </ul>
          <button
            style={{ fontSize: 30, cursor: "pointer" }}
            className="btn-clear"
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
}
