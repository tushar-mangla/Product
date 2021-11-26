import React, { Fragment } from "react";
import Navigation from "../layout/Navbar";

const Layout = (props) => {
  return (
    <Fragment>
      <Navigation />
      {props.children}
    </Fragment>
  );
};

export default Layout;
