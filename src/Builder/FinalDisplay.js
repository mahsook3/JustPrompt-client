import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const FinalDisplay = ({ droppedComponents }) => {
  const [finalCode, setFinalCode] = useState('');
  const [finalCss, setFinalCss] = useState('');
  const [finalConfig, setFinalConfig] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchComponentCode = useCallback(async (uuid) => {
    try {
      const response = await axios.get(
        `https://tailwindflex.com/api/mahsook-tech/components/${uuid}`,
        {
          headers: {
            'X-API-KEY': '434Klvspze2sfsd',
          },
        }
      );
      return response.data.data;
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

        setFinalCode(htmlCode);
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Final Code</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="text-white p-4 rounded-lg">
          {finalCss && <style dangerouslySetInnerHTML={{ __html: finalCss }} />}
          <div dangerouslySetInnerHTML={{ __html: finalCode }} />
          {finalConfig && (
            <script type="application/json" dangerouslySetInnerHTML={{ __html: finalConfig }} />
          )}
        </div>
      )}
    </div>
  );
};

export default FinalDisplay;
