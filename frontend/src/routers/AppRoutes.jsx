
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Profile from '../pages/Profile.jsx';
import CreateAccount from '../components/signup/FreelancerSignUp.jsx'
import SignIn from '../components/signin/Login.jsx'
import VerifyCode from '../components/verification/Verify.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/verify-otp" element={<VerifyCode/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
  );
}