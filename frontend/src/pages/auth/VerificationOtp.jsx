// "use client"

// import { useState } from "react"
// import { useNavigate, useSearchParams } from "react-router-dom"
// import BackButton from "../../components/ui/BackButton"
// import OtpInput from "../../components/ui/OtpInput"
// import { verifyOtpAPI,resendOtpAPI } from "../../api/AuthApi"

// export default function VerifyCode() {
//   const [otp, setOtp] = useState("")
//   const [isResending, setIsResending] = useState(false)
//   const navigate = useNavigate()
//   const [searchParams] = useSearchParams()
//   const email = searchParams.get("email") || "example@gmail.com"

//   const handleVerify = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await verifyOtpAPI({
//         email,
//         otp
//       });

//       alert("Email verified successfully!");
//       navigate("/setup-profile");

//     } catch (err) {
//       alert(err.response?.data?.message || "Invalid OTP");
//     }
//   };

//     const handleResendCode = async () => {
//     setIsResending(true);

//     try {
//         await resendOtpAPI(email);
//         alert("A new OTP has been sent!");
//     } catch (err) {
//         alert(err.response?.data?.message || "Failed to resend OTP");
//     }

//     setIsResending(false);
//     };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-gray-50 rounded-3xl shadow-sm p-8">
//         <div className="mb-8">
//           <BackButton />
//         </div>

//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-3">Verify Code</h1>
//           <p className="text-gray-500 text-base">
//             Please enter the code we sent to <span className="text-gray-700">{email}</span>.
//           </p>
//         </div>

//         <form onSubmit={handleVerify} className="space-y-8">
//           <OtpInput value={otp} onChange={setOtp} length={4} />

//           <div className="text-center space-y-2">
//             <p className="text-gray-500">Didn't receive OTP?</p>
//             <button
//               type="button"
//               onClick={handleResendCode}
//               disabled={isResending}
//               className="text-gray-900 font-medium underline hover:text-indigo-600 transition-colors disabled:opacity-50"
//             >
//               {isResending ? "Sending..." : "Resend code"}
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={otp.length !== 4}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-lg py-4 rounded-full transition-colors"
//           >
//             Verify
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import BackButton from "../../components/ui/BackButton"
import OtpInput from "../../components/ui/OtpInput"
import { verifyOtpAPI, resendOtpAPI } from "../../api/AuthApi"
import { showAppToast } from "../../utils/Toast"

export default function VerifyCode() {
  const [otp, setOtp] = useState("")
  const [isResending, setIsResending] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get("email")

  useEffect(() => {
    let timer
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown(prev => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [cooldown])

  // ---------------- VERIFY OTP ----------------
  const handleVerify = async (e) => {
    e.preventDefault()

    try {
      await verifyOtpAPI({ email, otp })
      if (showAppToast) {
        showAppToast('Email verified successfully!','success');
      } else {
        alert("Email verified successfully!");
      }
      navigate("/login")

    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP")
    }
  }

  // ---------------- RESEND OTP ----------------
  const handleResendCode = async () => {
    if (cooldown > 0) return

    setIsResending(true)

    try {
      await resendOtpAPI(email)                   
        if (showAppToast) {
        showAppToast('A new OTP has been sent to your email!','success');
      } else {
        alert("A new OTP has been sent to your email!");
      }
      setCooldown(30)  // 30 second cooldown
    } catch (err) {
      alert(err.response?.data?.message || "Failed to resend OTP")
    }

    setIsResending(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-50 rounded-3xl shadow-sm p-8">
        
        <div className="mb-8">
          <BackButton />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Verify Code</h1>
          <p className="text-gray-500 text-base">
            Enter the code sent to <span className="text-gray-700 font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-8">
          
          <OtpInput value={otp} onChange={setOtp} length={4} />

          <div className="text-center space-y-2">

            <p className="text-gray-500">Didn’t receive OTP?</p>

            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending || cooldown > 0}
              className="text-gray-900 font-medium underline hover:text-indigo-600 transition-colors disabled:opacity-50"
            >
              {isResending
                ? "Sending..."
                : cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : "Resend code"}
            </button>
          </div>

          <button
            type="submit"
            disabled={otp.length !== 4}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-lg py-4 rounded-full transition-colors"
          >
            Verify
          </button>

        </form>
      </div>
    </div>
  )
}
