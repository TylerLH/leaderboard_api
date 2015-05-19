import alt from "../alt";
import _ from "underscore";
import NotificationActions from "../actions/NotificationActions";

class NotificationStore {
  constructor() {
    this.notifications = [];

    this.bindListeners({
      addNotification: NotificationActions.ADD_NOTIFICATION,
      dismissNotification: NotificationActions.DISMISS_NOTIFICATION
    });
  }

  addNotification(notification) {
    console.log("Adding notification");
    this.notifications.push(notification);
  }

  dismissNotification(notification) {
    this.notifications = _.without(this.notifications, notification);
  }
}

export default alt.createStore(NotificationStore, 'NotificationStore');