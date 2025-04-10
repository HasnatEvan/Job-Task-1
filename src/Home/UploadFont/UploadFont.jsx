import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UploadFont = () => {
    const [fontFile, setFontFile] = useState(null);
    const [fontName, setFontName] = useState("");

    const handleFontUpload = async (e) => {
        const file = e.target.files[0];

        if (file && file.name.endsWith(".ttf")) {
            const fontURL = URL.createObjectURL(file);
            const customFontName = file.name.replace(".ttf", "").replace(/\s+/g, "-");

            const newFont = new FontFace(customFontName, `url(${fontURL})`);
            newFont.load().then(async (loadedFont) => {
                document.fonts.add(loadedFont);
                setFontName(customFontName);
                setFontFile(file);

                const formData = new FormData();
                formData.append("font", file);
                formData.append("fontName", customFontName);

                try {
                    await axios.post("https://job-assignment-server-steel.vercel.app/fonts", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    // SweetAlert
                    Swal.fire({
                        title: "Success!",
                        text: "Font uploaded successfully.",
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(() => {
                        window.location.reload(); // Refresh page after alert
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Font upload failed.",
                        icon: "error",
                        confirmButtonText: "Try Again",
                    });
                    console.error(error);
                }
            });
        } else {
            Swal.fire({
                title: "Invalid File!",
                text: "Please upload a valid .ttf file",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-5 border rounded-lg bg-white shadow-md ">
            <div className="border-dashed border-2 border-gray-400 p-10 text-center rounded-md cursor-pointer">
                <label htmlFor="font-upload" className="cursor-pointer">
                    <p className="text-gray-600">Click to upload a .ttf font file</p>
                    <p className="text-sm text-gray-400">(Only .ttf allowed)</p>
                </label>
                <input
                    type="file"
                    id="font-upload"
                    accept=".ttf"
                    onChange={handleFontUpload}
                    className="hidden"
                />
            </div>

            {fontFile && (
                <div className="mt-6 text-center">
                    <p className="mb-2 font-medium">Uploaded Font: {fontFile.name}</p>
                    <p style={{ fontFamily: fontName }} className="text-xl border p-4 rounded bg-gray-100">
                        This is a font preview
                    </p>
                </div>
            )}
        </div>
    );
};

export default UploadFont;
