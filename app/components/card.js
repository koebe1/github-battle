import React, { useContext } from "react";
import PropTypes from "prop-types";
import ThemeContext from "../context/theme";

export default function Card({
  header,
  subheader,
  avatar,
  href,
  name,
  children
}) {
  const redirect = () => {
    window.open(href, "_blank");
  };

  const theme = useContext(ThemeContext);

  return (
    <div onClick={redirect} className={`card pointer bg-${theme}`}>
      {/* <a href={href} target="_blank"> */}
      <h3 className={`header-lg center-text text-${theme}`}>{header}</h3>
      <img className="avatar" src={avatar} alt={`Avatar for ${name}`} />
      {/* if subheader exists -> render it */}
      {subheader && (
        <h4 className={`center-text text-${theme}`}>{subheader}</h4>
      )}
      <h2 className="center-text link">{name}</h2>
      {children}
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
