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
```



