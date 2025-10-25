// components/ToastMessage.tsx
import { useEffect } from "react";

interface ToastMessageProps {
  message: string;
  onClose: () => void;
}

const ToastMessage = ({ message, onClose }: ToastMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 2000); // auto close after 2s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg animate-zoomOut">
      {message}
    </div>
  );
};

export default ToastMessage;
