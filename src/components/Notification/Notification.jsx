import React, { useState, useEffect } from "react";
import { Bell, Check, Trash2, X } from "lucide-react";
import "./Notification.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching notifications
  useEffect(() => {
    const fetchNotifications = () => {
      const mockNotifications = [
        {
          id: 1,
          title: "System Update",
          description: "A new system update is available. Click to learn more.",
          time: "2 hours ago",
          read: false,
          priority: "high",
        },
        {
          id: 2,
          title: "Meeting Reminder",
          description: "You have a meeting scheduled at 3:00 PM.",
          time: "4 hours ago",
          read: true,
          priority: "medium",
        },
        {
          id: 3,
          title: "New Message",
          description: "You received a new message from John.",
          time: "6 hours ago",
          read: false,
          priority: "low",
        },
        {
          id: 4,
          title: "Payment Received",
          description: "Your payment of $200 has been successfully received.",
          time: "1 day ago",
          read: true,
          priority: "medium",
        },
        {
          id: 5,
          title: "Security Alert",
          description: "A login attempt was detected from a new device.",
          time: "2 days ago",
          read: false,
          priority: "high",
        },
        {
          id: 6,
          title: "Event Invitation",
          description:
            "You are invited to the company's annual event on Friday.",
          time: "3 days ago",
          read: true,
          priority: "low",
        },
        {
          id: 7,
          title: "Task Deadline",
          description: "Your task 'Design Mockup' is due tomorrow.",
          time: "5 hours ago",
          read: false,
          priority: "high",
        },
        {
          id: 8,
          title: "Subscription Renewal",
          description: "Your subscription will renew automatically on Jan 15.",
          time: "7 days ago",
          read: true,
          priority: "low",
        },
      ];

      setTimeout(() => {
        setNotifications(mockNotifications);
        setIsLoading(false);
      }, 1000);
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const getUnreadCount = () => {
    return notifications.filter((notification) => !notification.read).length;
  };

  if (isLoading) {
    return (
      <div className="notifications__loading">
        <div className="loading-spinner"></div>
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="notifications">
      <header className="notifications__header">
        <div className="notifications__header-left">
          <Bell className="notifications__icon" />
          <h1>Notifications</h1>
          {getUnreadCount() > 0 && (
            <span className="notifications__badge">{getUnreadCount()}</span>
          )}
        </div>
        <div className="notifications__actions">
          {notifications.length > 0 && (
            <>
              <button
                onClick={markAllAsRead}
                className="notifications__action-btn mark-read"
                title="Mark all as read"
              >
                <Check size={18} />
                <span>Mark all read</span>
              </button>
              <button
                onClick={clearNotifications}
                className="notifications__action-btn clear"
                title="Clear all notifications"
              >
                <Trash2 size={18} />
                <span>Clear all</span>
              </button>
            </>
          )}
        </div>
      </header>

      <div className="notifications__list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item priority-${notification.priority} ${
                notification.read ? "read" : "unread"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-content">
                <h2 className="notification-title">{notification.title}</h2>
                <p className="notification-description">
                  {notification.description}
                </p>
                <span className="notification-time">{notification.time}</span>
              </div>
              <button
                className="notification-delete"
                onClick={(e) => deleteNotification(notification.id, e)}
                title="Delete notification"
              >
                <X size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="no-notifications">
            <Bell size={48} className="empty-icon" />
            <p>No notifications available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
