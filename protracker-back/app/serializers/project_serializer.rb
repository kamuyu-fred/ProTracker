class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :project_name, :project_description, :user_id, :github_link, :category , :members, :student_likes, :tags, :cohort_id, :comments
  belongs_to :user
  belongs_to :cohort
  has_many :members
  has_many :student_likes
  has_many :tags
  has_many :comments
end
