class ProjectPolicy < ApplicationPolicy
    def admin?
        user.admin?
    end
end