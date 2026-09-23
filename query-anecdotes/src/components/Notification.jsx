import { useNotify } from "../hooks/useNotify";

const Notification = () => {
  const { notificationMessage } = useNotify();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!notificationMessage) return null;

  return (
    <div data-testid="notification" style={style}>
      {notificationMessage}
    </div>
  );
};

export default Notification;
