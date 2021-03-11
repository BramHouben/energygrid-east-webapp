import React from "react";
import Menu from "./menu";
import TopBar from "./top-bar";

export default function Header(props) {
  return (
    <div>
      <TopBar pageName={props.pageName} />
      <Menu />
    </div>
  );
}
