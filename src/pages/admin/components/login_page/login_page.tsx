import React, { useEffect } from "react";
import AccountData from "../../account_data";

import "./login_page.scss";

export interface Props
{
    login(data: AccountData): void;
}

const LoginPage: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const form = document.getElementById("admin-login-form") as HTMLFormElement;
        form.addEventListener("submit", (ev) =>
        {
            ev.preventDefault();
            return false;
        });

        const submitButton = document.getElementById("admin-login-submit") as HTMLInputElement;

        submitButton.onclick = async () =>
        {
            const formData = new FormData(form);

            const reqObject: any = {};
            formData.forEach((value, key) =>
            {
                reqObject[key] = value;
            });

            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/account/login`, {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reqObject)
            });

            if(res.status !== 201)
            {
                console.error((await res.json()));
            }
            else
            {
                const data = await res.json();

                props.login({
                    username: data.alias
                });
            }
        };
    });

    return <section className="login-page">
        <div className="login-page-body">
            <h1 className="login-main-title">Blog de ejemplo</h1>

            <div className="login-form-container">
                <form id="admin-login-form" className="login-form">
                    <div className="form-field">
                        <span className="label">
                            Nombre de usuario
                        </span>

                        <input name="aliasOrEmail" type="text" placeholder="Ingrese su nombre de usuario" />
                    </div>

                    <div className="form-field">
                        <span className="label">
                            Contraseña
                        </span>

                        <input name="password" type="password" placeholder="Ingrese su contraseña" />
                    </div>

                    <input id="admin-login-submit" className="form-button" type="submit" value="Enviar" />
                </form>
            </div>
        </div>
    </section>;
};

export default LoginPage;