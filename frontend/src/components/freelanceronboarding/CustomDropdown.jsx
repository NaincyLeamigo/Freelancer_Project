import React, { useState } from 'react';

const CustomDropdown = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false); 
  };

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-3 bg-white rounded-2xl border-0 shadow-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
      >
        {value || placeholder}
      </button>

      {isOpen && (
        <div className="absolute left-0 w-full bg-white shadow-lg mt-1 rounded-lg z-10">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
