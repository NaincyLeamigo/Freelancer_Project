import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import SocialButton from '../../components/ui/SocialButton';
import Checkbox from '../../components/ui/Checkbox';
import BackButton from '../../components/ui/BackButton';
import { signinAPI } from '../../api/AuthApi';
import { showAppToast } from '../../utils/Toast';

function SignIn() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Login attempt:', formData);
  //   // Yahan aap login API call kar sakti hain
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    
    setLoading(true); 
    try {
      const res = await signinAPI({
        email: formData.email,
        password: formData.password,
      });
      // console.log("LOGIN SUCCESS:", res.data);
      const { accessToken, refreshToken } = res.data.data.tokens;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      if (showAppToast) {
        showAppToast('Login successfully','success');
      } else {
        alert("Login successfully");
      }
      navigate("/profile-information");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Login failed");
    }
    finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-50 rounded-3xl shadow-sm p-8">
        <BackButton />

        <h1 className="text-3xl font-bold text-center text-gray-900 mt-6 mb-3">
          Sign In
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter your credentials to access your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            disabled={loading} 
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              showPassword={showPassword}
              onTogglePassword={() => !loading && setShowPassword(!showPassword)}
              disabled={loading} 
            />
            <div className="text-right mt-1">
              {/* <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                Forgot password?
              </Link> */}
               <Link
                to="/forgot-password"
                className={`text-sm ${loading ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:text-indigo-700'}`}
                onClick={(e) => loading && e.preventDefault()} 
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              label="Remember me"
               disabled={loading}
            />
          </div>

          <Button type="submit" fullWidth  disabled={loading} >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or sign in with</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            {/* <SocialButton provider="apple" /> */}
            <SocialButton provider="google" disabled={loading}/>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-600">
          Don’t have an account?{' '}
          {/* <Link to="/create-account" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Sign up
          </Link> */}
           <Link 
            to="/create-account" 
            className={`${loading ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:text-indigo-700 font-medium'}`}
            onClick={(e) => loading && e.preventDefault()} 
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;