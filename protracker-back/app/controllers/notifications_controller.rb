class NotificationsController < ApplicationController
    def get_notifications
        notifications = Notification.where(receiver_id: current_user.id)
        render json: notifications
    end

    def get_unread_notifications
        notifications = Notification.where(receiver_id: current_user.id, read: false)
        render json: notifications
    end

    def mark_as_read
        notification = Notification.find_by(id: params[:notif_id])
        notification.read = true
        notification.save
        render json: notification
    end
end
