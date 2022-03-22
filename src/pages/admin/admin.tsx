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

    return <SessionContext.Provider value={{
        session: sessionData,
        login: (data: AccountData) =>
        {
            setSessionData({
                logged: true,
                id: data.id,
                username: data.username
            });
        }
    }}>
        <Routes></Routes>
    </SessionContext.Provider>;
};

export default Admin;