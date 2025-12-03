"use client"

import { useRef } from "react"

export default function OtpInput({ value, onChange, length = 4 }) {
  const inputRefs = useRef([])

  const handleChange = (index, e) => {
    const val = e.target.value

    // Only allow numbers
    if (val && !/^\d$/.test(val)) return

    const newValue = value.split("")
    newValue[index] = val
    onChange(newValue.join(""))

    // Auto-focus next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length)

    if (/^\d+$/.test(pastedData)) {
      onChange(pastedData.padEnd(length, ""))
      const lastIndex = Math.min(pastedData.length, length - 1)
      inputRefs.current[lastIndex]?.focus()
    }
  }

  return (
    <div className="flex gap-3 justify-center">
      {[...Array(length)].map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-16 h-16 text-center text-2xl font-medium border border-gray-200 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
        />
      ))}
    </div>
  )
}
