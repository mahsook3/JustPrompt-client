import React from 'react';

const TestimonialsSection = ({ formData, handleInputChange, addItem, generateContent, templateSelectionImages }) => (
  <div>
    <button type="button" className="float-right mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => generateContent('testimonials')}>Generate Content</button>
    <label className="block mb-2">Testimonials Template ID</label>
    {templateSelectionImages('testimonials', ['testimonials1', 'testimonials2', 'testimonials3'])}
    <label className="block mb-2">Title</label>
    <input type="text" className="mb-4 p-2 w-full border rounded" value={formData.testimonials.title} onChange={(e) => handleInputChange('testimonials', 'title', e.target.value)} />
    <label className="block mb-2">Description</label>
    <textarea className="mb-4 p-2 w-full border rounded" value={formData.testimonials.description} onChange={(e) => handleInputChange('testimonials', 'description', e.target.value)} />
    <label className="block mb-2">Items</label>
    {formData.testimonials.items.map((item, index) => (
      <div key={index} className="mb-2 flex space-x-2">
        <input type="text" className="p-2 w-1/2 border rounded" placeholder="Name" value={item.name} onChange={(e) => handleInputChange('testimonials', 'items', { name: e.target.value }, index)} />
        <input type="text" className="p-2 w-1/2 border rounded" placeholder="Quote" value={item.quote} onChange={(e) => handleInputChange('testimonials', 'items', { quote: e.target.value }, index)} />
      </div>
    ))}
    <button type="button" className="mb-4 px-4 py-2 bg-green-500 text-white rounded" onClick={() => addItem('testimonials', 'items')}>Add Testimonial</button>
  </div>
);

export default TestimonialsSection;
