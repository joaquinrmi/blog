import React from "react";
import { Routes, Route } from "react-router-dom";
import Public from "../pages/public/";

import "./app.scss";

const App: React.FunctionComponent = () =>
{
    return <Routes>
        <Route path="/*" element={<Public />} />
    </Routes>
};

export default App;