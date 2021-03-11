import React from "react";
import Menu from "./menu";
import TopBar from "./top-bar";

export default function Header() {
  return (
    <div>
      <TopBar pageName={this.props.pageName} />
      <Menu />
    </div>
  );
}
