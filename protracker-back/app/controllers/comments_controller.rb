class CommentsController < ApplicationController

    # Post a comment
    # * cleared
    def post_comment
        project = Project.find(params[:project_id])
        comment = project.comments.build(comment_params)
        comment.user = current_user
    
        if comment.save
            current_user.create_activity(key: 'project.comment',parameters:{
                user: "#{current_user.username}",
                task: "commented on '#{project.project_name}'",
                created_at: "at #{Time.now.strftime('%H:%M')}"
            }, owner: current_user)

            new_notification_params = {
                actor_id: current_user.id,
                receiver_id: project.user.id,
                message: "#{current_user.username} commented on your project #{project.project_name}",
                notification_type: "Project comment" 
            }
    
            new_notification  = Notification.create(new_notification_params)

            render json: { message: "Comment saved successfully" }, status: :created
        else
           render json: { message: "Couldn't create comment" }, status: :unprocessable_entity
        end
    end

    #reply to a comment
    # * cleared
    def reply_comment

        parent_comment = Comment.find_by(id: params[:comment_id])
        project = parent_comment.project
        reply = parent_comment.replies.build(comment_params)
        reply.user = current_user
        reply.project = project

        if reply.save
            current_user.create_activity(key: 'comment.reply',parameters:{
                user: "#{current_user.username}",
                task: "replied to #{reply.user.username}'s comment",
                created_at: "at #{Time.now.strftime('%H:%M')}"
            }, owner: current_user)

            new_notification_params = {
                actor_id: current_user.id,
                receiver_id: parent_comment.user.id,
                message: "#{current_user.username} replied to your comment",
                notification_type: "Comment reply" 
            }
    
            new_notification  = Notification.create(new_notification_params)

            render json: { message: "successfully created reply", data: reply }, status: :created
        else
            render json: { message: "Reply not sent", errors: reply.errors.full_messages }, status: :unprocessable_entity
        end
    end


    def show_thread
        parent_comment = Comment.find_by(id: params[:comment_id])
        render json: parent_comment
    end

    private

    def comment_params
        params.require(:comment).permit(:message)
    end

end