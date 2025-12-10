import React from 'react';
import { MessageCircle, File, Phone, ExternalLink, Share2, MapPin, Star } from 'lucide-react';

const FreelancerCardExpanded = ({ freelancer, onClose }) => {
  const { personalInfo, professionalInfo, availability, stats, portfolio } = freelancer;
  const [isCallTypeOpen, setIsCallTypeOpen] = React.useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = React.useState(false);


  

  return (
    <div className="bg-white p-4" >
      {/* Header Section with Avatar */}
      <div className="relative pt-6 pb-4 px-6 bg-white">
        {/* <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Share2 className="w-5 h-5 text-gray-600" />
        </button> */}
        <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsQRModalOpen(true);
        }}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Share2 className="w-5 h-5 text-gray-600" />
      </button>
        
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              {personalInfo.avatar ? (
                <img src={personalInfo.avatar} alt={personalInfo.fullName} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-gray-400 text-3xl font-semibold">
                  {personalInfo.fullName?.charAt(0)}
                </span>
              )}
            </div>
            {availability.status === 'Available' && (
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white"></div>
            )}
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h2>
          <p className="text-sm text-gray-600 mb-2">{personalInfo.jobTitle || professionalInfo.title}</p>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.city}, {personalInfo.country}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{stats.rating || '4.2'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4 p-2 pb-6 pr-8 pl-8 border-b border-gray-200">
        <div className='flex gap-x-6'>

        <button onClick={(e) => e.stopPropagation()} className="flex items-center justify-center gap-2 transition-colors ">
          <MessageCircle className="w-4 h-4 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Chat</span>
        </button>
        <button onClick={(e) => e.stopPropagation()} className="flex items-center justify-center gap-2 pr-6 border-r transition-colors">
          <Phone className="w-4 h-4 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Call</span>
        </button>
        </div>
        {/* <button onClick={(e) => e.stopPropagation()} className="px-4 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
          <span className="text-sm font-medium">Schedule a Call</span>
        </button> */}
            <button 
      onClick={(e) => { 
        e.stopPropagation(); 
        setIsCallTypeOpen(true);
      }} 
      className="px-4 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
    >
      <span className="text-sm font-medium">Schedule a Call</span>
    </button>
      </div>

      {/* About Section */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h4 className="font-bold text-gray-900 mb-3 text-base">About</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {professionalInfo.bio || personalInfo.description}
        </p>
      </div>

      {/* Services Section */}
      {professionalInfo.services && professionalInfo.services.length > 0 && (
        <div className="px-6 py-4 border-b border-gray-100">
          <h4 className="font-bold text-gray-900 mb-3 text-base">Services</h4>
          <div className="space-y-2.5">
            {professionalInfo.services.map((service, index) => (
              <div key={index} className="flex items-center gap-2.5 text-sm text-gray-700">
                <span className="text-gray-800 font-medium">→</span>
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {professionalInfo.skills && professionalInfo.skills.length > 0 && (
        <div className="px-6 py-4 border-b border-gray-100">
          <h4 className="font-bold text-gray-900 mb-3 text-base">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {professionalInfo.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-purple-50 text-purple-700 text-xs font-medium rounded-lg"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages Section */}
      {professionalInfo.languages && professionalInfo.languages.length > 0 && (
        <div className="px-6 py-4 border-b border-gray-100">
          <h4 className="font-bold text-gray-900 mb-3 text-base">Languages</h4>
          <div className="space-y-2.5">
            {professionalInfo.languages.map((lang, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-900">{lang.name}</span>
                <span className="text-gray-500">- {lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Portfolio Section */}
      {portfolio && portfolio.length > 0 && (
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between mb-3">
            <div className='flex gap-x-3'>
              <button className='border h-8 w-8 rounded-lg bg-gray-200 px-2'>
              <File size={18} className=''/>
              </button>
              <div className=''>
                <h4 className="">Portfolio</h4>
                <span className='text-xs'>View selected projects</span>
              </div>
            </div>
            <button className="text-blue-600 text-xs flex items-center gap-1.5 hover:underline">
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Availability Section */}
      <div className="px-6 py-4 bg-gray-50">
        <h4 className="font-bold text-gray-900 mb-3 text-base">Availability</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2.5 text-gray-700">
            <span className="text-base">🕐</span>
            <span className="text-sm leading-relaxed">
              {availability.workingDays?.join(', ')} • {availability.startTime} - {availability.endTime} ({availability.timeZone})
            </span>
          </div>
          {stats.responseTime && stats.responseTime !== 'N/A' && (
            <div className="flex items-center gap-2.5 text-gray-700">
              <span className="text-base">⚡</span>
              <span className="text-sm">Responds {stats.responseTime}</span>
            </div>
          )}
        </div>
      </div>

    {isCallTypeOpen && (
      <div className="fixed inset-0 z-50 flex items-end justify-center">

        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsCallTypeOpen(false)}
        />

        {/* Bottom Sheet */}
        <div className="
          relative 
          bg-white 
          w-full 
          max-w-md 
          rounded-t-3xl 
          p-6 
          animate-slide-up 
          shadow-xl
        ">
          
          {/* Top small handle */}
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

          {/* Header */}
          <div className="flex justify-end gap-x-32 items-center mb-6 ">
            <h3 className="text-lg font-semibold flex justify-center items-center">Choose Call Type</h3>
            <button 
              onClick={() => setIsCallTypeOpen(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          {/* Options */}
          <div className="flex items-center justify-center gap-3 mb-6">

            {/* Audio */}
            <button className="
              flex items-center gap-2 
              border rounded-xl px-4 py-2 
              bg-indigo-100 text-indigo-600 
              border-indigo-300
              font-medium text-sm
            ">
              🎤 Audio
            </button>

            {/* Video */}
            <button className="
              flex items-center gap-2 
              border rounded-xl px-4 py-2 
              text-gray-600 
              bg-white
              font-medium text-sm
            ">
              📹 Video
            </button>
          </div>

          {/* Start Call Button */}
          <button className="
            w-full py-3 
            rounded-full 
            text-white font-semibold 
            text-sm
            bg-gradient-to-r from-indigo-500 to-blue-600
            shadow-md
          ">
            Start Call
          </button>

        </div>
      </div>
    )}

{isQRModalOpen && (
  <div className="fixed inset-0 z-50 flex items-end justify-center">

    {/* Overlay */}
    <div 
      className="absolute inset-0 bg-black bg-opacity-50"
      onClick={() => setIsQRModalOpen(false)}
    />

    {/* Bottom Sheet */}
    <div className="
      relative 
      bg-white 
      w-full 
      max-w-md 
      rounded-t-3xl 
      p-6 
      animate-slide-up 
      shadow-xl
    ">
      
      {/* Top handle */}
      <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

      {/* Close icon */}
      <button 
        onClick={() => setIsQRModalOpen(false)}
        className="absolute top-5 right-6 text-gray-600 hover:text-gray-800"
      >
        ✕
      </button>

      {/* QR Code */}
      <div className="flex justify-center my-4">
       <img 
  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://yourwebsite.com/profile" 
  alt="QR Code"
  className="w-48 h-48"
/>
      </div>

      {/* Share Profile Button */}
      <button className="
        w-full py-3 
        rounded-full 
        text-white font-semibold 
        text-sm
        bg-gradient-to-r from-indigo-500 to-blue-600
        shadow-md
      ">
        <span className="flex justify-center items-center gap-2">
          <Share2 size={16} /> Share Profile
        </span>
      </button>

      {/* Download QR */}
      <p className="text-center text-gray-600 text-sm mt-3">
        Download QR
      </p>

    </div>
  </div>
)}


    </div>
  );
};

export default FreelancerCardExpanded;