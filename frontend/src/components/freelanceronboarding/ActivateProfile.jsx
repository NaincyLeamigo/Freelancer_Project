import React from 'react';
import { Search, CreditCard, Monitor, Play, ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { completeProfileAPI } from '../../api/FreelancerProfileAPI';


export default function ActivateProfile() {
  const navigate = useNavigate();

  const handleSkip = async () => {
    console.log("Sending Complete Profile Request...");

    try {
      const res = await completeProfileAPI();
      console.log("Profile Completed Successfully:", res.data);
      navigate("/profile-complete");
    } catch (err) {
      console.error("Error completing profile:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to complete profile");
    }
  };
  return (
 <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-50 rounded-3xl shadow-sm p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 mr-12">Activate your Profile</h1>
          <div></div>
        </div>

           {/* Progress Bar */}
      <div className="flex mb-8 w-full justify-center items-center">
          <div className="flex gap-2 w-full ml-20 mr-20">
            <div className="flex-1 h-2 bg-gray-400 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-400 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-400 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-base mb-8">
          Make your profile visible to clients and start receiving project requests.
        </p>

            <div className='border border-gray-200 bg-white shadow-sm p-4 rounded-xl'>
                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8 mt-8">
                {/* Feature 1 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                    <Search className="w-7 h-7 text-indigo-600" />
                    </div>
                    <p className="text-lg text-gray-900 font-medium">
                    Appear in hirer<br />search results
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                    <CreditCard className="w-7 h-7 text-indigo-600" />
                    </div>
                    <p className="text-lg text-gray-900 font-medium">
                    Get a verified<br />digital office card
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                    <Monitor className="w-7 h-7 text-indigo-600" />
                    </div>
                    <p className="text-lg text-gray-900 font-medium">
                    Enable workspace<br />& client flow
                    </p>
                </div>

                {/* Feature 4 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                    <Play className="w-7 h-7 text-indigo-600" />
                    </div>
                    <p className="text-lg text-gray-900 font-medium">
                    Receive hire<br />requests instantly
                    </p>
                </div>
                </div>

                {/* Pricing Card */}
                <div className="rounded-2xl p-2 text-center">
                    <div className='border-t border-gray-100 mb-4'></div>
                <p className="text-gray-600 text-lg mb-2">Freelancer Subscription</p>
                <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900">$9.99</span>
                    <span className="text-gray-600 text-lg ml-1">/month</span>
                </div>
                <p className="text-gray-400 text-sm">Cancel anytime.</p>
                </div>

            </div>

        {/* Buttons */}
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium mt-16 py-4 rounded-full mb-4 transition-colors">
          Proceed to Payment
        </button>

     <button
        onClick={handleSkip} className="w-full text-gray-500 font-medium py-2">
          Skip for Now
        </button>
      </div>
    </div>
  );
}