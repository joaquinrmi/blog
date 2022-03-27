import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export interface Props
{
    to: string;
    id?: string;
    className?: string;
}

const NavItem: React.FunctionComponent<Props> = (props) =>
{
    let resolved = useResolvedPath(props.to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return <li id={props.id} className={`${props.className} ${match ? "active" : ""}`}>
        <Link to={props.to}>
            {props.children}
        </Link>
    </li>
};

export default NavItem;