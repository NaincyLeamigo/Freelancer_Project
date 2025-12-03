import { Eye, EyeOff } from './Icons';

function Input({ 
  label, 
  type = 'text', 
  name, 
  placeholder, 
  value, 
  onChange,
  showPassword,
  onTogglePassword 
}) {
  const isPasswordField = type === 'password' || (onTogglePassword && type === 'text');

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-900">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;