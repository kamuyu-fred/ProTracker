# MODELS

## USER

### Columns

- email :string
- username :string
- password_digest :string
- password_reset_token :string
- banned :boolean
- admin :boolean
- bio :text
- github_url :string
- avatar_url :string
- online_status :string
- last_seen :datetime
- timestamps :datetime

### Validations

- The email, username, password must be provided.
- The email provided must be unique and should be in the correct format.
- The email should have the following format:
   -  It must have at least one character before the "@" symbol.
   -  It must have at least one character after the "@" symbol, followed by a period (".") and at least one more character.
   -  It cannot contain any whitespace characters (spaces, tabs, etc.) before or after the "@" symbol.
   -  It cannot contain any special characters, such as square brackets, parentheses, or quotes, which are not normally allowed in email addresses.

### User routes and request handlers.

 #### Signing up 

        post '/signup'

- This request will add a new member to the database provided the validations above are met.
- The POST request is expected to include a body in the following format:

```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@gmail.com",
    "password": "password"
  }
```
- If the request fails due to a validation error, an error message containing information on the specific validation that failed will be returned in the following format:

```json
  {
    "error": [
        "Password can't be blank",
        "Email is invalid"
    ]
  }
```
#### Logging in

    post '/login'

- This request allow a user to log in
- It is expected to have a body in the format below :

```json
  {
    "email": "johndoe@gmail.com",
    "password": "password"
  }
```
- Incase of any failed verification the response below will be returned;

```json
{
  "error": "Invalid email or password"
}
```

#### Retrieving logged in user's profile

    get '/my_profile'

- Retrieves the user's profile details and returns it in the format below:

```json
{
  "username": "Jeff Maina",
  "email": "jeffmaina@gmail.com",
  "admin": true,
  "bio": "Fullstack and android developer",
  "github_link": "https://github_link",
  "avatar_url": "https://somevalidpnglink.com",
  "online_status": "online",
  "last_seen_at": "2023-04-20T17:25:13.377Z",
  "achievements": [
    {
      "name": "Stellar Project",
      "description": "Project liked a more than ten times."
    },
    {
      "name" : "Team Player",
      "description": "Added to more than ten groups."
    }
  ]
}
```

#### Updating a users profile.

    put '/update_profile'

- This request updates the user's details depending on what values have been passed in;
- A user can only update the following details:

```json
{
  "username": "Jeff Maina",
  "bio": "Fullstack and android developer",
  "github_link": "https://github_link",
  "avatar_url": "https://somevalidpnglink.com",
}
```

#### Logging out

    delete '/logout'

- Logging out;
    - Deletes user from the session and update their online status to offline.

#### Giving admin rights  (<small> <i>Accessible by admins only</i></small> )

    put  '/make_admin'

- This post request takes the email address of the user to be granted the rights.
- An error message will be returned if the user is not found.

#### Revoking admin rights

    put  '/remove_admin'

- This post request takes the email address of the user to be revoked the rights.
- An error message will be returned if the user is not found.

#### Retrieving a user's notifications

    get  '/notifications'

- Returns an array of all the notifications related to the user in the format below:

```json
[
  {
    "id": 2,
    "message": "John Doe liked your project 'Webflow project'",
    "notification_type": "Added to project",
    "read": false
  },
  {
    "id": 3,
    "message": "John Doe commented on your project 'Webflow project'",
    "notification_type": "Project comment",
    "read": false
  },
  {
    "id": 4,
    "message": "John Doe commented on your project 'Webflow project'",
    "notification_type": "Project comment",
    "read": false
  },
  {
    "id": 5,
    "message": "John Doe replied to your comment",
    "notification_type": "Comment reply",
    "read": false
  }
]
```

## COHORTS

### Columns

- name :string
- start_date :datetime
- end_date :datetime

### Validations

- All the fields above must be present for the request to be successful.
- The end date must be after the start date.

### Cohort end points

##### Creating a cohort

    post '/create_cohort'

- The POST request is expected to include a body in the following format:

```json
  {
    "name": "Cohort Name",
    "start_date": "2015-3-01",
    "end_date": "2015-3-01"
  }
```
- If any of the validations above fail an error message with the relevant information will be returned.

#### Updating the details of an existing cohort

    put '/cohorts/update_cohort/:cohort_id'

- The POST request is expected to include a body in the following format:

```json
  {
    "cohort_id" : "1", //The id of the cohort to be updated.
    "name": "Cohort Name",
    "start_date": "2015-3-01",
    "end_date": "2015-3-01"
  }
```
- Any new values will hence be updated.

#### Adding members to a cohort

    post '/cohort/add_student'

- This request will add a new member to the cohort. ( The member should have already signed up)
- The request requires a body in the format below:

```json
{
  "cohort_id" : "1", // The cohort the user is being added to.
  "email" : "user@example.com", // The email address of the student being added
}
```

#### Removing a user from a cohort.

    delete '/cohort/remove_member'

- This request will remove a member from the cohort. ( The member should have already signed up)
- The request requires a body in the format below:

```json
{
  "cohort_id" : "1", // The cohort the user is being added to.
  "email" : "user@example.com", // The email address of the student being added
}
```

#### Getting a cohort admin

    get '/cohort/:cohort_id/cohort_admin'

#### Getting all members of a cohort

    get '/cohort/cohort_members'

#### Geeting all cohorts a member is enrolled into

    get '/cohort/my_cohorts'

#### Getting all cohorts where a user is an admin

    get '/cohorts/admin_cohorts'

#### Getting the details of a specific cohort

    get '/cohort/details'


## PROJECTS

### Columns

- project_name :string
- project_description :string
- github_link :string
- user_id :string 
- cohort_id :string
- category :string

### Validations

- The project name, description, category and github link must be provided.

### Project endpoints

#### Creating a new project

    post '/projects/add_project'

- This request requires a body in the format below:

```json
{
  "project_name": "ProTracker",
  "project_description": "A project bank for various cohorts",
  "category" : "android", // Android or Fullstack;
  "cohort_id" : "1", // The cohort the project is being added to;
  "github_link" : "https://protracker.github.com/",
  "tags" : ["React", "Sass", "Rails", "Tailwind"] // optional
}
```

#### Updating a project

    put '/projects/:project_id'

- The request takes in a body in a format similar to the one above :
- Any updated values will be updated in the backend.


#### Adding group members

    post '/project/add_member

- The request the requires the following parameters:

```json
{
  "email": "groupmember@example.com", // the email address of the group member to be added
  "cohort_id": "1", // the id of the cohort the project belongs to;
  "project_id":"2" // the id of the project the member is being added to;
}
```

#### Retrieving all projects belonging to a cohort

    get '/cohort/:cohort_id/all_projects'

#### Retrieving all projects belonging to the current user

    get '/user/user_projects'

#### Retrieving all projects a user is part of

    get '/user/assigned_projects'

#### Retriving all the members of a given project.

    get '/project/:project_id/project_members'

#### Querying for a given project

    get '/cohort/:cohort_id/project/:search_params'

- The search params may either be by tags or by name.

#### Querying for a specific student's projects

    post '/projects/student_projects' 

- The post request takes in a valid student email.



## LIKES

### Endpoints

#### Liking a project

    post '/projects/:project_id/like'

#### Unliking a project

    post '/projects/:project_id/dislike'

#### Retrieving all users who have liked a certain project.

    get  '/projects/:project_id/liked_by'

## ACTIVITIES


#### Retrieving all user activity

    get '/activities'


## COMMENTS

#### Posting a comment

    post '/comments/comment'

- This request expects a body in the format below;

```json
  {
    "project_id" : "1", // id of the project being commented on;
    "message" : "Great work", // the content of the comment;
  }
```

#### Replying to a comment

- This request expects a body in the format below:

```json
  {
    "comment_id" : "1", // id of the comment being replied to;
    "message" : "Great work", // the content of the comment;
  }
```

#### Retrieving a thread

    get '/comments/:comment_id/thread'


## NOTIFICATIONS

#### Retrieving a logged in user's notifications

    get '/notifications'

#### Retrieving all a user's unread notifications

    get '/unread_notifications'

#### Marking a notification as read

    put '/:notif_id/mark_as_read'put '/mark_as_read'