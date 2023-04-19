class ProjectsController < ApplicationController

    # like a project
    def like
        @project = Project.find(params[:project_id])

        user_already_liked = @project.likes.exists?(user_id: current_user.id)

        if user_already_liked
            render json: { message: "You have already liked"}, status: :unprocessable_entity
            return
        end

        project_likes =  @project.likes.count.to_i
        project_owner =  @project.user

        @project.create_activity(key: 'project.like',parameters:{
            user: "#{current_user.username}",
            task: "liked '#{@project.project_name}'",
            created_at: "at #{Time.now.strftime('%H:%M')}"
        }, owner: current_user)

        new_notification_params = {
            actor_id: current_user.id,
            receiver_id: @project.user.id,
            message: "#{current_user.username} liked your project #{@project.project_name}",
            notification_type: "Your project was Liked" 
        }

        new_notification  = Notification.create(new_notification_params)

        current_user.likes.create(project: @project)

        if (project_likes = 1)
            user_achievement = Achievement.where(name: "Stellar Project").first
            project_owner.user_achievements.create!(achievement: user_achievement)
        end
   

        render json: { message: "Liked!"} , status: :ok
    end




    def dislike
        @project = Project.find(params[:project_id])

        user_already_liked = @project.likes.exists?(user_id: current_user.id)

        if !user_already_liked
            render json: { message: "You have not liked it"}, status: :unprocessable_entity
            return
        end

        @project.create_activity(key: 'project.like',parameters:{
            user: "#{current_user.username}",
            task: "unliked '#{@project.project_name}'",
            created_at: "at #{Time.now.strftime('%H:%M')}"
        }, owner: current_user)

        new_notification_params = {
            actor_id: current_user.id,
            receiver_id: @project.user.id,
            message: "#{current_user.username} disliked your project #{@project.project_name}",
            notification_type: "Your project was disliked" 
        }

        new_notification  = Notification.create(new_notification_params)

        current_user.likes.find_by(project: @project).destroy
        render json: { message: 'Disliked!'} , status: :ok
    end



    # check who has liked the project
    #  * cleared
    def liked_by
        project = current_user.projects.find_by(id: params[:project_id]).student_likes
        render json: project
    end


    # retrieve a projects details;
    # *cleared
    def project_details
        assigned_projects = current_user.project_members.where(user_id: current_user.id).map do |project|
            Project.where(id: project.project_id).first
        end
        render json: assigned_projects.find{|item| item.id = params[:project_id]}, include: [:user, :members]
    end


    # create a new project
    # *cleared
    def create
        new_project = current_user.projects.build(project_params)
        current_cohort = current_user.enrolled_cohorts.find_by(id: params[:cohort_id])

        if !current_cohort
            render json: { message: 'Cohort not found' }, status: :not_found
            return
        end

        new_project = Project.new(project_params)
        new_project.user_id = current_user.id
        new_project.cohort_id = current_cohort.id

        if !new_project.save
            render json: { errors: new_project.errors.full_messages } , status: :unprocessable_entity
            return
        end
  

        tags = params[:tags]

        if tags
            tags.each do |tag|
                new_project.tags.build(name: tag)
            end
        end

        new_project.project_members.build(user: current_user)

        new_project.save

        user_projects_count = current_user.projects.count.to_i

        if (user_projects_count == 10)
         user_achievement = Achievement.where(name: "Work Horse").first
         current_user.user_achievements.create!(achievement: user_achievement)

        new_notification_params = {
            actor_id: current_user.id,
            receiver_id: current_user.id,
            message: "You have unlocked the Work Horse for creating ten projects!",
            notification_type: "Achievement unlocked" 
        }

        new_notification  = Notification.create!(new_notification_params)

        elsif (user_projects_count == 5)

         user_achievement = Achievement.where(name: "Prolific Creator").first
         current_user.user_achievements.create!(achievement: user_achievement)

         new_notification_params = {
            actor_id: current_user.id,
            receiver_id: current_user.id,
            message: "You have unlocked the Prolific Creator achievement for creating five projects!",
            notification_type: "Achievement unlocked" 
        }

        new_notification  = Notification.create!(new_notification_params)

        end


        render json: { message: 'Project created successfully',  data: new_project} , status: :ok

        new_project.create_activity(key: 'project.create',parameters:{
            user: "#{current_user.username}",
            task: "created a project titled '#{new_project.project_name}'",
            created_at: "at #{Time.now.strftime('%H:%M')}"
        }, owner: current_user)
    end


    # querying projects by input value;

    def get_project_by_input_value
        current_cohort = current_user.enrolled_cohorts.find_by(id: params[:cohort_id])

        if !current_cohort
            render json: { message: "Cohort not found" }, status: :not_found
            return
        end

        search_params = params[:search_params] || "name"
        search_term = params[:search_term]


        if search_params == "tags"
            # wild card
            projects = Project.joins(:tags).where("tags.name LIKE ?", "%#{search_term}%")
            project_ids = projects.pluck(:id)
            results = current_cohort.projects.where(id: project_ids)

        elsif search_params == "name"

            projects = Project.where("project_name LIKE ?", "%#{search_term}%")
            project_ids = projects.pluck(:id)
            results = current_cohort.projects.where(id: project_ids)
        end

        if results.empty?
            render json: { message: "No results found" } , status: :not_found
            return
        end

        render json: results, status: :ok
    end

    # update a project;
    # * cleared
    def update
        update_project = current_user.projects.find_by(id: params[:project_id])

        if !update_project.present?
            render json: { message: 'Project not found' } , status: :not_found
            return
        end

        params = []

        changed_params = project_params.each do |key, value|
                params << "#{key.split('_').last}"
        end


        last_value = params.pop
        if params.empty?
            result = last_value
        else
            result = "#{params.join(', ')} and #{last_value}"
        end
        # it workkkkssssssss!!!!!!!!!!!!!!
        if update_project.update(project_params)
            update_project.create_activity(key: 'project.like',parameters:{
                user: "#{current_user.username}",
                task: "updated the #{result} of '#{update_project.project_name}'",
                created_at: "at #{Time.now.strftime('%H:%M')}"
            }, owner: current_user)
            render json: {message: "Project updated successfully", data: update_project}, status: :ok
        else
            render json: { errors: update_project.errors.full_messages }, status: :unprocessable_entity
        end
    end


    # retrieving projects
    # all;
    # *cleared
    def all_projects
        current_cohort = current_user.enrolled_cohorts.find_by(id: params[:cohort_id])
        if !current_cohort
            render json: { message: "Cohort not found" }, status: :not_found
            return
        end
        projects = current_cohort.projects
        authorize projects, :admin?
        render json: projects, include: :user
    end


    # for a specific student using their email;
    # *cleared
    def student_projects
        student = User.find_by(email: params[:email])
        if student.present?
            student_projects = student.projects.all
            render json: student_projects, include: :members
        else
            render json: { message: 'Student not found' }
        end
    end

    # current user who is logged in;
    # * cleared
    def current_user_projects
        projects = current_user.projects.all
        render json: projects, include: :members , status: :ok
    end

    # check what projects a user is assigned to;
    # * cleared
    def my_assigned_projects
        assigned_projects = current_user.project_members.where(user_id: current_user.id).where(user_id: current_user.id).map do |project|
            Project.where(id: project.project_id).first
        end
        render json: assigned_projects
    end

    private

    def project_params
        params.permit(:project_name, :project_description, :github_link, :category) 
    end

end
