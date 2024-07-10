//Sections.js
import React from 'react';

function Sections({ sections, onSectionClick }) {
  return (
    <div className="w-1/10 h-full bg-white shadow-md rounded-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Sections</h2>
      <ul>
        {sections.map((section) => (
          <li key={section} className="mb-2">
            <button
              onClick={() => onSectionClick(section)}
              className="text-blue-500 hover:underline"
            >
              {section}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sections;
