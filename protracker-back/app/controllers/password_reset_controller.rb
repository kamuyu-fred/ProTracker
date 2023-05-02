class PasswordResetController < ApplicationController

    def new
        user = User.find_by_email(params[:email])
        if user.present?
          # send password reset email to user using PasswordResetMailer
          PasswordResetMailer.password_reset(user).deliver_now
          render json: { message:'Password reset instructions have been sent to your email.', data: user.email} , status: :ok
        else
          render json: { message:'Email address has not been found' } , status: :not_found
        end
      end
  
    
      def create
        user = User.find_by(email: params[:email])
        token = user.password_reset_token
  
          if token == params[:password_reset_token]
            user.update(password: params[:password])
            PasswordResetMailer.password_success(user).deliver_now
            render json: { message: 'successful' }
          else
            render json: { message: 'failed' }
          end
      end
      
end
