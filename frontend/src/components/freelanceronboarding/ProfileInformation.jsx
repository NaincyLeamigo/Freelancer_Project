"use client"

import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { saveBasicInfoAPI } from "../../api/FreelancerProfileAPI"
import BackButton from "../ui/BackButton"
import Button from "../ui/Button"
import CustomDropdown from "./CustomDropdown"
import countriesLib from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';

countriesLib.registerLocale(en);


export default function ProfileInformation() {
  const navigate = useNavigate()
  const countryNames = Object.values(countriesLib.getNames('en')).sort();
  const [profileImage, setProfileImage] = useState(null)
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    headline: "",
    about: "",
    city: "",
    country: "",
  })


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fullName: formData.fullName,
      jobTitle: formData.jobTitle,
      oneLineDescription: formData.headline, 
      description: formData.about,          
      city: formData.city,
      country: formData.country,
      avatar: profileImage || "", 
    };

    try {
        const res = await saveBasicInfoAPI(payload);
        console.log("Basic Info Saved Successfully:", res.data);
        navigate("/professional-details");
    } catch (err) {
      console.error("Error saving basic info:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to save basic info");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-50 rounded-3xl shadow-sm p-8">
 
         <div className="flex justify-between items-center w-full">
            <BackButton/>
            <h1 className="text-2xl text-center font-medium text-[#0A0A0A] mr-8">Profile Information</h1>
            <div></div>
        </div>

        <div className="flex mb-10 w-full justify-center items-center mt-4">
          <div className="flex gap-2  w-full ml-16 mr-16">
            <div className="flex-1 h-2 bg-gray-400 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-14 h-14 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 -right-2 w-12 h-12 bg-[#5A4DFF] rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition shadow-xl"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </label>
              <input id="profile-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-[#101828] font-medium text-base mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-[#101828] placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-[#101828] font-medium text-base mb-2">Main Role / Job Title</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="e.g., UX Designer"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-[#101828] placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-[#101828] text-base font-medium mb-2">Headline</label>
              <input
                type="text"
                name="headline"
                placeholder="A short headline about what you do..."
                value={formData.headline}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-[#101828] placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-[#101828] text-base font-medium mb-2">About You</label>
              <textarea
                name="about"
                placeholder="Tell us more about yourself, your skills, and experience."
                value={formData.about}
                onChange={handleChange}
                rows={4}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-[#101828] placeholder-gray-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-[#101828] text-base font-medium mb-2">Location</label>
              <div className="space-y-3">
                <div className="relative">
                  <CustomDropdown
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Select Country"
                      options={countryNames} 
                    />
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="relative">
                 {/* <CustomDropdown
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Select City"
                    // options={cities}
                  /> */}
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                  {/* <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg> */}
                </div>
              </div>
            </div>
          </div>

         <div className="mt-8">
            <Button type="submit" fullWidth>
                Next
              </Button>
          </div>
        </form>

      </div>
    </div>
  )
}
