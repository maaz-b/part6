import { useNotification } from "../notification-store";

const Notification = () => {
  const notificationMessage = useNotification();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  if (!notificationMessage) {
    return <></>;
  } else {
    return (
      <div style={style} data-testid="notification">
        {notificationMessage}
      </div>
    );
  }
};

export { Notification };
