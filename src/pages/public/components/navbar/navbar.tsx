import React from "react";
import { Link } from "react-router-dom";

import "./navbar.scss";

export interface Props
{
    sections: Array<Section>;
    currentSection: string;
}

export interface Section
{
    name: string;
    path: string;
}

const Navbar: React.FunctionComponent<Props> = (props) =>
{
    return <nav className="main-navbar">
        <div className="navigation-container">
            <div id="open-navigation" className="navigation-button" role="button">
                <i className="fi fi-rr-menu-burger"></i>
            </div>

            <div className="navigation-list">
                {props.sections.map((section, index) =>
                {
                    let current = "";
                    if(section.path === props.currentSection)
                    {
                        current = "current";
                    }

                    return <Link key={`link-${index}`} className={`navigation-link ${current}`} to={section.path}>
                        {section.name}
                    </Link>;
                })}
            </div>

            <div className="navigation-search" role="button">
                <i className="fi fi-rr-search"></i>
            </div>
        </div>
    </nav>;
};

export default Navbar;