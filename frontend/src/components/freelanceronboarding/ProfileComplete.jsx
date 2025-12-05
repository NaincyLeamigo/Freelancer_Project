import { Link } from "react-router-dom";

export default function ProfileComplete() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md bg-white rounded-3xl shadow-lg p-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Setup Complete!</h1>
        <p className="text-gray-600 mb-8">
          Your profile is completed. hirer can not discover you as you have not done your payemnt,Please complete your payement so that Hirer’ll connect you with opportunities soon.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}