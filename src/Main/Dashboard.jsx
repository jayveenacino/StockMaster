import React from "react";
import { Fish, Ship, Banknote, BarChart3 } from "lucide-react";
import "../css/dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard-container">

            <div className="stats-grid">
                <div className="stat-card teal">
                    <div className="stat-icon"><Fish size={28} /></div>
                    <div>
                        <h3>Total Fish Stock</h3>
                        <p>12,430 kg</p>
                    </div>
                </div>
                <div className="stat-card blue">
                    <div className="stat-icon"><Ship size={28} /></div>
                    <div>
                        <h3>Boats Active</h3>
                        <p>18</p>
                    </div>
                </div>
                <div className="stat-card green">
                    <div className="stat-icon"><Banknote size={28} /></div>
                    <div>
                        <h3>Monthly Sales</h3>
                        <p>₱42,850</p>
                    </div>
                </div>
                <div className="stat-card orange">
                    <div className="stat-icon"><BarChart3 size={28} /></div>
                    <div>
                        <h3>Pending Orders</h3>
                        <p>7</p>
                    </div>
                </div>
            </div>

            <div className="table-section">
                <h2>Recent Fish Stock</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Species</th>
                            <th>Quantity (kg)</th>
                            <th>Boat</th>
                            <th>Date Caught</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tuna</td>
                            <td>2,100</td>
                            <td>Sea Queen</td>
                            <td>2025-11-09</td>
                        </tr>
                        <tr>
                            <td>Salmon</td>
                            <td>1,250</td>
                            <td>Blue Wave</td>
                            <td>2025-11-08</td>
                        </tr>
                        <tr>
                            <td>Cod</td>
                            <td>1,800</td>
                            <td>Ocean Star</td>
                            <td>2025-11-07</td>
                        </tr>
                        <tr>
                            <td>Mackerel</td>
                            <td>950</td>
                            <td>Coral Wind</td>
                            <td>2025-11-06</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
