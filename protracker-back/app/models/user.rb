class User < ApplicationRecord
    has_secure_password

    include PublicActivity::Model
    tracked 

    has_many :projects
    has_many :owned_cohorts, class_name: "Cohort", foreign_key: "user_id"
    has_many :cohort_students, class_name: "CohortStudent", foreign_key: "user_id"
    has_many :enrolled_cohorts, through: :cohort_students, source: :cohort
    has_many :project_members, dependent: :destroy
    has_many :likes
    has_many :comments
    # has_many :u, through: :project_members

    # Validations;
    validates :username, presence: true
    validates :email, presence: true, uniqueness: true, format: { with:URI::MailTo::EMAIL_REGEXP}
    validates :password, presence: true, on: :create

end