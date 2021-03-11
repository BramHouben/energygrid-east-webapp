import React from "react";
import "./index.css";

export default function TopBar() {
  return (
    <div id="top-bar-wrapper">
      <h4 className="corporate-identity-font mt-1" id="top-bar-page-name">
        {this.props.pageName}
      </h4>
    </div>
  );
}
