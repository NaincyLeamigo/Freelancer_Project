import { AppleIcon, GoogleIcon } from './Icons';

function SocialButton({ provider }) {
  const icons = {
    apple: <AppleIcon />,
    google: <GoogleIcon />
  };

  const handleClick = () => {
    console.log(`Sign up with ${provider}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-16 h-16 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
      aria-label={`Sign up with ${provider}`}
    >
      {icons[provider]}
    </button>
  );
}

export default SocialButton;