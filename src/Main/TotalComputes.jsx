import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { PlusCircle, Calculator, Trash2, FileSpreadsheet } from "lucide-react";
import "../css/totalcomputes.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function TotalComputes() {
    const [items, setItems] = useState([{ name: "", quantity: "", price: "" }]);
    const [total, setTotal] = useState(0);

    const formatNumber = (num) => {
        if (num === "" || isNaN(num)) return "";
        return Number(num).toLocaleString("en-PH", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    };

    const parseNumber = (val) =>
        parseFloat(val.toString().replace(/,/g, "")) || 0;

    const handleChange = (index, field, value) => {
        const newItems = [...items];

        if (field === "price") {
            const numericValue = value.replace(/,/g, "");
            if (!/^\d*\.?\d*$/.test(numericValue)) return;
            newItems[index].price =
                numericValue === "" ? "" : formatNumber(numericValue);
        } else if (field === "quantity") {
            newItems[index].quantity = value;
        } else {
            newItems[index].name = value;
        }

        setItems(newItems);
    };

    const handleAddRow = () => {
        const lastItem = items[items.length - 1];

        const isEmpty =
            lastItem.name.trim() === "" ||
            parseNumber(lastItem.quantity) <= 0 ||
            parseNumber(lastItem.price) <= 0;

        if (isEmpty) {
            Swal.fire({
                icon: "warning",
                title: "Incomplete Item",
                text: "Please fill in the current item’s name, quantity, and price before adding a new one.",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        setItems([...items, { name: "", quantity: "", price: "" }]);
    };

    const handleCompute = () => {
        const validItems = items.filter(
            (item) =>
                item.name.trim() !== "" &&
                parseNumber(item.quantity) > 0 &&
                parseNumber(item.price) > 0
        );

        if (validItems.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "No Items to Compute",
                text: "Please enter at least one valid item with name, quantity, and price before computing.",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        const computedTotal = validItems.reduce((sum, item) => {
            const qty = parseNumber(item.quantity);
            const price = parseNumber(item.price);
            return sum + qty * price;
        }, 0);

        setTotal(computedTotal);

        Swal.fire({
            icon: "success",
            title: "Total Computed!",
            text: `Your total is ₱${formatNumber(computedTotal.toFixed(2))}`,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        });
    };

    const handleClear = () => {
        setItems([{ name: "", quantity: "", price: "" }]);
        setTotal(0);
    };

    const handleExportToExcel = () => {
        const validItems = items.filter(
            (item) =>
                item.name.trim() !== "" &&
                parseNumber(item.quantity) > 0 &&
                parseNumber(item.price) > 0
        );

        if (validItems.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "No Data to Export",
                text: "Please add at least one valid item with name, quantity, and price.",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        if (total === 0) {
            Swal.fire({
                icon: "info",
                title: "Compute First",
                text: "Please compute the total before exporting to Excel.",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        const data = validItems.map((item) => ({
            "Item Name": item.name,
            Quantity: parseNumber(item.quantity),
            "Price (₱)": parseNumber(item.price).toFixed(2),
            "Subtotal (₱)": (parseNumber(item.quantity) * parseNumber(item.price)).toFixed(2),
        }));

        data.push({
            "Item Name": "",
            Quantity: "",
            "Price (₱)": "TOTAL",
            "Subtotal (₱)": total.toFixed(2),
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Fast Total");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const date = new Date();
        const formattedDate = date.toISOString().split("T")[0];
        const fileName = `AzarconTotal_${formattedDate}.xlsx`;

        saveAs(blob, fileName);

        Swal.fire({
            icon: "success",
            title: "Exported Successfully!",
            text: `File saved as ${fileName}`,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
        });
    };

    const handleDeleteRow = (index) => {
        Swal.fire({
            title: "Remove Item?",
            text: "Are you sure you want to delete this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const newItems = items.filter((_, i) => i !== index);
                const finalItems = newItems.length > 0 ? newItems : [{ name: "", quantity: "", price: "" }];
                setItems(finalItems);

                const computedTotal = finalItems.reduce((sum, item) => {
                    const qty = parseNumber(item.quantity);
                    const price = parseNumber(item.price);
                    return sum + qty * price;
                }, 0);
                setTotal(computedTotal);

                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: "Item has been removed.",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        });
    };

    return (
        <div className="fast-total-container">
            <div className="fast-total-header">
                <h2>Quick Sales Calculator</h2>
                <button className="export-btn" onClick={handleExportToExcel}>
                    <FileSpreadsheet size={18} /> Save to Excel
                </button>
            </div>

            <div className="fast-total-card">
                <table className="fast-total-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price (₱)</th>
                            <th>Subtotal (₱)</th>
                            {items.length > 1 && <th className="action-header">Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => {
                            const subtotal = parseNumber(item.quantity) * parseNumber(item.price);
                            return (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => handleChange(index, "name", e.target.value)}
                                            placeholder="Enter item name"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleChange(index, "quantity", e.target.value)}
                                            placeholder="0"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.price}
                                            onChange={(e) => handleChange(index, "price", e.target.value)}
                                            placeholder="0.00"
                                        />
                                    </td>
                                    <td>{formatNumber(subtotal.toFixed(2))}</td>

                                    {/* only render delete cell when there are 2+ items */}
                                    {items.length > 1 && (
                                        <td className="action-cell">
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDeleteRow(index)}
                                                title="Delete this item"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="fast-total-buttons">
                <button className="add" onClick={handleAddRow}>
                    <PlusCircle size={16} /> Add Item
                </button>
                <button className="compute" onClick={handleCompute}>
                    <Calculator size={16} /> Compute Total
                </button>
                <button className="clear" onClick={handleClear}>
                    <Trash2 size={16} /> Clear
                </button>
            </div>

            <div className="fast-total-total">
                Total: <span>₱{formatNumber(total.toFixed(2))}</span>
            </div>
        </div>
    );
}
