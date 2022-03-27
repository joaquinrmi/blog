import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AccountData from "./account_data";
import Dashboard from "../dashboard";
import LoginPage from "./components/login_page/";
import SessionContext from "./session_context";
import SessionData from "./session_data";

import "./admin.scss";

const Admin: React.FunctionComponent = (props) =>
{
    const [ sessionData, setSessionData ] = useState<SessionData>({
        logged: false,
        username: ""
    });

    let content;
    if(sessionData.logged)
    {
        content = <Routes>
            <Route path="/dashboard/*" element={<SessionContext.Consumer>
                {({ logout }) =>
                {
                    return <Dashboard logout={logout} />;
                }}
            </SessionContext.Consumer>} />

            <Route path="/*" element={<Navigate to="/admin/dashboard" />} />
        </Routes>;
    }
    else
    {
        content = <Routes>
            <Route path="/" element={<SessionContext.Consumer>
                {({ login }) =>
                {
                    return <LoginPage login={login} />;
                }}
            </SessionContext.Consumer>} />

            <Route path="/*" element={<Navigate to="/admin" />} />
        </Routes>;
    }

    return <SessionContext.Provider value={{
        session: sessionData,
        login: (data: AccountData) =>
        {
            setSessionData({
                logged: true,
                username: data.username
            });
        },
        logout: () =>
        {
            setSessionData({
                logged: false,
                username: ""
            });
        }
    }}>
        {content}
    </SessionContext.Provider>;
};

export default Admin;