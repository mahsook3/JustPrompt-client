import React from 'react';

const FooterSection = ({ formData, handleInputChange, addItem, generateContent, templateSelectionImages }) => (
  <div>
    <button type="button" className="float-right mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => generateContent('footer')}>Generate Content</button>
    <label className="block mb-2">Footer Template ID</label>
    {templateSelectionImages('footer', ['footer1', 'footer2', 'footer3'])}
    <label className="block mb-2">Company Name</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" value={formData.footer.companyName} onChange={(e) => handleInputChange('footer', 'companyName', e.target.value)} />
    <label className="block mb-2">Company Description</label>
    <textarea className="mb-4 p-2 w-full border rounded" value={formData.footer.companyDescription} onChange={(e) => handleInputChange('footer', 'companyDescription', e.target.value)} />
    <label className="block mb-2">Social Links</label>
    {formData.footer.socialLinks.map((link, index) => (
      <div key={index} className="mb-2 flex space-x-2">
        <input type="text" className="p-2 w-1/2 border rounded" placeholder="Platform" value={link.platform} onChange={(e) => handleInputChange('footer', 'socialLinks', { platform: e.target.value }, index)} />
        <input type="text" className="p-2 w-1/2 border rounded" placeholder="Link" value={link.link} onChange={(e) => handleInputChange('footer', 'socialLinks', { link: e.target.value }, index)} />
      </div>
    ))}
    <button type="button" className="mb-4 px-4 py-2 bg-green-500 text-white rounded" onClick={() => addItem('footer', 'socialLinks')}>Add Social Link</button>
  </div>
);

export default FooterSection;
