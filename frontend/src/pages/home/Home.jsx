import { Cloud, ArrowRight, Zap,Target , BriefcaseBusiness } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex flex-col">
      <header className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-800">SkayOffice</span>
          </div>
          <Link to="/login" className="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium">
            Sign In
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="text-center max-w-4xl w-full">
       
          <div className="mb-8 sm:mb-12 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-20 blur-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full relative flex items-center justify-center">
                <Cloud className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>
          </div>

     
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              SkayOffice
            </span>
          </h1>

       
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 md:mb-12 px-4 max-w-2xl mx-auto">
            Your professional digital workspace for freelancing success. Choose your role to get started.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 mb-8 sm:mb-12">
            <Link
             to="/create-account?role=freelancer"
              className="w-full sm:w-auto min-w-[200px] px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2 group"
            >
              I'm a Freelancer
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
             to="/create-account?role=hirer"
              className="w-full sm:w-auto min-w-[200px] px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2 group"
            >
              I'm a Hirer
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="p-4 sm:p-6 text-center">
        <p className="text-xs sm:text-sm text-gray-500">
          © 2024 SkayOffice. All rights reserved.
        </p>
      </footer>
    </div>
  );
}