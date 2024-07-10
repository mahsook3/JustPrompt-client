//CodeDisplay.js
import React from 'react';

function CodeDisplay({ code }) {
  const openInNewTab = () => {
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
        <head>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>${code}</body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="w-1/2 h-full bg-white shadow-md rounded-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 flex justify-between">
        Code Display
        <button onClick={openInNewTab} className="text-blue-500 hover:underline">
          Open in New Tab
        </button>
      </h2>
      <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-full">
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
    </div>
  );
}

export default CodeDisplay;
