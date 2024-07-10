// src/pages/Preview.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function Preview() {
  const location = useLocation();
  const { code } = location.state || { code: '' };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Preview</h1>
      <div dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  );
}

export default Preview;
