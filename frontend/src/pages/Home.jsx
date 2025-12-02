import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">SkayOffice</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Choose your role to get started
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/create-account"
            className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            I'm a Freelancer
          </Link>

          <Link
            to="/create-account"
            className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow border border-indigo-200 hover:bg-indigo-50 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            I'm a Hirer
          </Link>
        </div>
      </div>
    </div>
  );
}