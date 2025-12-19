import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import SocialButton from '../../components/ui/SocialButton';
import Checkbox from '../../components/ui/Checkbox';
import BackButton from '../../components/ui/BackButton';
import { showAppToast } from '../../utils/Toast';
import { useAuth } from '../../context/AuthContext';

function SignIn() {
  const navigate = useNavigate(); 
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password) {
      showAppToast?.("Please fill your password", "warning");
      return;
    }
    if (!formData.email) {
      showAppToast?.("Please fill your email", "warning");
      return;
    }

    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      if (user) {
        showAppToast?.("Login successful", "success");
        if (user.role === "freelancer") {
          navigate("/setup-profile");
        } else if (user.role === "hirer") {
          navigate("/explore-talent");
        } else {
          navigate("/");
        }
      } else {
        alert("Login failed");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Login failed";
      // alert(msg);
      showAppToast?.("Login failed", "error");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-50 rounded-3xl shadow-sm p-8 space-y-6">
        <BackButton disabled={loading} />

        <h1 className="text-3xl font-medium text-center text-gray-900 mb-3">
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
            className="w-full"
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
              className="w-full"
            />
            <div className="text-right mt-1 ">
              <Link
                to="/forgot-password"
                className={`text-sm ${loading ? 'text-gray-400 cursor-not-allowed' : 'text-[#5A4DFF] hover:text-indigo-700'}`}
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

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="pt-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <div className='flex justify-center w-full items-center border border-gray-200 px-2 rounded-full'>
              <SocialButton provider="google" disabled={loading} />
              <span className='text-gray-600'>Continue with Google</span>
            </div>
          </div>
        </div>

        <p className="pt-4 text-center text-gray-600">
          Don’t have an account?{' '}
          <Link
            to="/create-account"
            className={`ml-1 ${loading ? 'text-gray-400 cursor-not-allowed' : 'text-[#5A4DFF] hover:text-indigo-700'}`}
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
