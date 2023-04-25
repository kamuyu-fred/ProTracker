class CohortsController < ApplicationController
    before_action :verify_auth

    def all_cohorts
        cohorts = Cohort.all
        render json: cohorts
    end
        # create a new cohort;
    # * cleared
    def create
        new_cohort = current_user.owned_cohorts.build(cohort_params)

        authorize new_cohort
        
        if !new_cohort.save
            render json: { errors: new_cohort.errors.full_messages }, status: :unprocessable_entity
            return
        end

        new_cohort.cohort_students.create(user: current_user)

        render json: { message: 'Cohort created successfully'}, status: :created

    end

    
    # updating a cohort
    #  * cleared
    def update
        updated_cohort = current_user.owned_cohorts.find_by(id: params[:cohort_id])
        if updated_cohort.update(cohort_params)
          render json: {message: "Cohort updated successfully", data: updated_cohort}, status: :ok
        else
          render json: { errors: updated_cohort.errors.full_messages }, status: :unprocessable_entity
        end
    end


    #retrieve all cohort members;
    # * cleared
    def all_members
        members = Cohort.find_by(id: params[:cohort_id].to_i).users
        render json:  members, include: :projects, status: :ok
    end


    # retrieve cohort admin;
    # * cleared
    def cohort_admin
        current_cohort = Cohort.find_by(id: params[:cohort_id].to_i)
        if current_cohort
            cohort_admin = User.find_by(id: current_cohort.user_id)
            render json: { admin: cohort_admin }, status: :ok
        else
            render json: { message: 'Cohort does not exist' }, status: :not_found
        end
    end

    # retrieving all corhots a user is part of;
    # * cleared
    def my_cohorts
        cohorts = current_user.enrolled_cohorts
        render json: cohorts, status: :ok
    end

    # retrieving all corhots a user is an admin;
    # * cleared
    def admin_cohorts           
        cohorts = current_user.owned_cohorts
        render json: cohorts, include: :users
    end
    private

    def cohort_params
        params.permit(:name, :start_date, :end_date)
    end

    def selected_cohort(cid)
       cohort = current_user.owned_cohorts.find_by(cid)
    end

end
