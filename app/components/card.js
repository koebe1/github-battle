import React from "react";
import PropTypes from "prop-types";
import { ThemeConsumer } from "../context/theme";

export default function Card({
  header,
  subheader,
  avatar,
  href,
  name,
  children
}) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`card bg-${theme}`}>
          <a href={href} target="_blank">
            <h3 className="header-lg center-text text-light">{header}</h3>
            <img className="avatar" src={avatar} alt={`Avatar for ${name}`} />
            {/* if subheader exists -> render it */}
            {subheader && (
              <h4 className="center-text text-light">{subheader}</h4>
            )}
            <h2 className="center-text">
              <a href={href} target="_blank" className="link">
                {name}
              </a>
            </h2>
            {children}
          </a>
        </div>
      )}
    </ThemeConsumer>
  );
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
