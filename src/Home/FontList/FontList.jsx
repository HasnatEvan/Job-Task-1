import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const FontList = () => {
    const [fonts, setFonts] = useState([]);

    // Load fonts from backend
    const loadFonts = () => {
        axios.get('http://localhost:5000/fonts')
            .then(res => setFonts(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        loadFonts();
    }, []);

    // Delete font with SweetAlert confirmation
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/fonts/${id}`);
                    // Reload the fonts after deletion
                    loadFonts();

                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Font has been deleted.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error!', 'Failed to delete the font.', 'error');
                }
            }
        });
    };

    return (
        <div className="p-6 container mx-auto">
            <h2 className="text-xl font-semibold mb-2">Our Fonts</h2>
            <p className="mb-4 text-gray-500">
                Browse a list of Zepto fonts to build your font group.
            </p>
            <div className="overflow-x-auto">
                <table className="min-w-full border text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2">Font Name</th>
                            <th className="p-2">Preview</th>
                            <th className="p-2 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fonts.map(font => (
                            <tr key={font._id} className="border-t">
                                <td className="p-2">{font.name}</td>
                                <td className="p-2" style={{ fontFamily: font.name }}>
                                    Example Style
                                </td>
                                <td className="p-2 text-right">
                                    <button
                                        onClick={() => handleDelete(font._id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {fonts.length === 0 && (
                            <tr>
                                <td colSpan="3" className="p-4 text-center">
                                    No fonts available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FontList;
