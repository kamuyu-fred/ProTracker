class SessionController < ApplicationController

    def login
        user = User.find_by(email: params[:email])

        if !user
          render json: { message: "User not found" }, status: :not_found
          return
        end

        if user&.authenticate(params[:password])
          token = encode(user.id, user.email)
          save_user_id(token)
          render json: { message: "Logged in successfully", user: user ,  token: token}, status: :ok
        else
          render json: { error: "Invalid email or password" }, status: :unauthorized
        end
        
    end
  
  
    def check_out
      if current_user
          render json: current_user
      else
        render json: { message: "No user is logged in", data: @current_user}
      end
    end


    def destroy 
        remove_user
    end

end
