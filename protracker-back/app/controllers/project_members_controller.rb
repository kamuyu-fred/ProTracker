class ProjectMembersController < ApplicationController

    # A member can only be added once to a project;
    # *cleared
    def add_member
        student = User.find_by(email: params[:email])

        if !student
            render json: { message: 'Student not found' }, status: :not_found
            return
        end

        cohort = current_user.enrolled_cohorts.find_by(id: params[:cohort_id])

        if !cohort
            render json: { message: 'Cohort not found' }, status: :not_found
            return
        end

        cohort_members = cohort.enrolled_members

        student_exists_in_cohort = cohort_members.exists?(student.id)

        if !student_exists_in_cohort
           render json: { message: 'Student does not exist in cohort' }, status: :not_found
           return
        end

        current_project = current_user.projects.find_by(id: params[:project_id].to_i)

        member = current_project.project_members.find_by(user_id: student.id)


        if !member
            current_project.project_members.create(user: student)

            current_project.create_activity(key: 'projectmember.create',parameters:{
                user: "#{current_user.username}",
                task: "added #{student.username} to a project titled '#{current_project.project_name}'",
                created_at: "at #{Time.now.strftime('%H:%M')}"
            }, owner: current_user)

            new_notification_params = {
                actor_id: current_user.id,
                receiver_id: student.id,
                message: "You have been added to #{current_project.project_name} by #{current_user.username}",
                notification_type: "Added to project"
            }

            new_notification  = Notification.create(new_notification_params)

            enrolled_projects = student.enrolled_projects.count.to_i


            if(enrolled_projects == 10)

                user_achievement = Achievement.where(name: "Team Player").first
                student.user_achievements.create!(achievement: user_achievement)
                new_notification_params = {
                    actor_id: student.id,
                    receiver_id: student.id,
                    message: "You have unlocked the Team Player achievement being added to 10 groups!",
                    notification_type: "Achievement unlocked" 
                }
        
                new_notification  = Notification.create!(new_notification_params)
                
            end

            render json: { message: 'Project member added successfully', data:user_achievement }, status: :ok

        else
            if member.project_id != current_project.id

                current_project.project_members.create(user: student)

                current_project.create_activity(key: 'projectmember.create',parameters:{
                    user: "#{current_user.username}",
                    task: "added #{member.username} to a project titled '#{current_project.project_name}'",
                    created_at: "at #{Time.now.strftime('%H:%M')}"
                }, owner: current_user)


                new_notification_params = {
                    actor_id: current_user.id,
                    receiver_id: student.id,
                    message: "You have been added to #{current_project.project_name} by #{current_user.username}",
                    notification_type: "Added to project"
                }
    
                new_notification  = Notification.create(new_notification_params)

               enrolled_projects = student.enrolled_projects.count.to_i

              if(enrolled_projects == 10)

                user_achievement = Achievement.where(name: "Team Player").first
                student.user_achievements.create!(achievement: user_achievement)
                new_notification_params = {
                    actor_id: student.id,
                    receiver_id: student.id,
                    message: "You have unlocked the Team Player achievement being added to 10 groups!",
                    notification_type: "Achievement unlocked" 
                }
        
                new_notification  = Notification.create!(new_notification_params)

            end

                render json: { message: 'Project member added successfully', data: new_notification }, status: :ok

            else
                render json: { message: 'User already exists' }, status: :unprocessable_entity
            end
        end
    end

    # retrieving all members of a project;
    # *cleared
    def project_members
        current_project = current_user.projects.find_by(id: params[:project_id])
        members = current_project.members 
        render json: members
    end

end