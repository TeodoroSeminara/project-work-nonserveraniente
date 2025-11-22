import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState(null);

  // mostra notifica per n secondi
  const showNotification = (msg, duration = 2000) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), duration);
  };
  return (
    <NotificationContext.Provider value={{ message, showNotification }}>
      {children}
      {/* Overlay notifica globale, visibile OVUNQUE */}
      {message && <div className="notification-toast">{message}</div>}
    </NotificationContext.Provider>
  );
}
// Hook per notifica
export function useNotification() {
  return useContext(NotificationContext);
}
