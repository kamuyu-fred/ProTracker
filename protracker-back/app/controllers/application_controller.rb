class ApplicationController < ActionController::API
    include ActionController::Cookies

    include Pundit::Authorization

    before_action :verify_auth, only: [:update_last_seen_at]

    before_action :current_user

    before_action :update_last_seen_at, if: -> { !current_user.nil? && (current_user.last_seen_at.nil? || current_user.last_seen_at < 2.minutes.ago) }, except: [:remove_user]

    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized


    def online_users
        users = User.all
        online_users = users.where("last_seen_at < ?", 5.minutes.ago)
    end
# 
     # hash data into web token
     def encode(uid, email)
        payload = {
            data: {
                uid: uid,
                email: email,
                role: 'admin'
            },
        }
        JWT.encode(payload, 'task_manager' , 'HS256')
    end

    # unhash the token
    def decode(token)
        JWT.decode(token, 'task_manager' , true, { algorithm: 'HS256' })
    end

    # verify authorization headers
    def verify_auth
        auth_headers = request.headers['Authorization']
        if !auth_headers
            render json: auth_headers
        else
            token = auth_headers.split(' ')[1]
            save_user_id(token)
        end
    end

    # save user's id
    def save_user_id(token)
        @uid = decode(token)[0]["data"]["uid"].to_i
        save_user(@uid)
    end

    def save_user(uid)
        session[:user_id] = uid
    end

    # delete user id in session
    def remove_user
        set_user_offline
        session.delete(:user_id)
        render json: { message: "Logged out successfully"}
    end
    
    # get logged in user
    def current_user
        user_now ||= User.find_by(id: session[:user_id]) 
    end

    
    # verify authorization headers
    def verify_auth
        auth_headers = request.headers['Authorization']
        if !auth_headers
            render json: auth_headers
        else
            token = auth_headers.split(' ')[1]
            save_user_id(token)
        end
    end
      
    private
      
    def authenticate_user!
          if !current_user
            render json: { error: "You aren't signed in or signed up" }, status: :unauthorized
          end
    end
      
    def admin
        current_user.admin?
    end
    
    def user_not_authorized
        render json: { message: "You are not authorized to perform this action." }, status: :unauthorized
    end


    def update_last_seen_at
      if current_user.last_seen_at.nil? || current_user.last_seen_at < 2.minutes.ago
        current_user.update(online_status: 'online', last_seen_at: Time.current)
      else
        current_user.touch(:last_seen_at)
      end
    end
  

    def set_user_offline
      current_user.update(online_status: 'offline', last_seen_at: Time.current) 
    end


    # notification handler

    def create_notification(actor, receiver, message, type)
        new_notification_params = {
          actor_id: actor.id,
          receiver_id: receiver.id,
          message: message,
          notification_type: type
        }
    
        Notification.create!(new_notification_params)
    end

    # activity handler

    def create_user_activity(entity, key, username, task, owner)
        entity.create_activity(
          key: key,
          parameters: {
            user: "#{username}",
            task: task,
            created_at: "at #{Time.now.strftime('%H:%M')}"
          },
          owner: owner
        )
    end

    # Unlockin achievements

    def unlock_achievement(name, recipient)
        achievement = Achievement.where(name: name).first
        recipient.user_achievements.create!(achievement: achievement)
    end

end
