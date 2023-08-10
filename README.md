WIP (Work In Progress)

# JWT-CRUD

Purpose

This monorepo is intended to demonstrate Json Web Token works with 2 token (refresh token & access token) to make authentication and authorization for login and data. mongodb bring graphql to process request and response the data from @apollo/server also connect with @apollo/client for store the data with redux to the client.

Expectation

Should be able to:
login with JWT technique (access token).
data protection (refresh token).
route protection.
CRUD functionality with search and pagination.
Scaffold entire dev environment with just one "npm dev:both" or "yarn dev:both" command.
Get the same Hot Module Reload (HMR) development experience.

Samples Included
server (Node JS)
client (React App + vite)

How To Run
Run "npm install" or "yarn" in the root of the folder to install all the dependencies needed.
Run "npm dev:both" or "yarn dev:both" to spin up all the services defined in the lerna.json
You can now access apps each other in dev mode a. localhost:4000 (nodeJS) b. localhost:3000 (ReactJS + Vite)

## Server

This server using mongoDB with graphql.

Dependencies needed:

- [@apollo/server](https://www.apollographql.com/docs/apollo-server/) The GraphQL server
- [graphql](https://graphql.org/) GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data
- [mongoose](https://mongoosejs.com/) Mongoose is a JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js

## Client

This client provides setup to get React working in Vite with HMR and some depedencies for best performance in deployment.

Dependencies needed:

- [@apollo/client](https://www.apollographql.com/docs/react/) Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL
- [@vitejs](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- [typescript](https://www.typescriptlang.org/) typecheking
- [tailwind](https://tailwindcss.com) powerfull styling system
- [daisyui](https://daisyui.com) plugin from tailwind to make symantic in the className
- [react-icons](https://react-icons.github.io/react-icons) simple react icons with SVG icon
- [react-router-dom](https://reactrouter.com/) help us to make simple and powerfull routes system
- [redux](https://redux-toolkit.js.org) state management
