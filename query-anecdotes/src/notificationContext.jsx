import { createContext, useState, useRef } from "react";

const NotificationContext = createContext();

const NotificationContextProvider = (props) => {
  const [notificationMessage, setNotificationMessage] = useState(null);
  const timerRef = useRef(null);

  const notify = (message) => {
    setNotificationMessage(message);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const hideNotification = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (notificationMessage) {
      setNotificationMessage(null);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notificationMessage, notify, hideNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationContextProvider };
