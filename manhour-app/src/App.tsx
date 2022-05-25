import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ManhourListPage from "./components/pages/ManhourList";
import HomePage from "./components/pages/HomePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/manhourlists" element={<ManhourListPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;

