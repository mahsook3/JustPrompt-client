//Test.js
import React, { useEffect, useState } from 'react';

export default function Test({ droppedComponents }) {
    const [updateTrigger, setUpdateTrigger] = useState(false);

    useEffect(() => {
        if (droppedComponents && droppedComponents.length > 0) {
            const apiKey = '434Klvspze2sfsd';
            const projectId = '66dc452ca54723b1c14ba1e9';
            const environmentId = '66dc452ca54723b1c14ba1ea';

            const questionnaireData = JSON.parse(localStorage.getItem('questionnaireData'));
            const companyName = questionnaireData?.companyName || '';
            const goal = questionnaireData?.goal || '';

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
                    const htmlString = data.data.html;
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlString, 'text/html');

                    const headings = Array.from(new Set(Array.from(doc.body.querySelectorAll('h1, h2, h3, h4, h5, h6'))
                        .map(heading => heading.textContent.replace(/\s+/g, ' ').trim())
                        .filter(text => text.length > 0)));

                    const textContents = Array.from(new Set(Array.from(doc.body.querySelectorAll('*'))
                        .map(element => element.textContent.replace(/\s+/g, ' ').trim())
                        .filter(text => text.length > 0 && !headings.includes(text))))
                        .join(', ');

                    const buttonContents = Array.from(new Set(Array.from(doc.body.querySelectorAll('button'))
                        .map(button => button.textContent.replace(/\s+/g, ' ').trim())
                        .filter(text => text.length > 0)));

                    const imageUrls = Array.from(new Set(Array.from(doc.body.querySelectorAll('img'))
                        .map(img => img.src)
                        .filter(src => src.length > 0)));

                    const extractedData = {
                        heading: headings,
                        text: textContents,
                        buttontext: buttonContents,
                        imageurl: imageUrls
                    };

                    // Log the extracted JSON object to the console
                    console.log(`Extracted data:`, JSON.stringify(extractedData, null, 2));

                    const apiUrl = 'https://free-ap-south-1.cosmocloud.io/development/api/justpromptclientmodel/66fa3a3d5f4d0ff82cab2116';
                    const payload = {
                        title: companyName,
                        description: goal,
                        code: data.data.html
                    };

                    fetch(apiUrl, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'projectId': projectId,
                            'environmentId': environmentId
                        },
                        body: JSON.stringify(payload)
                    })
                    .then(response => response.json())
                    .then(result => {
                        console.log(`API Response for PUT request:`, result);
                        setUpdateTrigger(prev => !prev);
                    })
                    .catch(error => {
                        console.error(`Error in PUT request:`, error);
                    });
                })
                .catch(error => {
                    console.error(`Error fetching data for UUID ${uuid}:`, error);
                });
            });
        }
    }, [droppedComponents]);

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