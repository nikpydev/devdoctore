import ReactDOM from "react-dom";
import classes from "./notification.module.css";

function Notification(props) {
  const { title, message, status } = props;
  console.log("title: ", title);
  console.log("message: ", message);
  console.log("status: ", status);

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("notifications")
  );
}

export default Notification;
