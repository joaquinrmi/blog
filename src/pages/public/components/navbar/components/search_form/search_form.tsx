import React, { FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";

import "./search_form.scss";

export interface Props
{
    onSubmit(): void;
}

interface SearchFormElement extends HTMLFormElement
{
    keywords: HTMLInputElement;
}

const SearchForm: React.FunctionComponent<Props> = (props) =>
{
    const navigate = useNavigate();

    const onFormSubmit: FormEventHandler<HTMLFormElement> = (ev) =>
    {
        ev.preventDefault();

        const form = ev.target as SearchFormElement;

        if(form.keywords.value.trim().length === 0)
        {
            return;
        }

        navigate(`/search/${form.keywords.value}`);
        form.keywords.value = "";

        props.onSubmit();
    };

    return <form className="search-form" onSubmit={onFormSubmit}>
        <input className="search-input" name="keywords" type="text" placeholder="Buscar..." />

        <input type="submit" className="invisible" />
    </form>;
};

export default SearchForm;