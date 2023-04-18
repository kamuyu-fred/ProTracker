class CohortStudentPolicy < ApplicationPolicy

    # only an admin who owns the cohort can add members;
    def create?
        user.admin?
    end
    
  end