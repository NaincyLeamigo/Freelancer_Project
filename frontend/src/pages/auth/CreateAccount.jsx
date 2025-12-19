import { useState } from 'react';
import { Link,useNavigate,useSearchParams } from 'react-router-dom';
import BackButton from '../../components/ui/BackButton';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import SocialButton from '../../components/ui/SocialButton';
import Checkbox from '../../components/ui/Checkbox';
import { signupAPI } from '../../api/AuthApi';
import { showAppToast } from '../../utils/Toast';

function CreateAccount() {
 const navigate = useNavigate()
 const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "freelancer"; 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (error) setError("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return setError("Please enter your name");
    if (!formData.email.trim()) return setError("Please enter your email");
    if (!formData.password.trim()) return setError("Please enter your password");
    if (!formData.agreeToTerms) return setError("Please agree to Terms & Conditions");

    setLoading(true);
    setError("");
    try {
      await signupAPI({ email: formData.email, password: formData.password, role, name: formData.name });
      showAppToast?.("OTP sent to your email. Please check inbox", "success");
      navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Signup failed";
      setError(errorMessage);
      showAppToast?.(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    if (loading) return; 
    console.log(`Sign up with ${provider}`)
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-50 rounded-3xl shadow-sm p-8 space-y-6">

        <BackButton disabled={loading}/>
        <h1 className="text-3xl font-medium text-center text-[#0A0A0A] mb-3">Create Account</h1>
        <p className="text-center text-gray-500 mb-8">Fill your information below or register with your social account.</p>
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="ABC XYZ"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="password123"
            value={formData.password}
            onChange={handleChange}
            showPassword={showPassword}
            onTogglePassword={() => !loading && setShowPassword(!showPassword)}
            disabled={loading}
            required
          />

          <Checkbox
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            disabled={loading}
            label={
              <>
                I agree with {''}
                <Link 
                  to="/terms" 
                  className={`${loading ? 'text-gray-400 cursor-not-allowed' : 'text-[#5A4DFF] hover:text-indigo-700'}`}
                  onClick={(e) => loading && e.preventDefault()}>
                  Terms & Condition
                </Link>
                    {''} and {''}
                <Link 
                  to="/privacy" 
                  className={`${loading ? 'text-gray-400 cursor-not-allowed' : 'text-[#5A4DFF] hover:text-indigo-700'}`}
                  onClick={(e) => loading && e.preventDefault()}>
                  Privacy Policy
                </Link>
              </>
            }
          />

          <Button 
            type="submit" 
            fullWidth
            disabled={loading || !formData.agreeToTerms}>
            {loading ? (
              <span className="flex items-center justify-center">
                <svg 
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  ></circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Account...
              </span>
            ) : 'Sign Up'}
          </Button>
        </form>

        <div className="pt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-[#E5E7EB]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 text-gray-500">Or</span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <div className="flex justify-center w-full items-center border border-gray-200 px-2 rounded-full">
              <SocialButton provider="google" disabled={loading} />
              <span className="text-gray-600">Continue with Google</span>
            </div>
          </div>
        </div>

        <div className="text-gray-600 flex justify-center items-center pt-2">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className={`ml-1 ${loading ? 'text-gray-400 cursor-not-allowed' : 'text-[#5A4DFF] hover:text-indigo-700'}`}
            onClick={(e) => loading && e.preventDefault()}>
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
}

export default CreateAccount;