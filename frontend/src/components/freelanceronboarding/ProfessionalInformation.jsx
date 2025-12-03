"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ProfessionalDetails() {
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState("Design")
  const [services, setServices] = useState(["UI/UX Design", "Brand Strategy"])
  const [skills, setSkills] = useState(["Figma", "UX Research", "Prototyping"])
  const [languages, setLanguages] = useState([{ language: "English", proficiency: "Fluent" }])
  const [portfolioLink, setPortfolioLink] = useState("")

  const categories = [
    { name: "Design", icon: "✏️" },
    { name: "Marketing", icon: "📢" },
    { name: "Tech", icon: "<>" },
    { name: "Content", icon: "📄" },
  ]

  const handleNext = () => {
    console.log("Professional details:", {
      category: selectedCategory,
      services,
      skills,
      languages,
      portfolioLink,
    })
    navigate("/availability")
  }

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
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
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
            <div className="h-1.5 w-16 bg-gray-700 rounded-full"></div>
            <div className="h-1.5 w-16 bg-gray-700 rounded-full"></div>
            <div className="h-1.5 w-16 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Main Category */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What is your main category?</h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex flex-col items-center p-4 rounded-2xl transition ${
                  selectedCategory === cat.name
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-2xl mb-2">{cat.icon}</span>
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What Services do you offer?</h2>
          <div className="space-y-3">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <span className="text-gray-900 font-medium">{service}</span>
                <button onClick={() => removeService(index)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              onClick={addService}
              className="text-indigo-600 font-medium text-sm flex items-center gap-1 hover:text-indigo-700"
            >
              <span className="text-xl">+</span> Add another
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium"
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
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleNext}
            className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
