import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from './Icons';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft />
    </button>
  );
}

export default BackButton;