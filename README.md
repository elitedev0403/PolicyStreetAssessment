install mongodb
install node/npm

### Server setup

- Create .env file and enter mongodb (`username`, `password`) and `server listening port` information.

Run `npm install` command to install npm modules and packages.

Run `npm start` to start the server.

Go to http://localhost:3333/graphql and you will be able to execute **GraphQL queries**

.env file
    DB_USERNAME=<dbUserName>
    DB_PASSWORD=<Password> 
    DB_NAME=notes 
    PORT=3333
    

### Client setup

Create .env file and enter `listening port` information.

Run `npm install` command to install npm modules and packages.

Run `npm run codegen` if you are making changes to graphql schema. (optional)

Run `npm start` to start the server. You will see a message on command window about the running status.

Go to http://localhost:3000 and you will be able to create simple notes.

.env file
  GRAPHQL_API_URL="http://localhost:3333/graphql"
