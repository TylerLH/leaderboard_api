import alt from "../alt";

class NotificationActions {
  addNotification(notification) {
    this.dispatch(notification);
  }

  dismissNotification(notification) {
    this.dispatch(notification);
  }
}

export default alt.createActions(NotificationActions);