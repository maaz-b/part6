import { useContext } from "react";
import { NotificationContext } from "../notificationContext";

const useNotify = () => {
  return useContext(NotificationContext);
};

export { useNotify };
