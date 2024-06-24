import React from 'react';

const CallToActionSection = ({ formData, handleInputChange, generateContent, templateSelectionImages }) => (
  <div>
    <button type="button" className="float-right mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => generateContent('callToAction')}>Generate Content</button>
    <label className="block mb-2">Call to Action Template ID</label>
    {templateSelectionImages('callToAction', ['cta1', 'cta2', 'cta3'])}
    <label className="block mb-2">Title</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" value={formData.callToAction.title} onChange={(e) => handleInputChange('callToAction', 'title', e.target.value)} />
    <label className="block mb-2">Description</label>
    <textarea className="mb-4 p-2 w-full border rounded" value={formData.callToAction.description} onChange={(e) => handleInputChange('callToAction', 'description', e.target.value)} />
    <label className="block mb-2">Button Label</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" value={formData.callToAction.buttonLabel} onChange={(e) => handleInputChange('callToAction', 'buttonLabel', e.target.value)} />
    <label className="block mb-2">Button Link</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" value={formData.callToAction.buttonLink} onChange={(e) => handleInputChange('callToAction', 'buttonLink', e.target.value)} />
  </div>
);

export default CallToActionSection;
