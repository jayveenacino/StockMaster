import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "../css/mainpanel.css";
import {
    CalendarDays,
    Thermometer,
    Settings,
    Clock,
    Home,
    Users,
    FileText,
    RefreshCcw,
    Gavel,
    BarChart2,
} from "lucide-react";

import Dashboard from "../Main/Dashboard";
import Weather from "../Main/Weather";
import TotalComputes from "./TotalComputes";


const Inventory = () => <h2>Inventory Page</h2>;
const Suppliers = () => <h2>Suppliers Page</h2>;
const Transactions = () => <h2>Transactions Page</h2>;
const Sales = () => <h2>Sales Report Page</h2>;
const Maintenance = () => <h2>Maintenance Page</h2>;
const SettingsPage = () => <h2>Settings Page</h2>;

export default function MainPanel() {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const time = now.toLocaleTimeString("en-US", {
                timeZone: "Asia/Manila",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });

            const date = now.toLocaleDateString("en-US", {
                timeZone: "Asia/Manila",
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            setCurrentTime(`${time} | Today is ${date}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="main-layout">
            <div className="main-content">

                <div className="navbar">
                    <div className="navbar-left">
                        <img src={logo} alt="Logo" className="navbar-logo" />
                        <div className="navbar-text">
                            <h1>AZARCON AQUANET</h1>
                            <p>All Stocks Beneath Your Control</p>
                        </div>
                    </div>

                    <div className="navbar-right">
                        <div className="navbar-time">
                            <Clock size={16} className="navbar-icon" />
                            <span>{currentTime}</span>
                        </div>

                        <div className="navbar-blue-section">
                            <div className="navbar-icons">
                                <div title="Calendar"><CalendarDays size={18} /></div>
                                <div className="navbar-icons">
                                    <NavLink to="/main/weather" title="Check Weather">
                                        <Thermometer size={18} />
                                    </NavLink>
                                </div>
                                <div title="Settings"><Settings size={18} /></div>
                            </div>


                            <div className="navbar-admin">
                                <div className="admin-avatar"></div>
                                <div className="admin-info">
                                    <span className="admin-name">admin</span>
                                    <span className="admin-role">Admin</span>
                                </div>
                                <div className="dropdown-arrow">▼</div>
                            </div>
                        </div>
                    </div>
                </div>

                <aside className="sidebar">
                    <nav className="sidebar-menu">
                        <NavLink to="/main/mainpanel" end>
                            <Home size={18} /> Dashboard
                        </NavLink>

                        <NavLink to="/main/inventory">
                            <FileText size={18} /> Inventory
                        </NavLink>

                        <NavLink to="/main/fasttotal">
                            <Users size={18} /> Sales Calculator
                        </NavLink>

                        <NavLink to="/main/transactions">
                            <RefreshCcw size={18} /> Transactions
                        </NavLink>

                        <NavLink to="/main/sales">
                            <BarChart2 size={18} /> Sales Report
                        </NavLink>

                        <NavLink to="/main/maintenance">
                            <Gavel size={18} /> Maintenance
                        </NavLink>

                        <NavLink to="/main/settings">
                            <Settings size={18} /> Settings
                        </NavLink>
                    </nav>
                </aside>

                <div className="content-area">
                    <Routes>
                        <Route path="mainpanel" element={<Dashboard />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/fasttotal" element={<TotalComputes />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/sales" element={<Sales />} />
                        <Route path="/maintenance" element={<Maintenance />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/weather" element={<Weather />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
