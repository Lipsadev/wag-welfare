// src/components/AuthRequiredPopup.tsx
import React, { useEffect } from "react";

interface Props {
  message: string;
  show: boolean;
  onHide: () => void;
}

const AuthRequiredPopup = ({ message, show, onHide }: Props) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onHide, 1500); // auto hide after 1.5s
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  return (
    show ? (
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg animate-zoomOut">
          {message}
        </div>
        <style>{`
          @keyframes zoomOut {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0.5); opacity: 0; }
          }
          .animate-zoomOut {
            animation: zoomOut 1.5s forwards;
          }
        `}</style>
      </div>
    ) : null
  );
};

export default AuthRequiredPopup;
