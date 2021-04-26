# Starter create-react-app and Express
# Create MERN application 

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
└───middleware
│   │   author.js
│   │   post.js
│   │ 
│
└───models
│   │   authorInfo.js
│   │   postInfo.js
│   │ 
│
└───public
│   │   authorInfo.js
│   │   postInfo.js
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
│   │   authors.js
│   │ 
│   └───components
│   │   App.js
│   │   index.js (Entry)
│   │   ...
│  
```


## App Info

### Author

Mengdi Xu
Xiaoxin He
Long Yan
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