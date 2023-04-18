class Cohort < ApplicationRecord

  belongs_to :user
  has_many :projects
  has_many :cohort_students
  has_many :users, through: :cohort_students
  has_many :cohort_members, class_name: "CohortStudent", foreign_key: "cohort_id"
  has_many :enrolled_members, through: :cohort_members, source: :user
  

  validates :name, presence: true
  validates :start_date, presence: true
  validate :end_date_cannot_be_earlier_than_start_date

  
  def end_date_cannot_be_earlier_than_start_date
    if end_date.present? && end_date <= start_date
      errors.add(:end_date, "can't be earlier than start date")
    end
  end
end