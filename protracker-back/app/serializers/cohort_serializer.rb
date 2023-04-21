class CohortSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_date, :end_date, :enrolled_members, :projects
  has_many :enrolled_members
  has_many :projects, through: :enrolled_members , source: :project
end
