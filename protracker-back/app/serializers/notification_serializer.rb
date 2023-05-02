class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :message, :notification_type, :read, :created_at
end
