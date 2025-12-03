"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Availability() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    timezone: "GMT +5:30 - India Standard Time",
    workingDays: ["Mon", "Tue", "Wed", "Thu"],
    startTime: "9:00 AM",
    endTime: "6:00 PM",
    allowInstantAudio: true,
    allowInstantVideo: false,
  })

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const timezones = [
    "GMT +5:30 - India Standard Time",
    "GMT -8:00 - Pacific Time",
    "GMT -5:00 - Eastern Time",
    "GMT +0:00 - UTC",
    "GMT +1:00 - Central European Time",
    "GMT +8:00 - Singapore Time",
  ]

  const timeSlots = [
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ]

  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Availability data:", formData)
    // Navigate to next step or dashboard
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
          <button onClick={() => navigate(-1)} className="text-gray-800 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Set your availability</h1>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-6">
          <div className="flex gap-2">
            <div className="h-2 flex-1 bg-gray-400 rounded-full"></div>
            <div className="h-2 flex-1 bg-gray-400 rounded-full"></div>
            <div className="h-2 flex-1 bg-gray-400 rounded-full"></div>
            <div className="h-2 flex-1 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 space-y-8">
          {/* Time Zone */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">Time Zone</label>
            <select
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
                backgroundSize: "12px",
              }}
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          {/* Working Days */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">Working Days</label>
            <div className="flex flex-wrap gap-3">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-8 py-3 rounded-full font-medium transition-all ${
                    formData.workingDays.includes(day)
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">Working Hours</label>
            <div className="flex items-center gap-4">
              <select
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="flex-1 px-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "12px",
                }}
              >
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              <svg
                className="w-6 h-6 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>

              <select
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="flex-1 px-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "12px",
                }}
              >
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-3 text-sm text-gray-400">You can adjust these later in settings.</p>
          </div>

          {/* Call Preferences */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">Call Preferences</label>
            <div className="space-y-4">
              {/* Allow Instant Audio */}
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-900">Allow Instant Audio</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, allowInstantAudio: !formData.allowInstantAudio })}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    formData.allowInstantAudio ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      formData.allowInstantAudio ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Allow Instant Video */}
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-900">Allow Instant Video</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, allowInstantVideo: !formData.allowInstantVideo })}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    formData.allowInstantVideo ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      formData.allowInstantVideo ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-lg">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-4 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
