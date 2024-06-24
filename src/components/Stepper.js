import React from 'react';

const Stepper = ({ currentSection, sections, setCurrentSection }) => {
  
  const goToNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const goToPreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="p-4 space-y-2">
      <h3 className="text-base font-semibold">Step {currentSection + 1}: {sections[currentSection].title}</h3>
      <div className="flex max-w-xs space-x-3">
        <button
          onClick={goToPreviousSection}
          disabled={currentSection === 0}
          className="w-12 h-2 rounded-full bg-gray-400 cursor-pointer"
        />
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={`w-12 h-2 rounded-full ${currentSection === index ? 'bg-violet-600 cursor-pointer' : index < currentSection ? 'bg-violet-600 cursor-pointer' : 'bg-gray-400 cursor-pointer'}`}
          />
        ))}
        <button
          onClick={goToNextSection}
          disabled={currentSection === sections.length - 1}
          className="w-12 h-2 rounded-full bg-gray-400 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Stepper;
