function Checkbox({ name, checked, onChange, label }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center h-6">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-5 h-5 rounded bg-indigo-600 border-indigo-600 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        />
      </div>
      <label htmlFor={name} className="text-sm text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;