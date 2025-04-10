import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ShowFontGroup = () => {
    const [fontGroups, setFontGroups] = useState([]);
    const [fontsMap, setFontsMap] = useState({});
    const [editingGroup, setEditingGroup] = useState(null);
    const [newTitle, setNewTitle] = useState("");

    // Load font groups and fonts
    useEffect(() => {
        axios.get("https://job-assignment-server-steel.vercel.app/groupfonts")
            .then(res => setFontGroups(res.data))
            .catch(err => console.error(err));

        axios.get("https://job-assignment-server-steel.vercel.app/fonts") // Assuming this gives font list with _id & name
            .then(res => {
                const map = {};
                res.data.forEach(font => {
                    map[font._id] = font.name;
                });
                setFontsMap(map);
            })
            .catch(err => console.error(err));
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://job-assignment-server-steel.vercel.app/groupfonts/${id}`)
                    .then(() => {
                        setFontGroups(prev => prev.filter(group => group._id !== id));
                        Swal.fire("Deleted!", "Font group has been deleted.", "success");
                    })
                    .catch(err => console.error(err));
            }
        });
    };

    const handleEdit = (group) => {
        setEditingGroup(group);
        setNewTitle(group.title);
    };

    const handleUpdate = (id) => {
        axios.put(`https://job-assignment-server-steel.vercel.app/groupfonts/${id}`, { title: newTitle })
            .then(() => {
                setFontGroups(prev =>
                    prev.map(group =>
                        group._id === id ? { ...group, title: newTitle } : group
                    )
                );
                setEditingGroup(null);
                Swal.fire("Updated!", "Font group updated successfully.", "success");
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-xl font-bold mb-2">Our Font Groups</h2>
            <p className="mb-4 text-sm text-gray-600">List of all available font groups.</p>

            <div className="overflow-x-auto shadow-sm rounded bg-white">
                <table className="min-w-full text-sm text-left border">
                    <thead className="bg-gray-100 text-gray-800 font-semibold">
                        <tr>
                            <th className="px-4 py-2 border">NAME</th>
                            <th className="px-4 py-2 border">FONTS</th>
                            <th className="px-4 py-2 border">COUNT</th>
                            <th className="px-4 py-2 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fontGroups.map(group => (
                            <tr key={group._id} className="border-t">
                                <td className="px-4 py-2 border font-medium">
                                    {editingGroup && editingGroup._id === group._id ? (
                                        <input
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            className="border p-1 rounded text-sm"
                                        />
                                    ) : (
                                        group.title
                                    )}
                                </td>
                                <td className="px-4 py-2 border">
                                    {group.fonts
                                        .map(f => fontsMap[f.fontId] || "Unknown")
                                        .join(", ")}
                                </td>
                                <td className="px-4 py-2 border text-center">{group.fonts.length}</td>
                                <td className="px-4 py-2 border text-center">
                                    {editingGroup && editingGroup._id === group._id ? (
                                        <>
                                            <button
                                                onClick={() => handleUpdate(group._id)}
                                                className="text-white bg-blue-600 px-3 py-1 rounded text-xs mr-2"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingGroup(null)}
                                                className="text-gray-500 px-3 py-1 text-xs"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEdit(group)}
                                                className="text-blue-600 text-xs mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(group._id)}
                                                className="text-red-600 text-xs"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {fontGroups.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No font groups found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShowFontGroup;
