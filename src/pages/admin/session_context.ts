import * as React from "react";
import AccountData from "./account_data";
import UserSession from "./user_session";

const SessionContext = React.createContext<UserSession>({
    session: {
        logged: false,
        id: -1,
        username: ""
    },
    login: (data: AccountData) => {},
    logout: () => {}
});

export default SessionContext;