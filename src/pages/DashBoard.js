//DashBoard.js
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sections from '../components/Sections';
import Items from '../components/Items';
import DropArea from '../components/DropArea';
import InputForm from '../components/InputForm';
import CodeDisplay from '../components/CodeDisplay';
import jsonData from '../cleaned_components.json';

function DashBoard() {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [items, setItems] = useState([]);
  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSections(Object.keys(jsonData));
  }, []);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setItems(jsonData[section]);
  };

  const handleDrop = (item) => {
    setDroppedItems((prevItems) => [...prevItems, item]);
  };

  const handleElementClick = (element) => {
    setSelectedElement(element);
    setIsModalOpen(true);
  };

  const handleUpdateElement = (updatedElement) => {
    setDroppedItems((prevItems) =>
      prevItems.map((item) => (item === selectedElement ? updatedElement : item))
    );
    setSelectedElement(updatedElement);
    setIsModalOpen(false);
  };

  const handleDeleteElement = (element) => {
    setDroppedItems((prevItems) => prevItems.filter((item) => item !== element));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-gray-100">
        <Sections sections={sections} onSectionClick={handleSectionClick} />
        <Items items={items} />
        <DropArea
          droppedItems={droppedItems}
          onDrop={handleDrop}
          onElementClick={handleElementClick}
          onDeleteElement={handleDeleteElement}
        />
        <CodeDisplay code={droppedItems.map(item => item.code).join('')} />
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-xl w-full h-auto max-h-[80vh] overflow-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <InputForm element={selectedElement} onUpdateElement={handleUpdateElement} />
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}

export default DashBoard;
