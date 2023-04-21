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
            task = "added #{student.username} to a project titled '#{current_project.project_name}'"

            create_user_activity(current_project, "projectmember.create", current_user.username, task, current_user)
            create_notification(current_user, student, "You have been added to #{current_project.project_name} by #{current_user.username}", "Added to project")

            enrolled_projects = student.enrolled_projects.count.to_i

            if(enrolled_projects == 10)
                unlock_achievement("Team Player", student)
                create_notification(student, student, "You have unlocked the Team Player achievement being added to 10 groups!", "Unlocked new achievement")
            end

            render json: { message: 'Project member added successfully' }, status: :ok

        else
            if member.project_id != current_project.id
                current_project.project_members.create(user: student)
                task = "added #{member.username} to a project titled '#{current_project.project_name}'"
                create_user_activity(current_project, "projectmember.create", current_user.username, task, current_user)
                create_notification(current_user, student, "You have been added to #{current_project.project_name} by #{current_user.username}", "Added to project")
                enrolled_projects = student.enrolled_projects.count.to_i

              if(enrolled_projects == 10)

                unlock_achievement("Team Player", student)
                create_notification(student, student, "You have unlocked the Team Player achievement being added to 10 groups!","Achievement unlocked")
            end

                render json: { message: 'Project member added successfully' }, status: :ok

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
