import AccountData from "./account_data";

export default interface SessionData extends AccountData
{
    logged: boolean;
}