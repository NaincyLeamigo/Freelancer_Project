import React from 'react';
import { MessageCircle, Phone, ExternalLink } from 'lucide-react';

const FreelancerCardExpanded = ({ freelancer }) => {
  const { personalInfo, professionalInfo, availability, stats, portfolio } = freelancer;

  return (
    <div className="border-t border-gray-200 bg-gray-50">
      {/* Action Buttons */}
      <div className="p-4 flex gap-2">
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex-1">
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Chat</span>
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex-1">
          <Phone className="w-4 h-4" />
          <span className="text-sm font-medium">Call</span>
        </button>
      </div>

      <div className="px-4 pb-4">
        <button className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <span className="text-sm font-medium">Schedule a Call</span>
        </button>
      </div>

      {/* About Section */}
      <div className="px-4 pb-4">
        <h4 className="font-semibold text-gray-900 mb-2">About</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {professionalInfo.bio || personalInfo.description}
        </p>
      </div>

      {/* Services Section */}
      {professionalInfo.services && professionalInfo.services.length > 0 && (
        <div className="px-4 pb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Services</h4>
          <div className="space-y-2">
            {professionalInfo.services.map((service, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-blue-600">→</span>
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {professionalInfo.skills && professionalInfo.skills.length > 0 && (
        <div className="px-4 pb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {professionalInfo.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages Section */}
      {professionalInfo.languages && professionalInfo.languages.length > 0 && (
        <div className="px-4 pb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
          <div className="space-y-2">
            {professionalInfo.languages.map((lang, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{lang.name}</span>
                <span className="text-gray-500">- {lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Portfolio Section */}
      {portfolio && portfolio.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">Portfolio</h4>
            <button className="text-blue-600 text-xs flex items-center gap-1">
              <span>View selected projects</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {portfolio.map((item, index) => (
              <div key={index} className="text-sm">
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-gray-600 text-xs">{item.description}</p>
                {item.link && (
                  <a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1 mt-1 text-xs"
                  >
                    View Project
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Availability Section */}
      <div className="px-4 pb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Availability</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2 text-gray-700">
            <span className="mt-0.5">🕐</span>
            <span className="text-xs">
              {availability.workingDays?.join(', ')} • {availability.startTime} - {availability.endTime} ({availability.timeZone})
            </span>
          </div>
          {stats.responseTime && stats.responseTime !== 'N/A' && (
            <div className="flex items-center gap-2 text-gray-700">
              <span>⚡</span>
              <span className="text-xs">Responds {stats.responseTime}</span>
            </div>
          )}
          {availability.hourlyRate && (
            <div className="flex items-center gap-2 text-gray-700 mt-3">
              <span className="font-semibold text-gray-900">
                ${availability.hourlyRate}/hr
              </span>
              <span className="text-gray-500 text-xs">• {availability.hoursPerWeek} hrs/week</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerCardExpanded;