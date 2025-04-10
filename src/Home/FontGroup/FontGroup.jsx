import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const FontGroup = () => {
    const [fonts, setFonts] = useState([]);
    const [rows, setRows] = useState([{ id: Date.now(), fontId: "", price: 1.00, quantity: 0 }]);
    const [groupTitle, setGroupTitle] = useState("");

    // Fetch fonts when component mounts
    const fetchFonts = () => {
        axios.get("https://job-assignment-server-steel.vercel.app/fonts")
            .then(res => setFonts(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchFonts();
    }, []);

    const handleFontChange = (id, value) => {
        setRows(prev =>
            prev.map(row => row.id === id ? { ...row, fontId: value } : row)
        );
    };

    const handlePriceChange = (id, value) => {
        setRows(prev =>
            prev.map(row => row.id === id ? { ...row, price: value } : row)
        );
    };

    const handleQuantityChange = (id, value) => {
        setRows(prev =>
            prev.map(row => row.id === id ? { ...row, quantity: value } : row)
        );
    };

    const handleAddRow = () => {
        setRows(prev => [...prev, { id: Date.now(), fontId: "", price: 1.00, quantity: 0 }]);
    };

    const handleRemoveRow = (id) => {
        setRows(prev => prev.filter(row => row.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (groupTitle.trim() === "") {
            return Swal.fire({
                icon: "warning",
                title: "Group Title Required",
                text: "Please enter a group title.",
            });
        }

        const selectedFonts = rows.filter(row => row.fontId !== "");
        if (selectedFonts.length < 2) {
            return Swal.fire({
                icon: "warning",
                title: "Oops!",
                text: "At least two fonts are required to create a group.",
            });
        }

        const groupData = {
            title: groupTitle,
            fonts: selectedFonts.map(row => ({
                fontId: row.fontId,
                price: row.price,
                quantity: row.quantity,
            })),
        };

        axios.post("https://job-assignment-server-steel.vercel.app/groupfonts", groupData)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Group Created!",
                    text: "Your font group has been created successfully.",
                }).then(() => {
                    // Reload the page after the success alert
                    window.location.reload();
                });
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong while creating the font group.",
                });
            });
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <input
                type="text"
                placeholder="Group Title"
                value={groupTitle}
                onChange={e => setGroupTitle(e.target.value)}
                className="border p-2 w-full mb-4 rounded text-sm sm:text-base"
                required
            />

            {rows.map((row) => (
                <div key={row.id} className="flex flex-col sm:flex-row gap-2 mb-2 items-center border p-3 rounded shadow-sm bg-white">
                    <div className="flex-1">
                        <input
                            type="text"
                            value="Font Name"
                            disabled
                            className="text-sm text-gray-500 border px-2 py-1 rounded w-full bg-gray-50"
                        />
                    </div>

                    <div className="flex-1">
                        <select
                            value={row.fontId}
                            onChange={e => handleFontChange(row.id, e.target.value)}
                            className="border rounded w-full text-sm px-2 py-1"
                        >
                            <option value="">Select a Font</option>
                            {fonts.map(font => (
                                <option key={font._id} value={font._id}>{font.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-28">
                        <input
                            type="number"
                            value={row.price}
                            onChange={e => handlePriceChange(row.id, parseFloat(e.target.value))}
                            className="border px-2 py-1 rounded w-full text-sm"
                        />
                    </div>

                    <div className="w-28">
                        <input
                            type="number"
                            value={row.quantity}
                            onChange={e => handleQuantityChange(row.id, parseInt(e.target.value))}
                            className="border px-2 py-1 rounded w-full text-sm"
                        />
                    </div>

                    <button
                        onClick={() => handleRemoveRow(row.id)}
                        className="text-red-500 text-lg px-2 hover:text-red-700"
                        title="Remove row"
                    >
                        ✕
                    </button>
                </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
                <button
                    onClick={handleAddRow}
                    className="border border-green-600 text-green-700 px-4 py-1 rounded hover:bg-green-100 text-sm"
                >
                    + Add Row
                </button>

                <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 text-sm"
                >
                    Create
                </button>
            </div>
        </div>
    );
};

export default FontGroup;
