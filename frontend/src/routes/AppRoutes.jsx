
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home.jsx';
import SetupProfile from '../pages/freelancer/SetUp.jsx';

import CreateAccount from '../pages/auth/CreateAccount.jsx'
import SignIn from '../pages/auth/Login.jsx'
import VerifyCode from '../pages/auth/VerificationOtp.jsx'
import ProfileInformation from '../components/freelanceronboarding/ProfileInformation.jsx';
import ProfessionalDetails from '../components/freelanceronboarding/ProfessionalInformation.jsx';
import Availability from '../components/freelanceronboarding/Availability.jsx';
import ActivateProfile from '../components/freelanceronboarding/ActivateProfile.jsx';
import ProfileComplete from '../components/freelanceronboarding/ProfileComplete.jsx';
import ExploreTalent from '../components/hirer/ExploreTalent.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/create-account" element={<CreateAccount />} />
//       <Route path="/login" element={<SignIn />} />
//       <Route path="/verify-otp" element={<VerifyCode/>} />
//       <Route path="/setup-profile" element={<SetupProfile />} />
//       <Route path="/profile-information" element={<ProfileInformation />} />
//       <Route path="/professional-details" element={<ProfessionalDetails/>} />
//        <Route path="/availability" element={<Availability />} />
//        <Route path="/activate" element={<ActivateProfile />} />
//        <Route path="/profile-complete" element={<ProfileComplete/>} />
//        <Route path="/explore-talent" element={<ExploreTalent/>} />
   
//     </Routes>
//   );
// }

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/verify-otp" element={<VerifyCode />} />

        <Route
          path="/setup-profile"
          element={
            <ProtectedRoute>
              <SetupProfile/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile-information"
          element={
            <ProtectedRoute>
              <ProfileInformation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/professional-details"
          element={
            <ProtectedRoute>
              <ProfessionalDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/availability"
          element={
            <ProtectedRoute>
              <Availability />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activate"
          element={
            <ProtectedRoute>
              <ActivateProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile-complete"
          element={
            <ProtectedRoute>
              <ProfileComplete />
            </ProtectedRoute>
          }
        />

        <Route
          path="/explore-talent"
          element={
            <ProtectedRoute>
              <ExploreTalent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}