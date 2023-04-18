class CohortPolicy < ApplicationPolicy
    attr_reader :user, :cohort

    def initialize(current_user, cohort)
        @user = current_user
        @cohort = cohort
    end

    def create?
        Admin.all.exists?(user)
    end

    def add_member
        user.admin?
    end

    def owner?
        user == cohort.user
    end

    def make_admin
        user.admin?
    end



end