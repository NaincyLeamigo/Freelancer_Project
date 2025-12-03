import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">SkayOffice</span>
        </h1>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          You logged in..
        </h1>
    
      </div>
    </div>
  );
}