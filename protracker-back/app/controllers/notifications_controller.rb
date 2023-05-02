class NotificationsController < ApplicationController

    before_action :verify_auth

    def get_notifications
        notifications = Notification.where(receiver_id: current_user.id).order(created_at: :desc)
        render json: notifications
    end

    def get_unread_notifications
        notifications = Notification.where(receiver_id: current_user.id, read: false).order(created_at: :desc)
        render json: notifications
    end

    def mark_as_read
        notification = Notification.find_by(id: params[:notif_id])
        notification.read = true
        notification.save
        render json: notification
    end

    def mark_all_as_read
        notifications = Notification.where(receiver_id: current_user.id).update_all(read: true);
        render json: {message: "successfull"}, status: :ok
    end
end
