import React from 'react';

const HeaderSection = ({ formData, handleInputChange, addItem, generateContent, templateSelectionImages }) => (
  <div>
    <button type="button" className="float-right mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => generateContent('header')}>Generate Content</button>
    <label className="block mb-2">Header Template ID</label>
    {templateSelectionImages('header', ['header1', 'header2', 'header3'])}
    <label className="block mb-2">Company Name</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" value={formData.header.companyName} onChange={(e) => handleInputChange('header', 'companyName', e.target.value)} />
    <label className="block mb-2">Logo URL</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" value={formData.header.logoUrl} onChange={(e) => handleInputChange('header', 'logoUrl', e.target.value)} />
    <label className="block mb-2">Menu Items</label>
    {formData.header.menuItems.map((item, index) => (
      <div key={index} className="mb-2 flex space-x-2">
        <input type="text" className="p-2 w-1/2 border rounded" placeholder="Label" value={item.label} onChange={(e) => handleInputChange('header', 'menuItems', { label: e.target.value }, index)} />
        <input type="text" className="p-2 w-1/2 border rounded" placeholder="Link" value={item.link} onChange={(e) => handleInputChange('header', 'menuItems', { link: e.target.value }, index)} />
      </div>
    ))}
    <button type="button" className="mb-4 px-4 py-2 bg-green-500 text-white rounded" onClick={() => addItem('header', 'menuItems')}>Add Menu Item</button>
    <label className="block mb-2">Action Button</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" placeholder="Label" value={formData.header.actionButton.label} onChange={(e) => handleInputChange('header', 'actionButton', { label: e.target.value })} />
    <input type="text" className="mb-4 p-2 w-full border rounded" placeholder="Link" value={formData.header.actionButton.link} onChange={(e) => handleInputChange('header', 'actionButton', { link: e.target.value })} />
  </div>
);

export default HeaderSection;
