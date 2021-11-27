import React from "react";

function Header(props) {
  return <h3 {...props}>{props.children}</h3>;
}

export default Header;
