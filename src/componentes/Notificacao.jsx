// src/componentes/Notificacao.jsx
import React, { useEffect } from 'react';
import { useApp } from '../contextos/AppContext';

export default function Notificacao() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    if (state.notifications.length > 0) {
      const timer = setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: state.notifications[0].id });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.notifications, dispatch]);

  return (
    <div className="fixed top-0 right-0 m-4 z-50">
      {state.notifications.map((notification) => (
        <div key={notification.id} className={`p-4 mb-2 rounded-md ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
          {notification.message}
        </div>
      ))}
    </div>
  );
}