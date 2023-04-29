class UsersController < ApplicationController

  before_action :verify_auth, only: [:user_profile,:update,:update_avatar]

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

      if !current_user.update(user_params)
        render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
        return
      end

      if user_params[:password].present?
        current_user.update(user_params)
        current_user.create_activity(key: 'user.update',parameters:{
          user: "#{current_user.username}",
          task: "updated their profile details ",
          created_at: "at #{Time.now.strftime('%H:%M')}"
      }, owner: current_user)
      render json: { message: "Profile updated successfully" }, status: :ok
      else
        current_user.update(user_params.except(:password))
        current_user.create_activity(key: 'user.update',parameters:{
          user: "#{current_user.username}",
          task: "updated their profile details ",
          created_at: "at #{Time.now.strftime('%H:%M')}"
      }, owner: current_user)
      render json: { message: "Profile updated successfully" }, status: :ok
      end
    end

    def update_avatar
      current_user.update(avatar_url: params[:avatar_url])
      render json: { message: "Profile updated successfully" }, status: :ok
    end


    # check users profile
    # * cleared
    def user_profile 
     render json: current_user
    end

    private

    def user_params
        params.permit(:username, :email, :password, :bio, :github_link, :avatar_url)
    end

end
