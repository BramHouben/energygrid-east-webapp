import React from 'react'
import './index.css'
import routerPaths from "services/shared/router-paths";

export default class PWAFooter extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="pwafooter">
                <div id="footerRow">
                    <div className="footerIcon">
                        <a href={routerPaths.Pwa}>Home</a>
                    </div>
                    <div className="footerIcon">
                        <a href={routerPaths.Production}>Production</a>
                    </div>
                    <div className="footerIcon">
                        <a href={routerPaths.Account}>Account</a>
                    </div>
                    <div className="footerIcon">
                        <a href={routerPaths.Map}>Map</a>
                    </div>
                </div>
            </div>
        )
    }
}