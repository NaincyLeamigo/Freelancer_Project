function Checkbox({ name, checked, onChange, label }) {
  return (
    <div className="flex w-full gap-2 ">
      <div className="relative flex items-center h-6">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="
            peer
            w-5 h-5 rounded 
            appearance-none
            border border-gray-400 
            checked:bg-[#5A4DFF] checked:border-indigo-600 
            cursor-pointer 
            transition-all
          "
        />
        <span
          className="
            pointer-events-none 
            absolute 
            text-white text-sm 
            left-1 top-[1px]
            opacity-0 
            peer-checked:opacity-100
            transition-opacity
          "
        >
          ✓
        </span>
      </div>

      <label htmlFor={name} className="text-sm text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
