class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :admin, :bio, :github_link, :achievements, :avatar_url, :online_status
  has_many :achievements
  has_many :enrolled_projects
  has_many :projects
  has_many :liked_projects
end
