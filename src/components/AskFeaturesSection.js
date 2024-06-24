import React from 'react';

const FeaturesSection = ({ formData, handleInputChange, addItem, generateContent, templateSelectionImages }) => (
  <div>
    <button type="button" className="float-right mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => generateContent('features')}>Generate Content</button>
    <label className="block mb-2">Features Template ID</label>
    {templateSelectionImages('features', ['features1', 'features2', 'features3'])}
    <label className="block mb-2">Title</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" value={formData.features.title} onChange={(e) => handleInputChange('features', 'title', e.target.value)} />
    <label className="block mb-2">Description</label>
    <textarea className="mb-4 p-2 w-full border rounded" value={formData.features.description} onChange={(e) => handleInputChange('features', 'description', e.target.value)} />
    <label className="block mb-2">Items</label>
    {formData.features.items.map((item, index) => (
      <div key={index} className="mb-2 flex space-x-2">
        <input type="text" className="p-2 w-1/2 border rounded" placeholder="Title" value={item.title} onChange={(e) => handleInputChange('features', 'items', { title: e.target.value }, index)} />
        <input type="text" className="p-2 w-1/2 border rounded" placeholder="Description" value={item.description} onChange={(e) => handleInputChange('features', 'items', { description: e.target.value }, index)} />
      </div>
    ))}
    <button type="button" className="mb-4 px-4 py-2 bg-green-500 text-white rounded" onClick={() => addItem('features', 'items')}>Add Feature</button>
  </div>
);

export default FeaturesSection;
