# EAX Barista

<p>
  <a href="https://github.com/facebook/react">
    <img src="https://img.shields.io/badge/react-16.8.4-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/twbs/bootstrap">
    <img src="https://img.shields.io/badge/bootstrap-4.3.1-brightgreen.svg" alt="element-ui">
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs Welcome">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  </a>
</p>

## Getting Started

### Develop locally on your machine

In the root directory of the project...

1. Install node modules `yarn install` or `npm install`.
2. Start development server `yarn start` or `npm start`.
3. The application is now served on http://localhost:3000/

### Hosting in a docker container using Dockerfile

In the root directory of the project...

1. Have Docker installed on your machine
2. Build a docker image with Dockerfile `docker build -t eax-barista .`
3. Run the docker image in a docker container `docker run -p 8081:3000 eax-barista`
4. The application is now served on http://localhost:8081/

## File Structure

The front-end is based on [create-react-app](https://github.com/facebook/create-react-app).

The back-end is based on [Express Generator](https://expressjs.com/en/starter/generator.html).

The front-end is served on http://localhost:3000/ and the back-end on http://localhost:3001/.

```
.
├── server/ - Express server that provides API routes and serves front-end
│ ├── routes/ - Handles API calls for routes
│ ├── app.js - Adds middleware to the express server
│ ├── sampleData.js - Contains all sample text data for generate pages
│ ├── constants.js - Defines the constants for the endpoints and port
│ └── server.js - Configures Port and HTTP Server
├── src - React front-end
│ ├── components - React components for each page
│ ├── App.jsx - React routing
│ └── index.jsx - React root component
└── README.md
```

## Additional Documentation

- React - https://reactjs.org/
- React Router - https://reacttraining.com/react-router/

- Bootstrap CSS - https://getbootstrap.com/
- Express - https://expressjs.com/

  This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).

## License

EAX Barista is [MIT licensed](./LICENSE).