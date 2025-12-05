"use client"


import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Megaphone, Code, Paintbrush, FileText, ChevronRight, Plus, Link2, X, Palette } from 'lucide-react';
import { saveProfessionalInfoAPI } from '../../api/FreelancerProfileAPI';


export default function ProfessionalDetails() {
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState("Design")
  const [services, setServices] = useState([])
  const [skills, setSkills] = useState([])
  const [languages, setLanguages] = useState([{ language: "English", proficiency: "Fluent" }])
  const [portfolioLink, setPortfolioLink] = useState("")

const categories = [
    { name: 'Design', icon:  Paintbrush },
    { name: 'Marketing', icon: Megaphone },
    { name: 'Tech', icon: Code },
    { name: 'Content', icon: FileText }
  ];

   const predefinedServices = {
    Design: ["UI/UX Design", "Brand Strategy", "Graphic Design"],
    Marketing: ["Social Media Marketing", "SEO", "Content Marketing"],
    Tech: ["Web Development", "Mobile App Development", "DevOps"],
    Content: ["Copywriting", "Video Scripting", "Blog Writing"]
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setServices(predefinedServices[category] || []); 
  };

const handleNext = async () => {

  const payload = {
    category: selectedCategory,
    subCategory: "",
    services: services,
    skills: skills.map((name) => ({ name, level: "Intermediate" })),
    languages: languages.map((lang) => ({
      name: lang.language,
      level: lang.proficiency, 
    })),
    title:"",
    bio:"",
    portfolio: portfolioLink ? [{ link: portfolioLink }] : [],
  };

  console.log("Sending Professional Info Request:", payload);

  try {
    const res = await saveProfessionalInfoAPI(payload);

    console.log("Professional Info Saved Successfully:", res.data);
    navigate("/availability");
  } catch (err) {
    console.error("Error saving professional info:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to save professional info");
  }
};

  const addService = () => {
    const newService = prompt("Enter service name:")
    if (newService && newService.trim()) {
      setServices([...services, newService.trim()])
    }
  }

  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index))
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const addSkill = () => {
    const newSkill = prompt("Enter skill name:")
    if (newSkill && newSkill.trim()) {
      setSkills([...skills, newSkill.trim()])
    }
  }

  const addLanguage = () => {
    setLanguages([...languages, { language: "", proficiency: "Fluent" }])
  }

  const updateLanguage = (index, field, value) => {
    const updated = [...languages]
    updated[index][field] = value
    setLanguages(updated)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-50 rounded-3xl shadow-sm p-4 pb-6">
      
          {/* Header */}

          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center mb-4">
              <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="flex-1 text-xl font-semibold text-center mr-8">Professional Details</h1>
            </div>

            <div className="flex gap-2 justify-center">
              <div className="h-1.5 w-16 bg-gray-400 rounded-full"></div>
              <div className="h-1.5 w-16 bg-gray-400 rounded-full"></div>
              <div className="h-1.5 w-16 bg-gray-200 rounded-full"></div>
              <div className="h-1.5 w-16 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        

          <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
             <div className="mb-8">
              <label className="block text-gray-900 text-lg font-medium mb-4">
                What is your main category?
              </label>
              <div className="grid grid-cols-4 gap-3">
                {categories.map((cat) => {
                  const IconComponent = cat.icon;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className="flex flex-col items-center justify-center transition-colors"
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm mb-2 ${
                        selectedCategory === cat.name
                          ? 'bg-indigo-100'
                          : 'bg-white'
                      }`}>
                        <IconComponent 
                          className={`w-5 h-5 ${
                            selectedCategory === cat.name
                              ? 'text-indigo-600'
                              : 'text-gray-600'
                          }`}
                        />
                      </div>
                      <span className={`text-base font-medium ${
                        selectedCategory === cat.name
                          ? 'text-indigo-600'
                          : 'text-gray-700'
                      }`}>
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
             </div>
          

            {/* Services */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">What Services do you offer?</h2>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 flex items-center justify-between shadow-sm">
                    <span className="text-gray-900 text-lg font-medium">{service}</span>
                    <button onClick={() => removeService(index)} className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  onClick={addService}
                  className="text-indigo-600 font-medium text-lg flex items-center gap-2 hover:text-indigo-700"
                >
                  <span className="">+</span> Add
                </button>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">What Skills do you offer?</h2>
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full text-lg font-medium"
                    >
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:bg-indigo-200 rounded-full p-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-full text-sm font-medium"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">What Languages do you speak?</h2>
              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <div key={index} className="flex gap-3">
                    <select
                      value={lang.language}
                      onChange={(e) => updateLanguage(index, "language", e.target.value)}
                      className="flex-1 px-4 py-3 bg-white rounded-2xl border-0 shadow-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="">Select language</option>
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Chinese">hindi</option>
                    </select>
                    <select
                      value={lang.proficiency}
                      onChange={(e) => updateLanguage(index, "proficiency", e.target.value)}
                      className="flex-1 px-4 py-3 bg-white rounded-2xl border-0 shadow-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Native">Native</option>
                    </select>
                  </div>
                ))}
                <button
                  onClick={addLanguage}
                  className="text-indigo-600 font-medium text-sm flex items-center gap-1 hover:text-indigo-700"
                >
                  <span className="text-xl">+</span> Add another
                </button>
              </div>
            </div>

            {/* Portfolio Link */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Link</h2>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <input
                  type="url"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  placeholder="e.g., your-portfolio.com"
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-0 shadow-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Fixed Next Button */}
          {/* <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200"> */}
            <div className="max-w-2xl mx-auto mt-16">
              <button
                onClick={handleNext}
                className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Next
              </button>
            </div>
          {/* </div> */}
      </div>
    </div>
  )
}
