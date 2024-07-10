import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDrag } from 'react-dnd';

const ComponentResult = ({ query, setDroppedComponents }) => {
  const [components, setComponents] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get(
          `https://tailwindflex.com/api/mahsook-tech/components/search?query=${query}`,
          {
            headers: {
              'X-API-KEY': '434Klvspze2sfsd',
            },
          }
        );
        setComponents(response.data.data || []);
      } catch (error) {
        setError(error); // Set error state if fetching fails
        console.error('Error fetching components:', error);
      }
    };

    if (query) {
      fetchComponents();
    }
  }, [query]);

  // Render error message if fetching components fails
  if (error) {
    return <div>Error fetching components: {error.message}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Component Results</h2>
      <div className="space-y-4">
        {components.map((component) => (
          <DraggableComponentCard
            key={component.uuid} // Ensure uuid is unique for each component
            component={component}
            setDroppedComponents={setDroppedComponents}
          />
        ))}
      </div>
    </div>
  );
};

const DraggableComponentCard = ({ component, setDroppedComponents }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'COMPONENT',
    item: { component: JSON.stringify(component) },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 bg-white shadow rounded-lg flex items-center space-x-4 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <img
        src={component.thumbnails?.images?.light} // Safely access nested properties
        alt={component.title}
        className="w-full rounded"
      />
    </div>
  );
};

export default ComponentResult;
