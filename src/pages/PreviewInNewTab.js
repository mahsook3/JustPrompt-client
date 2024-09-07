import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PreviewInNewTab = () => {
  const [finalCode, setFinalCode] = useState("");
  const [finalCss, setFinalCss] = useState("");
  const [publishedUrl, setPublishedUrl] = useState("");

  useEffect(() => {
    const previewData = JSON.parse(localStorage.getItem("previewData"));
    console.log('previewData:', previewData); // Debugging log
    if (previewData) {
      setFinalCode(previewData.finalCode);
      setFinalCss(previewData.finalCss);
    }
  }, []);

  const handleMakeItPublic = async () => {
    const questionnaireData = JSON.parse(localStorage.getItem("questionnaireData"));
    console.log('questionnaireData:', questionnaireData); // Debugging log

    const workplaceUrl = questionnaireData?.workplaceUrl;
    const goal = questionnaireData?.goal;

    if (questionnaireData && workplaceUrl && goal) {
      const data = {
        title: workplaceUrl,
        description: goal,
        code: finalCode
      };

      const headers = {
        'environmentId': '66dc452ca54723b1c14ba1ea',
        'projectId': '66dc452ca54723b1c14ba1e9',
        'Content-Type': 'application/json'
      };

      console.log('Data:', data);
      console.log('Headers:', headers);

      try {
        const response = await axios.post('https://free-ap-south-1.cosmocloud.io/development/api/justpromptclientmodel', data, { headers });
        console.log('Response:', response.data);
        const publishedId = response.data.id;
        const publishedUrl = `https://justprompt.vercel.app/published/${publishedId}`;
        setPublishedUrl(publishedUrl);

        // Ensure document is focused before writing to clipboard
        if (document.hasFocus()) {
          navigator.clipboard.writeText(publishedUrl).then(() => {
            toast.success('Published successfully! URL copied to clipboard.');
          }).catch(err => {
            console.error('Failed to copy URL to clipboard:', err);
            toast.success(`Published successfully! URL: ${publishedUrl}`);
          });
        } else {
          toast.success(`Published successfully! URL: ${publishedUrl}`);
        }
      } catch (error) {
        console.error('Error making it public:', error);
        toast.error('Failed to publish.');
      }
    } else {
      console.error('Required data is missing from localStorage');
      toast.error('Required data is missing from localStorage');
    }
  };

  return (
    <>
      <button onClick={handleMakeItPublic}>Make it Public</button>
      {parse(finalCode)}
      {publishedUrl && <p>Published URL: <a href={publishedUrl} target="_blank" rel="noopener noreferrer">{publishedUrl}</a></p>}
      <ToastContainer />
    </>
  );
};

export default PreviewInNewTab;