class HeartbeatController < ApplicationController

    def index
        online = current_user && current_user.last_seen_at > 2.minutes.ago
        render json: { online: online }
    end

    def update
        if current_user.last_seen_at.nil? || current_user.last_seen_at < 2.minutes.ago
            current_user.update(online_status: 'online', last_seen_at: Time.current)
        else
            current_user.touch(:last_seen_at)
        end
    end

end
