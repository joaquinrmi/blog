import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AccountData from "./account_data";
import Dashboard from "../dashboard";
import LoginPage from "./components/login_page/";
import SessionContext from "./session_context";
import SessionData from "./session_data";

import "./admin.scss";

const Admin: React.FunctionComponent = (props) =>
{
    const [ restorSession, setRestoreSession ] = useState<boolean>(true);

    const [ sessionData, setSessionData ] = useState<SessionData>({
        logged: false,
        username: ""
    });

    useEffect(() =>
    {
        if(!restorSession)
        {
            return;
        }

        const url = `${process.env.REACT_APP_SERVER}/api/account/restore-session`;

        (async () =>
        {
            const res = await fetch(url, {
                method: "POST",
                credentials: "include"
            });

            if(res.status === 200)
            {
                setRestoreSession(false);

                setSessionData({
                    logged: true,
                    username: (await res.json()).alias
                });
            }
            else
            {
                setRestoreSession(false);
            }
        })();
    });

    if(restorSession)
    {
        return <></>;
    }

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