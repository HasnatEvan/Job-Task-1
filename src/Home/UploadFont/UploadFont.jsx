import { useState } from "react";

const UploadFont = () => {
    const [fontFile, setFontFile] = useState(null);
    const [fontName, setFontName] = useState("");

    const handleFontUpload = (e) => {
        const file = e.target.files[0];

        if (file && file.name.endsWith(".ttf")) {
            const fontURL = URL.createObjectURL(file);
            const customFontName = file.name.replace(".ttf", "").replace(/\s+/g, "-");

            const newFont = new FontFace(customFontName, `url(${fontURL})`);
            newFont.load().then((loadedFont) => {
                document.fonts.add(loadedFont);
                setFontName(customFontName);
                setFontFile(file);
            });
        } else {
            alert("Please upload a valid .ttf file");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-5 border rounded-lg bg-white shadow-md">
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
