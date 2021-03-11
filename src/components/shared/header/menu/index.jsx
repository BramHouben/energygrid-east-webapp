import React, { Component, useState } from "react";
import { Button } from "react-bootstrap";
import { getClaim } from "services/jwt";
import accountRole from "services/shared/account-role";
import jwtClaims from "services/shared/jwt-claims";
import routerPaths from "services/shared/router-paths";
import Cookies from "universal-cookie";
import "./index.css";

export default function Menu() {
  const [menuLinks, setMenuLinks] = useState({});

  const openNav = () => {
    const menu = document.getElementById("menu");
    menu.style.width = "125px";
  };

  const closeNav = () => {
    const menu = document.getElementById("menu");
    menu.style.width = "0";
  };

  const logout = () => {
    const cookie = new Cookies();
    cookie.remove("Jwt", { path: "/" });
    window.location.pathname = "/login";
  };

  const generateLinks = () => {
    const userRole = getClaim(jwtClaims.accountRole);
    const links = [
      {
        a: (
          <a key="menu-dashboard" href={routerPaths.Dashboard}>
            Dashboard
          </a>
        ),
        accountRoles: [
          accountRole.User,
          accountRole.Admin,
          accountRole.SiteAdmin,
        ],
      },
      {
        a: (
          <a key="menu-apps" href={routerPaths.AppDashboard}>
            Apps
          </a>
        ),
        accountRoles: [
          accountRole.User,
          accountRole.Admin,
          accountRole.SiteAdmin,
        ],
      },
    ];

    return links
      .filter((link) => link.accountRoles.includes(userRole))
      .map((link) => link.a);
  };

  return (
    <div>
      <Button
        id="open-menu-button"
        className="link-btn corporate-identity-font"
        type="button"
        onClick={() => openNav()}
      >
        &#9776;
      </Button>

      <div id="menu">
        <button
          className="closebtn link-btn"
          type="button"
          onClick={() => closeNav()}
        >
          &times;
        </button>
        <div id="menu-links">
          {generateLinks}
          <button onClick={() => logout()} type="button" className="link-btn">
            Afmelden
          </button>
        </div>
      </div>
    </div>
  );
}
