class ActivitiesController < ApplicationController
    def get_activities
      activities = PublicActivity::Activity.all.where("parameters != '{}'").map do |activity|
        "#{activity.parameters[:user]} #{activity.parameters[:task]} #{activity.parameters[:created_at]}"
      end
      render json: activities
    end
  end