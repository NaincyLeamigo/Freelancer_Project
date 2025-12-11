"use client"
import { useNavigate } from "react-router-dom"
import Profile from "../../img/SetUpImage.png"
import BackButton from "../../components/ui/BackButton"
import { User, Calendar,Briefcase } from 'lucide-react'
import Button from "../../components/ui/Button"

export default function SetupProfile() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate("/profile-information")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-50 rounded-3xl shadow-sm p-8">
        
        <div className="flex justify-between items-center w-full">
            <BackButton/>
            <h1 className="text-2xl text-center font-medium text-[#0A0A0A] mr-4">Set Up Your Profile</h1>
            <div></div>
        </div>

        <div className="flex justify-center items-center w-full h-[210px]">
          <img src={Profile} alt="Profile Setup Illustration" className="w-72 h-auto" />
        </div>

        <p className="text-center text-lg text-gray-500 mb-8 mt-3">
          Let's create your professional profile so clients can discover you.
        </p>

     
        <div className="space-y-4 mb-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#E8E6FF] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <User className="text-[#FFFFFF] h-7 w-7"/>
              </div>
              <h3 className="text-lg font-medium text-[#101828]">Add your basic details</h3>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#E8E6FF] rounded-2xl flex items-center justify-center flex-shrink-0">
                 <Briefcase className="text-[#FFFFFF] h-7 w-7"/>
              </div>
              <h3 className="text-lg font-medium text-[#101828]">Showcase your skills & services</h3>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#E8E6FF] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Calendar className="text-[#FFFFFF] h-7 w-7"/>
              </div>
              <h3 className="text-lg font-medium text-[#101828]">Set your availability</h3>
            </div>
          </div>
        </div>

        <Button type="submit" fullWidth onClick={handleGetStarted}>
            Get Started
          </Button>
      </div>
    </div>
  )
}
