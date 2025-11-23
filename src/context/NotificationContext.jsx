import { createContext, useContext, useState, useRef } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState(null);
  const timeoutRef = useRef(null);

  const showNotification = (msg, duration = 2000) => {
    setMessage(msg);

    // Cancella timeout precedente se esiste
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Imposta timeout nuovo
    timeoutRef.current = setTimeout(() => {
      setMessage(null);
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ message, showNotification }}>
      {children}
      {message && <div className="notification-toast">{message}</div>}
    </NotificationContext.Provider>
  );
}

// Hook
export function useNotification() {
  return useContext(NotificationContext);
}
