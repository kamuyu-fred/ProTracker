class CommentSerializer < ActiveModel::Serializer
  attributes :id, :message, :created_at, :updated_at, :parent_comment_id, :project_id

  has_many :replies, each_serializer: CommentSerializer do |serializer|
    serializer.object.replies.map do |reply|
      reply_serializer = CommentSerializer.new(reply)
      reply_serializer.serializable_hash.merge(comment_author: reply.user.username)
    end
  end

  def user
    "#{self.object.user.username}"
  end

end
