import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Modal, { ModalElement } from "../../../../components/modal/";
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
        
        const searchInput = document.getElementById("search-input") as HTMLInputElement;

        searchButton.onclick = () =>
        {
            searchModal.open();
            searchInput.focus();
        };

        const closeSearchModal = () =>
        {
            searchModal.classList.remove("opened");
            searchModal.classList.add("closing");
            setTimeout(() =>
            {
                searchModal.classList.remove("closing");
                searchModal.classList.add("closed");
            },
            250);
        };

        searchModal.onclick = (ev) =>
        {
            if(ev.target === searchModal)
            {
                closeSearchModal();
            }
        };

        const searchSubmit = document.getElementById("search-submit") as HTMLLinkElement;

        searchInput.onkeyup = ev =>
        {
            if(ev.key === "Enter")
            {
                searchSubmit.href = `/search/${searchInput.value}`
                searchSubmit.click();
            }
        };
    });
    
    return <nav className="main-navbar">
        <div className="navigation-container">
            <div id="open-navigation" className="navigation-button" role="button">
                <i className="fa-solid fa-bars"></i>
            </div>

            <ul className="navigation-list">
                {props.sections.map((section, index) =>
                {
                    return <NavItem key={`link-${index}`} to={section.path === "" ? "/" : `/category/${section.path}`} className={`navigation-link`}>
                        {section.name}
                    </NavItem>;
                })}
            </ul>

            <div id="nav-search-button" className="navigation-search" role="button">
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>

        <Modal id="navigation-modal" className="navigation-modal">
            <div className="modal-body">
                <header>
                    <div id="navigation-close" className="navigation-close" role="button">
                        <i className="fa-solid fa-xmark"></i>
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

        <Modal id="search-modal" className="search-modal">
            <div className="modal-body">
                <input id="search-input" className="search-input" type="text" placeholder="Buscar..." />
                <a id="search-submit" className="search-submit" href="/search/"></a>
            </div>
        </Modal>
    </nav>;
};

export default Navbar;