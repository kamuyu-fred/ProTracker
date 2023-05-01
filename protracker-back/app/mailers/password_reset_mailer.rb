class PasswordResetMailer < ApplicationMailer
    def password_reset(user)
        @user = user
        mail to: @user.email, subject: 'Password reset instructions'
    end

    def password_success(user)
        @user = user
        mail to: @user.email, subject: 'Password reset successfully'
    end
end
