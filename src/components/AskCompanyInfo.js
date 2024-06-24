import React from 'react';

const CompanyInfo = ({ formData, handleInputChange }) => (
  <div>
    <label className="block mb-2">Company Name</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" value={formData.company.name} onChange={(e) => handleInputChange('company', 'name', e.target.value)} />
    <label className="block mb-2">Company Goal</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" value={formData.company.goal} onChange={(e) => handleInputChange('company', 'goal', e.target.value)} />
    <label className="block mb-2">Logo URL</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" value={formData.company.logoUrl} onChange={(e) => handleInputChange('company', 'logoUrl', e.target.value)} />
  </div>
);

export default CompanyInfo;
