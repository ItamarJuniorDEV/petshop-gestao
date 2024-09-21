import React from 'react';

function BotaoPrincipal({ children, className, ...props }) {
  return (
    <button
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-150 ease-in-out ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default BotaoPrincipal;