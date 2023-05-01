class Project < ApplicationRecord

  include PublicActivity::Model
  tracked 

  belongs_to :user
  belongs_to :cohort
  has_many :project_members, dependent: :destroy
  has_many :members, through: :project_members, source: :user
  has_many :likes, dependent: :destroy
  has_many :student_likes, through: :likes, source: :user
  has_many :tags
  has_many :comments


  validates :project_name, presence: true
  validates :project_description, presence: true
  validates :github_link, presence: true
  validates :category, presence: true



end