import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal, { ModalStatus } from "../../../../components/modal/";
import NavItem from "../../../../components/nav_item/";
import SearchForm from "./components/search_form";

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
    const [ navigationModalStatus, setNavigationModalStatus ] = useState<ModalStatus>(ModalStatus.Closed);
    const [ searchModalStatus, setSearchModalStatus ] = useState<ModalStatus>(ModalStatus.Closed);
    
    return <nav className="main-navbar">
        <div className="navigation-container">
            <div
                id="open-navigation"
                className="navigation-button"
                role="button"
                onClick={() =>
                {
                    setNavigationModalStatus(ModalStatus.Open);
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
                    setSearchModalStatus(ModalStatus.Open);
                }}
            >
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>

        <Modal
            id="navigation-modal"
            className="navigation-modal"
            status={navigationModalStatus}
            closeAnimationTime={250}
            closeRequest={() =>
            {
                setNavigationModalStatus(ModalStatus.Closed);
            }}
        >
            <div className="modal-body">
                <header>
                    <div
                        id="navigation-close"
                        className="navigation-close"
                        role="button"
                        onClick={() =>
                        {
                            setNavigationModalStatus(ModalStatus.Closing);
                        }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </header>

                <div
                    id="modal-search-button"
                    className="navigation-search"
                    role="button"
                    onClick={() =>
                    {
                        setNavigationModalStatus(ModalStatus.Closing);
                        setSearchModalStatus(ModalStatus.Open);
                    }}
                >
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
            status={searchModalStatus}
            closeAnimationTime={250}
            closeRequest={() =>
            {
                setSearchModalStatus(ModalStatus.Closed);
            }}
        >
            <div className="modal-body">
                <SearchForm
                    onSubmit={() =>
                    {
                        setSearchModalStatus(ModalStatus.Closing);
                    }}
                />
            </div>
        </Modal>
    </nav>;
};

export default Navbar;