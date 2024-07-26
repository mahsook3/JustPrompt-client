//Builder/Form.js
import React, { useState, useEffect } from 'react';
import codebase from '../codebase.json';

const Form = ({ component, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({});
  const [componentData, setComponentData] = useState(null);

  useEffect(() => {
    // Find the component by UUID from the codebase
    const matchedComponent = codebase.find(comp => comp.uuid === component.uuid);
    setComponentData(matchedComponent);

    if (matchedComponent) {
      // Parse HTML to extract text and attribute values
      const parser = new DOMParser();
      const doc = parser.parseFromString(matchedComponent.html, 'text/html');

      // Extract text from specified elements
      const textElements = [
        'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'span', 'div', 'strong',
        'em', 'b', 'i', 'u', 'mark', 'small', 'del', 'ins', 'sub', 'sup',
        'blockquote', 'code', 'pre', 'q', 'abbr', 'address', 'cite', 'dfn',
        'kbd', 'samp', 'var'
      ];

      const inputs = {};
      textElements.forEach((tagName) => {
        const elements = doc.querySelectorAll(tagName);
        elements.forEach((el, idx) => {
          inputs[`${tagName}-${idx}`] = el.innerText;
        });
      });

      // Extract src attributes from img elements
      const imgElements = doc.querySelectorAll('img');
      imgElements.forEach((img, index) => {
        inputs[`img-src-${index}`] = img.src;
      });

      // Extract href attributes from a elements
      const aElements = doc.querySelectorAll('a');
      aElements.forEach((a, index) => {
        inputs[`a-href-${index}`] = a.href;
      });

      setFormData(inputs);
    }
  }, [component.uuid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = () => {
    if (!componentData) return;

    // Update HTML based on user input
    const parser = new DOMParser();
    const doc = parser.parseFromString(componentData.html, 'text/html');

    Object.keys(formData).forEach((key) => {
      const [tagName, index] = key.split('-');
      if (tagName === 'img') {
        const imgElements = doc.querySelectorAll('img');
        if (imgElements[index]) {
          imgElements[index].src = formData[key];
        }
      } else if (tagName === 'a') {
        const aElements = doc.querySelectorAll('a');
        if (aElements[index]) {
          aElements[index].href = formData[key];
        }
      } else {
        const elements = doc.querySelectorAll(tagName);
        if (elements[index]) {
          elements[index].innerText = formData[key];
        }
      }
    });

    const updatedComponent = { ...component, html: doc.body.innerHTML };
    onUpdate(updatedComponent); // Send updated component back to parent
  };

  if (!componentData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4">
        <h2 className="text-2xl font-bold mb-4">Edit Component</h2>
        <form>
          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 mb-2">{key}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
        </form>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
