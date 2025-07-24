
import React from 'react';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
      <p className="font-bold">Oops! Terjadi Kesalahan</p>
      <p>{message}</p>
    </div>
  );
};
