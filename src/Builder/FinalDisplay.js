import React, { useEffect, useState, useCallback } from 'react';
import codebase from '../codebase.json';
import Loading from '../components/Loading';

const FinalDisplay = ({ droppedComponents }) => {
  console.log("From FinalDisplay.js", droppedComponents);
  const [finalCode, setFinalCode] = useState('');
  const [finalCss, setFinalCss] = useState('');
  const [finalConfig, setFinalConfig] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchComponentCode = useCallback((uuid) => {
    try {
      const component = codebase.find((comp) => comp.uuid === uuid);
      if (!component) {
        throw new Error('Component not found');
      }
      return component;
    } catch (err) {
      console.error('Error fetching component code:', err);
      throw new Error('Error fetching component code');
    }
  }, []);

  useEffect(() => {
    const fetchAllCodes = async () => {
      if (droppedComponents.length === 0) {
        setFinalCode('');
        setFinalCss('');
        setFinalConfig('');
        return;
      }

      setLoading(true);
      setError('');
      try {
        const codes = await Promise.all(
          droppedComponents.map((component) => fetchComponentCode(component.uuid))
        );

        const htmlCode = codes.map((code) => code.html || '').join('\n');
        const cssCode = codes.map((code) => code.tw_css || '').join('\n');
        const configCode = codes.map((code) => code.tw_config || '').join('\n');

        // Get data from localStorage
        const questionnaireData = JSON.parse(localStorage.getItem('questionnaireData'));

        // Prepare payload
        const payload = {
          html: htmlCode,
          company: questionnaireData.companyName,
          goal: questionnaireData.goal,
          keywords: questionnaireData.keywords.join(', '),
          color: "questionnaireData.color"
        };

        // Post data to API
        const response = await fetch('https://codemodifier.onrender.com/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // Replace existing htmlCode with the response
        setFinalCode(result.html);
        setFinalCss(cssCode);
        setFinalConfig(configCode);
      } catch (error) {
        console.error('Error fetching component codes:', error.message);
        setError('Error fetching component codes');
      } finally {
        setLoading(false);
      }
    };

    fetchAllCodes();
  }, [droppedComponents, fetchComponentCode]);

  const openInNewTab = () => {
    localStorage.setItem('previewData', JSON.stringify({ finalCode, finalCss }));
    window.open('/preview-in-new-tab', '_blank');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Preview</h2>
        <button
          onClick={openInNewTab}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Open in New Tab
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="text-white p-4 rounded-lg">
          <div dangerouslySetInnerHTML={{ __html: finalCode }} />
        </div>
      )}
    </div>
  );
};

export default FinalDisplay;
