import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Modal, { ModalElement } from "../../../../components/modal/";

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
    useEffect(() =>
    {
        const navigationButton = document.getElementById("open-navigation") as HTMLDivElement;
        const navigationModal = document.getElementById("navigation-modal") as ModalElement;
        const navigationCloseButton = document.getElementById("navigation-close") as HTMLDivElement;

        navigationButton.onclick = () =>
        {
            navigationModal.open();
        };

        const closeNavigationModal = () =>
        {
            navigationModal.classList.remove("opened");
            navigationModal.classList.add("closing");
            setTimeout(() =>
            {
                navigationModal.classList.remove("closing");
                navigationModal.classList.add("closed");
            },
            250);
        };

        navigationModal.onclick = (ev) =>
        {
            if(ev.target === navigationModal)
            {
                closeNavigationModal();
            }
        };

        navigationCloseButton.onclick = () =>
        {
            closeNavigationModal();
        };

        const searchButton = document.getElementById("nav-search-button") as HTMLDivElement;
        const searchModal = document.getElementById("search-modal") as ModalElement;

        searchButton.onclick = () =>
        {
            searchModal.open();
        };
    });
    
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

            <div id="nav-search-button" className="navigation-search" role="button">
                <i className="fi fi-rr-search"></i>
            </div>
        </div>

        <Modal id="navigation-modal" className="navigation-modal">
            <div className="modal-body">
                <header>
                    <div id="navigation-close" className="navigation-close" role="button">
                        <i className="fi fi-rr-cross"></i>
                    </div>
                </header>

                <section>
                    {props.sections.map((section, index) =>
                    {
                        return <Link key={`m-link-${index}`} className="modal-link" to={section.path}>
                            {section.name}
                        </Link>;
                    })}
                </section>
            </div>
        </Modal>

        <Modal id="search-modal">
            <div className="modal-body">
            </div>
        </Modal>
    </nav>;
};

export default Navbar;