import React, { useState } from "react";
import { Routes } from "react-router-dom";
import AccountData from "./account_data";

import "./admin.scss";

import SessionContext from "./session_context";
import SessionData from "./session_data";

const Admin: React.FunctionComponent = (props) =>
{
    const [ sessionData, setSessionData ] = useState<SessionData>({
        logged: true,
        id: -1,
        username: ""
    });

    let content;
    if(sessionData.logged)
    {
        content = <Routes></Routes>;
    }
    else
    {
        content = <Routes></Routes>;
    }

    return <SessionContext.Provider value={{
        session: sessionData,
        login: (data: AccountData) =>
        {
            setSessionData({
                logged: true,
                id: data.id,
                username: data.username
            });
        },
        logout: () =>
        {
            setSessionData({
                logged: false,
                id: -1,
                username: ""
            });
        }
    }}>
        {content}
    </SessionContext.Provider>;
};

export default Admin;