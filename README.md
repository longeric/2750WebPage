# Create MERN application 

## Environment set up
``` bash
# install express
npm i express concurrently

# install monitor for development
npm i nodemon cors --save-dev

# set environment
npm i --save-dev dotenv

# install mongodb tool
npm i mongoose

# install react (client)
npm i -g create-react-app

# create react app (client)
create-react-app <app-name>

# react style (client)
npm install @material-ui/core

# (optional) 
node-snippets extension
```

## Quick start
```bash
# Install dependencies
npm install

# set environment
create .env then set 
NODE_ENV='development'
DATABASE_URL='your mongodb'

npm i --save-dev dotenv

# Run the client & server with concurrently
npm run start

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

## Project structure
```
INFSCI 2560 -- Final Project
│   README.md    
│ 
└───controllers
│   │   author.js
│   │   post.js
│   │ 
│
└───models
│   │   authorInfo.js
│   │   postInfo.js
│   │ 
│
└───routers
│   │   authors.js
│   │   posts.js
│   │
│
└───server
│   └───server.js
│
└───src
│   └───components
│   │   App.js
│   │   index.js (Entry)
│   │   ...
│  
```


## App Info

### Author

Yi Tao

### Version

1.0.0

### License

MIT License

### reference

[Remix from]: https://glitch.com/~starter-cra-and-express
[create-react-app]: https://create-react-app.dev
[Express]: https://expressjs.com/
[`http-proxy-middleware`]: https://github.com/chimurai/http-proxy-middleware
