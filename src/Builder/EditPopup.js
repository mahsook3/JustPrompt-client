//EditPopup.js
import React, { useState, useEffect } from 'react';

const EditPopup = ({ data, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        heading: '',
        text: '',
        buttontext: '',
        imageurl: ''
    });

    useEffect(() => {
        if (data) {
            setFormData({
                heading: (data.heading || []).join(', '),
                text: data.text || '',
                buttontext: (data.buttontext || []).join(', '),
                imageurl: (data.imageurl || []).join(', ')
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const updatedData = {
            heading: formData.heading.split(',').map(item => item.trim()),
            text: formData.text,
            buttontext: formData.buttontext.split(',').map(item => item.trim()),
            imageurl: formData.imageurl.split(',').map(item => item.trim())
        };
        onSave(updatedData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">Edit Data</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Heading</label>
                    <input
                        type="text"
                        name="heading"
                        value={formData.heading}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Text</label>
                    <input
                        type="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Button Text</label>
                    <input
                        type="text"
                        name="buttontext"
                        value={formData.buttontext}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="imageurl"
                        value={formData.imageurl}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPopup;