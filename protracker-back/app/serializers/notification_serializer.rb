class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :message, :notification_type, :read
end
