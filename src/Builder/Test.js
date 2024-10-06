import React, { useEffect, useState } from 'react';

export default function Test({ droppedComponents }) {
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [storedData, setStoredData] = useState({
        title: '',
        description: '',
        code: '',
        limit: 0,
        offset: 0
    });

    // Step 1: Fetch initial data (title, description, code, limit, offset)
    useEffect(() => {
        const fetchInitialData = async () => {
            const apiUrl = 'https://free-ap-south-1.cosmocloud.io/development/api/justpromptclientmodel/66fa3a3d5f4d0ff82cab2116';

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data) {
                    setStoredData({
                        title: data.title || '',
                        description: data.description || '',
                        code: data.code || '',
                        limit: data.limit || 0,
                        offset: data.offset || 0
                    });
                }
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchInitialData();
    }, []);

    // Step 2 & 3: Handle dropped components and append to stored code
    useEffect(() => {
        if (droppedComponents && droppedComponents.length > 0) {
            const apiKey = '434Klvspze2sfsd';

            const questionnaireData = JSON.parse(localStorage.getItem('questionnaireData')) || {};
            const companyName = questionnaireData.companyName || '';
            const goal = questionnaireData.goal || '';

            droppedComponents.forEach(component => {
                const uuid = component.uuid;
                const url = `https://tailwindflex.com/api/mahsook-tech/components/${uuid}`;

                fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-API-KEY': apiKey
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        const newCode = data.data.html || '';

                        // Step 4: Append new code to the previously fetched code
                        const updatedCode = storedData.code + newCode;

                        // Prepare payload with the updated code
                        const payload = {
                            title: storedData.title || companyName,
                            description: storedData.description || goal,
                            code: updatedCode,
                            limit: storedData.limit,
                            offset: storedData.offset
                        };

                        // Step 5: Make PUT request to update the code
                        const apiUrl = 'https://free-ap-south-1.cosmocloud.io/development/api/justpromptclientmodel/66fa3a3d5f4d0ff82cab2116';
                        fetch(apiUrl, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'projectId': '66dc452ca54723b1c14ba1e9',
                                'environmentId': '66dc452ca54723b1c14ba1ea'
                            },
                            body: JSON.stringify(payload)
                        })
                            .then(response => response.json())
                            .then(result => {
                                console.log('Updated successfully:', result);
                                // Trigger re-render to update the iframe
                                setUpdateTrigger(prev => !prev);
                            })
                            .catch(error => {
                                console.error('Error updating code:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Error fetching component data:', error);
                    });
            });
        }
    }, [droppedComponents, storedData]);

    // Render iframe with updated content
    return (
        <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
            <iframe
                key={updateTrigger}
                src="https://justprompt-public.vercel.app/?id=66fa3a3d5f4d0ff82cab2116"
                style={{ width: '100%', height: '100%', border: 'none', overflow: 'hidden' }}
                title="Embedded Webpage"
                scrolling="no"
            />
        </div>
    );
}