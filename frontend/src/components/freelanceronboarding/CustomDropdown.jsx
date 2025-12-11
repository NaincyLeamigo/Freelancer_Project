import React, { useState } from 'react';

const CustomDropdown = ({ name, value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full px-3 py-2 bg-white text-base rounded-xl border border-gray-200 text-left text-[#101828] focus:ring-2 focus:ring-indigo-500"
      >
        {value || placeholder}
      </button>

      {isOpen && (
        <div className="absolute left-0 w-full bg-white shadow-lg mt-1 rounded-lg z-10 border border-gray-200 max-h-28 overflow-auto scrollbar ">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-indigo-100 cursor-pointer text-[#101828]"
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
