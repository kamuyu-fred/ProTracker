Rails.application.routes.draw do

  # * USERS

  post '/login', to: 'session#login' # *
  delete '/logout', to: 'session#destroy' # *
  post '/signup', to: 'users#create' # *
  get '/checkout', to: 'session#check_out' # *
  put '/update', to: 'users#update' # *
  get '/my_profile', to: 'users#my_profile' # *

  # granting and revoking admin rights

  post '/make_admin', to: 'users#make_admin' # *
  delete '/remove_admin', to: 'users#remove_admin'  




  # * COHORTS

  post '/cohorts/create_cohort', to: 'cohorts#create' # *
  post '/cohort/add_student', to: 'cohort_students#create' 
  delete '/cohort/remove_member', to: 'cohort_students#delete' 
  put '/cohorts/update_cohort/:cohort_id', to: 'cohorts#update' 

  # getting the cohort_admin
  get '/cohort/:cohort_id/cohort_admin', to: 'cohorts#cohort_admin' 

  # getting all members
  get '/cohort/cohort_members', to: 'cohorts#all_members' 

  # getting users cohorts
  get '/cohort/my_cohorts', to: 'cohorts#my_cohorts' 

  # getting cohorts where the user is an admin
  get '/cohorts/admin_cohorts', to: 'cohorts#admin_cohorts' # *
  get '/cohort/details', to: 'cohorts#cohort_details' 



  # * PROJECTS

  get '/projects/:project_id/project_details', to: 'projects#project_details' 
  get '/cohort/:cohort_id/all_projects' , to: 'projects#all_projects' 
  get '/user/user_projects', to: 'projects#current_user_projects' 
  put '/projects/:project_id', to: 'projects#update'
  # getting project members
  get '/project/:project_id/project_members', to: 'project_members#project_members' 
  # get projects a member belongs to;
  get '/user/assigned_projects', to: 'projects#my_assigned_projects' 

  #querying for a specific students projects
  post '/projects/student_projects' , to: 'projects#student_projects' 
  post '/projects/add_project', to: 'projects#create' 

  # adding project members
  post '/project/add_member', to: 'project_members#add_member' 

  # query projecs by their tags.
  get '/cohort/:cohort_id/project/:search_params', to: 'projects#get_project_by_input_value' 


  # * LIKES
  post '/projects/:project_id/like', to: 'projects#like' 
  post '/projects/:project_id/dislike', to: 'projects#dislike' 
  get  '/projects/:project_id/liked_by', to: 'projects#liked_by'

  # * PASSWORD RESET

  post '/password_reset/new', to: 'password_reset#new' 
  put 'password_reset/create', to: 'password_reset#create' 



  # * ACTIVITIES

  get '/activities', to: 'activities#get_activities' # *


  # * COMMENTS
  post '/comments/comment', to: 'comments#post_comment'
  post '/comments/reply', to: 'comments#reply_comment'
  get '/comments/:comment_id/thread', to: 'comments#show_thread'

  # * NOTIFICATIONS

  get '/notifications', to: 'notifications#get_notifications' # *
  get '/unread_notifications', to: 'notifications#get_unread_notifications' # *
  put '/mark_as_read', to: 'notifications#mark_as_read' # *

  #* ONLINE STATUS

  get '/online', to: 'heartbeat#index'
  put '/set_status', to: 'heartbeat#update'

end
