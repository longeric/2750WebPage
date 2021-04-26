# Starter create-react-app and Express
# Create MERN application 

## Quick start
```bash
# Install dependencies
npm install

# set environment
NODE_ENV='development'
SECRET='encrpty your token'
DATABASE_URL='your mongodb'
CLIENT_ID='Google client id'

# Run the client & server with concurrently
npm run start

```

## Project structure
```
INFSCI 2560 -- Final Project
│   README.md    
│ 
└───middleware (authentication)
│
│
└───models (Schema)
│
│
└───public (basic html)
│
│   
└───routers (API)
│
│
└───server
│   └───server.js
│
└───src
│   └───actions (call API)
│   │ 
│   └───components (render page)
│   │
│   └───reducers (State)
│   │   App.js
│   │   index.js (Entry)
```


## App Info

### Back-end
```
1. Model
  Schema: User
  Sub-document: schedule, unschedule

2. API
  ADMIN
  * GET api/admin/All  -- get all the non-admin users' information
  * DELETE api/admin/delete/:email"  -- delete user by email
  * GET api/admin/userChart -- get number of new users last seven days
  
  AUTH
  * GET api/auth/ -- user authentication
  * POST api/auth/ -- login authentication
  * GET api/auth/readUser/:email -- get user info by email
  * PUT api/auth/updateProfile -- update user profile
  
  USERS
  * POST api/users/ -- register account
  * POST api/users/createSchdule/:email -- create new task in scheduler
  * POST api/users/updateSchdule/:email -- update task in scheduler
  * DELETE api/users/deleteSchdule/:email -- delete task in scheduler
  * GET api/users/readNote/:email -- get notes by email
  * PUT api/users/saveNote/:email -- update notes

```

### Front-end
```
1. Redux (actions, reducers, utils folders)
  Manage state in react.js and interact with API in back-end
  
2. React (component folder)
  render pages

```

### Author
```
Mengdi Xu

Xiaoxin He

Long Yan

Yi Tao
```

### Version

1.0.0


### License

MIT License


### reference

[Remix from]: https://glitch.com/~starter-cra-and-express
[create-react-app]: https://create-react-app.dev
[Express]: https://expressjs.com/
[`http-proxy-middleware`]: https://github.com/chimurai/http-proxy-middleware