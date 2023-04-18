class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :admin, :bio, :github_link
end
