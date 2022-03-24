import React from "react";
import AccountData from "../../account_data";

import "./login_page.scss";

export interface Props
{
    login(data: AccountData): void;
}

const LoginPage: React.FunctionComponent<Props> = (props) =>
{
    return <section className="login-page">
        <div className="login-page-body">
            <h1 className="login-main-title">Blog de ejemplo</h1>

            <div className="login-form-container">
                <form className="login-form" method="POST">
                    <div className="form-field">
                        <span className="label">
                            Nombre de usuario
                        </span>

                        <input name="username" type="text" placeholder="Ingrese su nombre de usuario" />
                    </div>

                    <div className="form-field">
                        <span className="label">
                            Contraseña
                        </span>

                        <input name="password" type="password" placeholder="Ingrese su contraseña" />
                    </div>

                    <input className="form-button" type="submit" value="Enviar" />
                </form>
            </div>
        </div>
    </section>;
};

export default LoginPage;