import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

export const showAppToast = (message, type = 'info') => {
  const toastOptions = {
    ...defaultOptions,
    style: {
      borderRadius: '10px',
      fontFamily: "'Inter', sans-serif",
      fontSize: '14px',
      fontWeight: '500',
      padding: '14px 16px',
      margin: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    progressStyle: {
      background: 'rgba(255, 255, 255, 0.3)',
      height: '3px',
    },
  };

  switch (type) {
    case 'success':
      toast.success(message, {
        ...toastOptions,
        style: {
          ...toastOptions.style,
          background: '#10B981', // Green
          color: '#FFFFFF',
          borderLeft: '4px solid #059669',
        },
        icon: "✅",
      });
      break;
    case 'error':
      toast.error(message, {
        ...toastOptions,
        style: {
          ...toastOptions.style,
          background: '#EF4444', // Red
          color: '#FFFFFF',
          borderLeft: '4px solid #DC2626',
        },
        icon: "❌",
      });
      break;
    case 'info':
      toast.info(message, {
        ...toastOptions,
        style: {
          ...toastOptions.style,
          background: '#3B82F6', // Blue
          color: '#FFFFFF',
          borderLeft: '4px solid #2563EB',
        },
        icon: "ℹ️",
      });
      break;
    case 'warning':
      toast.warning(message, {
        ...toastOptions,
        style: {
          ...toastOptions.style,
          background: '#F59E0B', // Amber/Orange
          color: '#FFFFFF',
          borderLeft: '4px solid #D97706',
        },
        icon: "⚠️",
      });
      break;
    default:
      toast(message, {
        ...toastOptions,
        style: {
          ...toastOptions.style,
          background: '#3B82F6', // Gray
          color: '#FFFFFF',
          borderLeft: '4px solid #4B5563',
        },
      });
  }
};

// Shortcut functions for easier usage
export const toastSuccess = (message) => showAppToast(message, 'success');
export const toastError = (message) => showAppToast(message, 'error');
export const toastInfo = (message) => showAppToast(message, 'info');
export const toastWarning = (message) => showAppToast(message, 'warning');

// Function with custom duration
export const showAppToastWithDuration = (message, type = 'info', duration = 5000) => {
  showAppToast(message, {
    ...defaultOptions,
    autoClose: duration,
  }, type);
};