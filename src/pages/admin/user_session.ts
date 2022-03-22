import AccountData from "./account_data";
import SessionData from "./session_data";

export default interface UserSession
{
    session: SessionData;
    login(data: AccountData): void;
}