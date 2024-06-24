import React from 'react';

const ThemeSelection = ({ formData, handleInputChange }) => (
  <div>
    <label className="block mb-2">Theme</label>
    <select className="mb-4 p-2 w-full border rounded" value={formData.theme.theme} onChange={(e) => handleInputChange('theme', 'theme', e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
    <label className="block mb-2">Color Theme</label>
    <input type="color" className="mb-4 p-2 w-full border rounded" value={formData.theme.color} onChange={(e) => handleInputChange('theme', 'color', e.target.value)} />
  </div>
);

export default ThemeSelection;
