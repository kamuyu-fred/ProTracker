class CohortStudentsController < ApplicationController

    before_action :verify_auth
        # adding members to a cohort;
    # * cleared;
    def create
        cohort = Cohort.find_by(id: params[:cohort_id])

        # authorize cohort, :owner?

        student = User.find_by(id: params[:user_id])

        if !student
          render json: { message: "Student not found" } , status: :not_found
          return
        end

        @cohort_student = CohortStudent.new(user_id: student.id, cohort_id: params[:cohort_id])

        # authorize @cohort_student

        if !@cohort_student.save
            render json: {message: "Student was not added.",  errors: @cohort_student.errors.full_messages} , status: :unprocessable_entity
            return
        end

        new_notification_params = {
          actor_id: current_user.id,
          receiver_id: @cohort_student.id,
          message: "#{current_user.username} aded you to cohort #{cohort.name}",
          notification_type: "Added to cohort" 
        }

        new_notification  = Notification.create(new_notification_params)

        # CohortEnrollmentMailer.student_enrollment(student,current_user).deliver_later

        render json: { message: "Student added successfully" } , status: :ok
    end



    # deleting members from a cohort;
    # * cleared;
    def delete
      cohort = Cohort.find_by(id: params[:cohort_id])

      authorize cohort, :owner?

      student = User.find_by(email: params[:email])

      if !student
        render json: { message: "Student not found" } , status: :not_found
        return
      end

      student_exists_in_the_cohort = cohort.cohort_members.exists?(user_id: student.id)

      if !student_exists_in_the_cohort
        render json: { message: "Student does not exist in the cohort" } , status: :unprocessable_entity
        return
      end

      cohort.cohort_members.destroy(cohort.cohort_members.where(user_id: student.id))

      # CohortEnrollmentMailer.student_dismissal(student,current_user).deliver_now

      render json: { message: "Student dismissed successfully" } , status: :ok
    end
    
  

end
