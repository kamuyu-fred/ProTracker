class CommentSerializer < ActiveModel::Serializer
  attributes :id, :message, :created_at, :updated_at, :parent_comment_id, :project_id, :created_at

  has_many :replies, each_serializer: CommentSerializer do |serializer|
    serializer.object.replies.map do |reply|
      reply_serializer = CommentSerializer.new(reply)
      reply_serializer.serializable_hash.merge(comment_author: reply.user.username)
    end
  end

  belongs_to :user

end
