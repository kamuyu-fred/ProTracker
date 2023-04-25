class UsersController < ApplicationController


    def all_users
      users = User.all
      render json: users
    end
    
    # * Creating a new account ( signing up );


    def create

      user = User.new(user_params) do |u|
        u.username = "#{params[:first_name]} #{params[:last_name]}"
        u.password = params[:password]
        u.password_reset_token = SecureRandom.urlsafe_base64
      end
    
      if user.save
        render json: user, status: :created
      else
        render json: { error: user.errors.full_messages }, status: :unprocessable_entity
      end
      
    end


    # * Granting a normal user admin rights


    def make_admin
      student = User.find_by(email: params[:email])

      if !student.present?
        render json: { message: 'Student not found' }, status: :not_found
        return
      end

      if current_user.admin?
        if student
          student.admin = true
          student.save

          new_notification_params = {
            actor_id: current_user.id,
            receiver_id: student.id,
            message: "#{current_user.username} gave you administrative rights.",
            notification_type: "Granted administrative rights." 
        }

        new_notification  = Notification.create(new_notification_params)

          render json: { message: "Successful", data: student } , status: :ok
        else
          render json: { error: student.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "You are not an admin" }, status: :unauthorized
      end
    end


    # * Revoking admin rights from a user


    def remove_admin
      student = User.find_by(email: params[:email])
      if current_user.admin?
        if student
          student.admin = false
          student.save
          render json: { message: "Successful", data: student } , status: :ok
        else
          render json: { error: student.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "You are not an admin" }, status: :unauthorized
      end
    end

    # updating profile
    # * cleared
    def update
      if current_user.update(user_params)
        current_user.create_activity(key: 'user.update',parameters:{
          user: "#{current_user.username}",
          task: "updated their profile details ",
          created_at: "at #{Time.now.strftime('%H:%M')}"
      }, owner: current_user)

        render json: { message: "Profile updated successfully" }, status: :ok
      else
        render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
      end
    end


    # check users profile
    # * cleared
    def my_profile 
      render json: current_user, include: :achievements
    end

    private

    def user_params
        params.permit(:username, :email, :password, :bio, :github_link)
    end

end
