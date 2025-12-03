import { useState } from 'react';
import { Link,useNavigate,useSearchParams } from 'react-router-dom';
import BackButton from '../ui/BackButton';

import Input from '../ui/Input';
import Button from '../ui/Button';
import SocialButton from '../ui/SocialButton';
import Checkbox from '../ui/Checkbox';
import { signupAPI } from '../../api/authapi';

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", formData)

  //   // Navigate to verify code page with email
  //   navigate(`/verify-code?email=${encodeURIComponent(formData.email)}`)
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signupAPI({
        email: formData.email,
        password: formData.password,
        role: role,
      });

      alert("OTP sent to your email. Please check inbox");
      navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Sign up with ${provider}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-50 rounded-3xl shadow-sm p-8">
        <BackButton />
        
        <h1 className="text-3xl font-bold text-center text-gray-900 mt-6 mb-3">
          Create Account
        </h1>
        
        <p className="text-center text-gray-500 mb-8">
          Fill your information below or register with your social account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="ABC XYZ"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="password123"
            value={formData.password}
            onChange={handleChange}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <Checkbox
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            label={
              <>
                I agree with{' '}
                <Link to="/terms" className="text-indigo-600 hover:text-indigo-700">
                  Terms & Condition
                </Link>
              </>
            }
          />

          <Button type="submit" fullWidth>
            Sign Up
          </Button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <SocialButton provider="apple" />
            <SocialButton provider="google" />
          </div>
        </div>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CreateAccount;