import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AccountData from "./account_data";
import LoginPage from "./components/login_page/";

import "./admin.scss";

import SessionContext from "./session_context";
import SessionData from "./session_data";

const Admin: React.FunctionComponent = (props) =>
{
    const [ sessionData, setSessionData ] = useState<SessionData>({
        logged: false,
        username: ""
    });

    let content;
    if(sessionData.logged)
    {
        content = <Routes></Routes>;
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