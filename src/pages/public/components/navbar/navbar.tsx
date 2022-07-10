import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../../components/modal/";
import NavItem from "../../../../components/nav_item/";

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
    const [ navigationModalOpen, setNavigationModalOpen ] = useState<boolean>(false);
    const [ searchModalOpen, setSearchModalOpen ] = useState<boolean>(false);
    
    return <nav className="main-navbar">
        <div className="navigation-container">
            <div
                id="open-navigation"
                className="navigation-button"
                role="button"
                onClick={() =>
                {
                    setNavigationModalOpen(true);
                }}
            >
                <i className="fa-solid fa-bars"></i>
            </div>

            <ul className="navigation-list">
                {props.sections.map((section, index) =>
                {
                    return <NavItem key={`link-${index}`} to={section.path === "" ? "/" : `${section.path === "" ? "/" : "/category/"}${section.path}`} className={`navigation-link`}>
                        {section.name}
                    </NavItem>;
                })}
            </ul>

            <div
                id="nav-search-button"
                className="navigation-search"
                role="button"
                onClick={() =>
                {
                    setSearchModalOpen(true);
                }}
            >
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>

        <Modal
            id="navigation-modal"
            className="navigation-modal"
            open={navigationModalOpen}
            closeRequest={() =>
            {
                setNavigationModalOpen(false);
            }}
        >
            <div className="modal-body">
                <header>
                    <div id="navigation-close" className="navigation-close" role="button">
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </header>

                <div id="modal-search-button" className="navigation-search" role="button">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>

                <section>
                    {props.sections.map((section, index) =>
                    {
                        return <Link key={`m-link-${index}`} className="modal-link" to={`${section.path === "" ? "/" : "/category/"}${section.path}`}>
                            {section.name}
                        </Link>;
                    })}
                </section>
            </div>
        </Modal>

        <Modal
            id="search-modal"
            className="search-modal"
            open={searchModalOpen}
            closeRequest={() =>
            {
                setSearchModalOpen(false);
            }}
        >
            <div className="modal-body">
                <input id="search-input" className="search-input" type="text" placeholder="Buscar..." />
                <a id="search-submit" className="search-submit" href="/search/"></a>
            </div>
        </Modal>
    </nav>;
};

export default Navbar;