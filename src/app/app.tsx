import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../pages/admin";
import Public from "../pages/public/";

import "./app.scss";

const App: React.FunctionComponent = () =>
{
    return <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/*" element={<Public />} />
    </Routes>
};

export default App;