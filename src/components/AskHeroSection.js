import React from 'react';

const HeroSection = ({ formData, handleInputChange, addItem, generateContent, templateSelectionImages }) => (
  <div>
    <button type="button" className="float-right mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => generateContent('hero')}>Generate Content</button>
    <label className="block mb-2">Hero Template ID</label>
    {templateSelectionImages('hero', ['hero1', 'hero2', 'hero3'])}
    <label className="block mb-2">Topic</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" value={formData.hero.topic} onChange={(e) => handleInputChange('hero', 'topic', e.target.value)} />
    <label className="block mb-2">Title</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" value={formData.hero.title} onChange={(e) => handleInputChange('hero', 'title', e.target.value)} />
    <label className="block mb-2">Paragraph</label>
    <textarea className="mb-4 p-2 w-full border rounded" value={formData.hero.para} onChange={(e) => handleInputChange('hero', 'para', e.target.value)} />
    <label className="block mb-2">Buttons</label>
    {formData.hero.buttons.map((button, index) => (
      <div key={index} className="mb-2 flex space-x-2">
        <input type="text" className="p-2 w-1/2 border rounded" placeholder="Label" value={button.label} onChange={(e) => handleInputChange('hero', 'buttons', { label: e.target.value }, index)} />
        <input type="text" className="p-2 w-1/2 border rounded" placeholder="Link" value={button.link} onChange={(e) => handleInputChange('hero', 'buttons', { link: e.target.value }, index)} />
      </div>
    ))}
    <button type="button" className="mb-4 px-4 py-2 bg-green-500 text-white rounded" onClick={() => addItem('hero', 'buttons')}>Add Button</button>
    <label className="block mb-2">Image URL</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" value={formData.hero.imageUrl} onChange={(e) => handleInputChange('hero', 'imageUrl', e.target.value)} />
  </div>
);

export default HeroSection;
