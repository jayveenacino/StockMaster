import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import MainPanel from "./Main/MainPanel";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/main/*" element={<MainPanel />} />
            </Routes>
        </Router>
    );
}
