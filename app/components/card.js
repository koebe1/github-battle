import React from "react";
import PropTypes from "prop-types";

export default function Card({
  header,
  subheader,
  avatar,
  href,
  name,
  children
}) {
  return (
    <div className="card bg-light">
      <a href={href} target="_blank">
        <h3 className="header-lg center-text text-light">{header}</h3>
        <img className="avatar" src={avatar} alt={`Avatar for ${name}`} />
        {/* if subheader exists -> render it */}
        {subheader && <h4 className="center-text text-light">{subheader}</h4>}
        <h2 className="center-text">
          <a href={href} target="_blank" className="link">
            {name}
          </a>
        </h2>
        {children}
      </a>
    </div>
  );
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
