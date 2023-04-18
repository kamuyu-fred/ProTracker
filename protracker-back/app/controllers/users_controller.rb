class UsersController < ApplicationController

    # * Creating a new account ( signing up );


    def create
        username = params[:first_name] + ' ' + params[:last_name];
        user = User.new(user_params)
        user.username = username
        user.password = params[:password]
        user.password_reset_token= SecureRandom.urlsafe_base64
        if user.save
          render json: user, status: :created
        else
          render json: { error: user.errors.full_messages }, status: :unprocessable_entity
        end
    end


    # * Granting a normal user admin rights


    def make_admin
      student = User.find_by(email: params[:email])
      if current_user.admin
        if student
          student.admin = true
          student.save
          render json: { message: "Successful", data: student } , status: :ok
        else
          render json: { error: user.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "You are not an admin" }, status: :unauthorized
      end
    end


    # * Revoking admin rights from a user


    def remove_admin
      student = User.find_by(email: params[:email])
      if current_user.role == 'admin'
        if student
          student.role = 'user'
          student.save
          render json: { message: "Successful", data: student } , status: :ok
        else
          render json: { error: user.errors.full_messages }, status: :unprocessable_entity
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
      render json: current_user
    end

    private

    def user_params
        params.permit(:username, :email, :password, :bio, :github_link)
    end

end