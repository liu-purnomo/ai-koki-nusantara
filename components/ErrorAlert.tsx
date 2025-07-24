
import React from 'react';

interface ErrorAlertProps {
  title: string;
  message: string;
  type?: 'error' | 'warning';
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ title, message, type = 'error' }) => {
  const baseClasses = "border-l-4 p-4 rounded-md my-4 animate-fade-in";
  const typeClasses = {
    error: "bg-red-100 border-red-500 text-red-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-800",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      <p className="font-bold">{title}</p>
      <p>{message}</p>
    </div>
  );
};
